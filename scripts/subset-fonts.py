#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["fonttools[woff]==4.68.0"]
# ///
"""Subset the site's web fonts by hand and write the committed output.

Run from the repo root (needs `pnpm install` first, for the Geist Serif source
and oxfmt):

    uv run scripts/subset-fonts.py                  # ASCII core (what ships)
    uv run scripts/subset-fonts.py --keep-grouping  # previous grouping, see below

Writes (commit all of it):
    public/fonts/<font>-core.<hash>.woff2  preloaded on every page
    public/fonts/<font>-ext.<hash>.woff2   only downloads when a page uses one
                                           of its characters (unicode-range)
    app/fonts.generated.css                @font-face rules + fallback faces
    app/fonts.generated.ts                 preload URLs used by app/layout.tsx

Rerun it when:
    - content gains characters outside ASCII, Latin-1 and Latin Extended-A
      (the script scans app/ and components/ and keeps what it finds);
    - the site starts using another weight, bold (<strong>, <b>, headings),
      a real italic, an OpenType feature (font-feature-settings,
      font-variant-*), or `hyphens: auto` (needs U+2010). Update FONTS /
      KEEP_FEATURES first; the script warns when it spots these;
    - a source font is upgraded (update the pinned URL or path and sha256,
      then pixel-diff before shipping).

Layouts:
    default          Core = ASCII + curly quotes, dashes, ellipsis; Latin-1
                     and Latin Extended-A go in ext. Smallest preload, and
                     ASCII-only pages render identically. Browsers shape each
                     file's characters as separate runs, so kerning is lost
                     wherever ASCII meets an accented letter (e.g. "Té") and
                     accented text renders slightly wider.
    --keep-grouping  Characters stay grouped as they were before self-hosting
                     (Geist Sans: Google's "latin" set in the core, Latin
                     Extended-A in ext; Geist Serif: a single file), which
                     keeps accented text identical too, at a larger preload.

Nothing here runs during `next build`.
"""

from __future__ import annotations

import hashlib
import html
import io
import re
import subprocess
import sys
import urllib.request
from pathlib import Path

from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
OUT_FONTS = ROOT / "public" / "fonts"
OUT_CSS = ROOT / "app" / "fonts.generated.css"
OUT_TS = ROOT / "app" / "fonts.generated.ts"
CACHE = ROOT / "node_modules" / ".cache" / "subset-fonts"

# Browsers turn these on by default for Latin text. Everything else (frac,
# tnum, ss01..., aalt, case, onum...) is only reachable via
# font-feature-settings / font-variant-*, which the site does not use.
KEEP_FEATURES = ["ccmp", "locl", "mark", "mkmk", "kern", "liga", "clig", "calt", "rlig", "rclt", "rvrn"]

LATIN_1 = set(range(0xA0, 0x100))
LATIN_EXT_A = set(range(0x100, 0x180))

# Default core: ASCII + the punctuation most pages use.
ASCII_CORE = set(range(0x20, 0x7F)) | {
    0x00A0,  # no-break space
    0x2013, 0x2014,  # en dash, em dash
    0x2018, 0x2019, 0x201C, 0x201D,  # curly quotes
    0x2026,  # ellipsis
}


def ranges(*spans: tuple[int, int] | int) -> set[int]:
    out: set[int] = set()
    for s in spans:
        a, b = s if isinstance(s, tuple) else (s, s)
        out |= set(range(a, b + 1))
    return out


# The unicode-range of the preloaded next/font/google "latin" file that
# Geist Sans used before. Keeping these together keeps shaping identical.
GOOGLE_LATIN = ranges(
    (0x0000, 0x00FF), 0x0131, (0x0152, 0x0153), (0x02BB, 0x02BC), 0x02C6, 0x02DA, 0x02DC,
    0x0304, 0x0308, 0x0329, (0x2000, 0x206F), 0x20AC, 0x2122, 0x2191, 0x2193, 0x2212,
    0x2215, 0xFEFF, 0xFFFD,
)

FONTS = [
    {
        "id": "geist-sans",
        "label": "Geist Sans",
        "family": "Geist",
        # Exactly the v1.800 build Google Fonts serves today (pinned commit).
        # The npm `geist` package ships v1.900, whose outlines differ.
        "url": "https://raw.githubusercontent.com/google/fonts/87a44ad3d4535f7b3a5a715a08e8944f144afd06/ofl/geist/Geist%5Bwght%5D.ttf",
        "sha256": "73894e0448cae90a92b6c2f8732b7bb9acb7b94c418bff559dad4a18e1de9659",
        # Only weight 400 is used and nothing overrides it, so pin the axis.
        "instance": {"wght": 400},
        "descriptors": {"font-style": "normal", "font-weight": "400"},
        "previous_core": GOOGLE_LATIN,
        # Copied verbatim from the next/font output this replaces. Do not edit.
        "fallback": {
            "family": "Geist Fallback",
            "css": 'src: local("Arial");\n  ascent-override: 95.94%;\n  descent-override: 28.16%;\n  line-gap-override: 0.0%;\n  size-adjust: 104.76%;',
        },
        "variable": ("--font-geist-sans", '"Geist", "Geist Fallback"'),
    },
    {
        "id": "geist-serif-regular",
        "label": "Geist Serif",
        "family": "GeistSerifRegular",
        "path": "node_modules/geist/dist/fonts/geist-serif/GeistSerif-Regular.woff2",
        "sha256": "d11c9077e61bda553e2eea121409c584504319e08f972d11e0a38ed4b14de398",
        "instance": None,  # static font, no axes
        # No font-style: <em> keeps getting a synthesized oblique, as before.
        "descriptors": {"font-weight": "400"},
        "previous_core": None,  # was a single file
        "fallback": {
            "family": "GeistSerifRegular Fallback",
            "css": 'src: local("Times New Roman");\n  ascent-override: 87.78%;\n  descent-override: 25.77%;\n  line-gap-override: 0.0%;\n  size-adjust: 114.49%;',
        },
        "variable": (
            "--font-geist-serif-regular",
            '"GeistSerifRegular", "GeistSerifRegular Fallback", Times New Roman, Times, serif',
        ),
    },
]

CONTENT_DIRS = ["app", "components"]
CONTENT_EXTS = {".tsx", ".ts", ".jsx", ".js", ".mdx", ".md", ".css"}
GENERATED = {OUT_CSS, OUT_TS}
WARN_PATTERNS = {
    r"font-weight|fontWeight|<strong|<b[\s>]|<h[1-6][\s>]": "another weight / bold (Geist Sans is pinned to 400, Serif is Regular only)",
    r"font-feature-settings|fontFeatureSettings|font-variant|fontVariant": "an OpenType feature (only default features are kept)",
    r"font-variation-settings|fontVariationSettings": "a variable axis (wght is pinned to 400)",
    r"hyphens:\s*auto|hyphens:\s*['\"]auto": "hyphens: auto (needs U+2010)",
}


def load_source(spec: dict) -> bytes:
    if "path" in spec:
        data = (ROOT / spec["path"]).read_bytes()
    else:
        CACHE.mkdir(parents=True, exist_ok=True)
        cached = CACHE / (spec["sha256"] + ".ttf")
        if not cached.exists():
            with urllib.request.urlopen(spec["url"]) as r:
                cached.write_bytes(r.read())
        data = cached.read_bytes()
    digest = hashlib.sha256(data).hexdigest()
    if digest != spec["sha256"]:
        sys.exit(f"{spec['label']}: source sha256 {digest} != pinned {spec['sha256']}. "
                 "If you upgraded the font on purpose, update the pin and pixel-diff the result.")
    return data


def scan_content() -> tuple[set[int], list[str]]:
    used: set[int] = set()
    warnings: list[str] = []
    for d in CONTENT_DIRS:
        for p in sorted((ROOT / d).rglob("*")):
            if p.suffix not in CONTENT_EXTS or p in GENERATED:
                continue
            text = html.unescape(p.read_text(encoding="utf-8"))
            used |= {ord(c) for c in text if ord(c) >= 0x20}
            for pat, what in WARN_PATTERNS.items():
                for m in re.finditer(pat, text):
                    line = text.count("\n", 0, m.start()) + 1
                    warnings.append(f"{p.relative_to(ROOT)}:{line}: uses {what}")
    return used, warnings


def to_woff2(font: TTFont) -> bytes:
    font.flavor = "woff2"
    buf = io.BytesIO()
    font.save(buf)
    return buf.getvalue()


def build(src: bytes, unicodes: set[int], *, instance, features, hinting) -> TTFont:
    font = TTFont(io.BytesIO(src))
    font.recalcTimestamp = False  # keep output byte-for-byte reproducible
    if instance and "fvar" in font:
        font = instancer.instantiateVariableFont(font, instance)
        font.recalcTimestamp = False
    opts = Options()
    opts.layout_features = features
    opts.hinting = hinting
    opts.drop_tables += ["meta"] + ([] if "fvar" in font else ["STAT"])
    opts.notdef_outline = True
    # Keep glyph names (post format 2). Dropping them is the usual size win,
    # but it visibly changes 1x antialiasing in Chrome on macOS (pixel-diffed).
    opts.glyph_names = True
    sub = Subsetter(opts)
    sub.populate(unicodes=unicodes)
    bbox = [getattr(font["head"], k) for k in ("xMin", "yMin", "xMax", "yMax")]
    sub.subset(font)
    # Keep the full font's bounding box. fontTools shrinks it to the subset,
    # which also shifts 1x antialiasing in Chrome on macOS (pixel-diffed).
    font.recalcBBoxes = False
    for k, v in zip(("xMin", "yMin", "xMax", "yMax"), bbox):
        setattr(font["head"], k, v)
    return font


def unicode_range(cps: set[int]) -> str:
    out, s = [], sorted(cps)
    i = 0
    while i < len(s):
        j = i
        while j + 1 < len(s) and s[j + 1] == s[j] + 1:
            j += 1
        out.append(f"U+{s[i]:X}" if i == j else f"U+{s[i]:X}-{s[j]:X}")
        i = j + 1
    return ", ".join(out)


def verify(label: str, part: str, out_font: TTFont, ref: TTFont, expected: set[int]) -> None:
    """Catch subsetter/instancer quirks: missing or extra characters, outline or
    advance drift, changed vertical metrics, leftover axes or hinting, RFN."""
    problems = []
    cmap, ref_cmap = out_font.getBestCmap(), ref.getBestCmap()
    if set(cmap) != expected:
        problems.append(f"cmap mismatch: missing {sorted(expected - set(cmap))[:10]} extra {sorted(set(cmap) - expected)[:10]}")
    for cp in cmap:
        g, rg = cmap[cp], ref_cmap[cp]
        if out_font["hmtx"][g][0] != ref["hmtx"][rg][0]:
            problems.append(f"advance differs for U+{cp:04X}")
        a, b = out_font["glyf"][g], ref["glyf"][rg]
        ca = list(a.getCoordinates(out_font["glyf"])[0]) if a.numberOfContours else []
        cb = list(b.getCoordinates(ref["glyf"])[0]) if b.numberOfContours else []
        if ca != cb:
            problems.append(f"outline differs for U+{cp:04X}")
    for table, attrs in {
        "head": ["unitsPerEm", "xMin", "yMin", "xMax", "yMax"],
        "hhea": ["ascent", "descent", "lineGap"],
        "OS/2": ["sTypoAscender", "sTypoDescender", "sTypoLineGap", "usWinAscent", "usWinDescent", "fsSelection", "usWeightClass"],
    }.items():
        for attr in attrs:
            if getattr(out_font[table], attr) != getattr(ref[table], attr):
                problems.append(f"{table}.{attr} {getattr(out_font[table], attr)} != {getattr(ref[table], attr)}")
    if "fvar" in out_font:
        problems.append("still variable")
    if any(t in out_font for t in ("fpgm", "prep", "cvt ")):
        problems.append("hinting tables left behind")
    if out_font["post"].formatType != 2.0:
        problems.append("glyph names dropped")
    rfn = " ".join(filter(None, (out_font["name"].getDebugName(i) for i in (0, 13)))).lower()
    if "reserved font name" in rfn:
        problems.append("source declares an OFL Reserved Font Name: rename the subset internally before shipping")
    if problems:
        sys.exit(f"{label} {part}: " + "; ".join(problems[:8]))


def kb(n: int) -> str:
    return f"{n / 1024:.1f} KB"


def split(spec: dict, keep: set[int], ascii_core: bool) -> tuple[set[int], set[int]]:
    if ascii_core:
        core = keep & ASCII_CORE
    elif spec["previous_core"] is None:
        core = keep
    else:
        core = keep & spec["previous_core"]
    return core, keep - core


def main() -> None:
    ascii_core = "--keep-grouping" not in sys.argv[1:]
    used, warnings = scan_content()
    report: dict[str, dict[str, str]] = {}
    css = ["/* Generated by scripts/subset-fonts.py. Do not edit by hand; rerun the script. */", ""]
    preloads: list[str] = []
    OUT_FONTS.mkdir(parents=True, exist_ok=True)

    for spec in FONTS:
        src = load_source(spec)
        src_font = TTFont(io.BytesIO(src))
        src_cmap = set(src_font.getBestCmap())
        keep = (ASCII_CORE | LATIN_1 | LATIN_EXT_A | used) & src_cmap
        missing = sorted(c for c in used - src_cmap if c >= 0x80)
        if missing:
            print(f"{spec['label']}: {len(missing)} used characters not in the font, left to system fonts: "
                  + "".join(chr(c) for c in missing[:40]))

        inst = spec["instance"]
        ref = TTFont(io.BytesIO(to_woff2(instancer.instantiateVariableFont(src_font, inst)))) if inst else src_font
        size = lambda cps, **kw: len(to_woff2(build(src, cps, **kw)))  # noqa: E731
        steps = report.setdefault(spec["label"], {})
        steps["Before: source font as WOFF2"] = kb(len(to_woff2(TTFont(io.BytesIO(src)))))
        steps["Keep site characters + Latin-1 + Latin Extended-A"] = kb(size(keep, instance=None, features=["*"], hinting=True))
        steps["Pin wght to 400"] = kb(size(keep, instance=inst, features=["*"], hinting=True)) if inst else "n/a"
        steps["Drop unused OpenType features"] = kb(size(keep, instance=inst, features=KEEP_FEATURES, hinting=True))
        steps["Drop hinting"] = kb(size(keep, instance=inst, features=KEEP_FEATURES, hinting=False))
        for mode, flag in (("default", True), ("--keep-grouping", False)):
            c, e = split(spec, keep, flag)
            steps[f"Split, {mode}: core (preloaded)"] = kb(size(c, instance=inst, features=KEEP_FEATURES, hinting=False))
            steps[f"Split, {mode}: ext (on demand)"] = kb(size(e, instance=inst, features=KEEP_FEATURES, hinting=False)) if e else "none"

        for old in OUT_FONTS.glob(f"{spec['id']}-*.woff2"):
            old.unlink()
        core, ext = split(spec, keep, ascii_core)
        faces = []
        for part, cps in (("core", core), ("ext", ext)):
            if not cps:
                continue
            font = build(src, cps, instance=inst, features=KEEP_FEATURES, hinting=False)
            verify(spec["label"], part, font, ref, cps)
            data = to_woff2(font)
            name = f"{spec['id']}-{part}.{hashlib.sha256(data).hexdigest()[:10]}.woff2"
            (OUT_FONTS / name).write_bytes(data)
            url = f"/fonts/{name}"
            if part == "core":
                preloads.append(url)
            descriptors = "".join(f"\n  {k}: {v};" for k, v in spec["descriptors"].items())
            faces.append(
                f"@font-face {{\n  font-family: \"{spec['family']}\";{descriptors}\n  font-display: swap;\n"
                f"  src: url({url}) format(\"woff2\");\n  unicode-range: {unicode_range(set(font.getBestCmap()))};\n}}"
            )
        fb = spec["fallback"]
        faces.append(f"@font-face {{\n  font-family: \"{fb['family']}\";\n  {fb['css']}\n}}")
        note = "core is preloaded; ext only downloads when a page uses one of its characters" if ext else "single preloaded file"
        css += [f"/* {spec['label']}: {note}. */", *faces, ""]

    css.append(":root {")
    css += [f"  {var}: {value};" for var, value in (s["variable"] for s in FONTS)]
    css.append("}")
    OUT_CSS.write_text("\n".join(css) + "\n")
    OUT_TS.write_text(
        "// Generated by scripts/subset-fonts.py. Do not edit by hand; rerun the script.\n"
        "export const fontPreloads = [\n" + "".join(f"  '{u}',\n" for u in preloads) + "] as const\n"
    )
    oxfmt = ROOT / "node_modules" / ".bin" / "oxfmt"
    if oxfmt.exists():  # match the repo's formatting so `pnpm fmt:check` passes
        subprocess.run([str(oxfmt), str(OUT_CSS), str(OUT_TS)], check=True, capture_output=True)
    else:
        print("oxfmt not installed; run `pnpm fmt` before committing.")

    labels = [s["label"] for s in FONTS]
    print(f"\nWrote the {'default (ASCII core)' if ascii_core else '--keep-grouping'} layout.\n")
    print("| Step | " + " | ".join(labels) + " |")
    print("| --- |" + " ---: |" * len(labels))
    for r in report[labels[0]]:
        print(f"| {r} | " + " | ".join(report[l].get(r, "n/a") for l in labels) + " |")
    if warnings:
        print("\nCheck these before trusting the output (see the rerun notes at the top of this script):")
        for w in warnings:
            print("  " + w)


if __name__ == "__main__":
    main()
