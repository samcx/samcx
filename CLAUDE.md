# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `bun run dev` - Start development server with Turbopack
- `bun run build` - Build production bundle with Turbopack  
- `bun run start` - Start production server
- `bun run lint` - Run ESLint checks

### Code Quality
- Biome is configured for formatting and linting (see biome.json)
- ESLint extends Next.js core-web-vitals and TypeScript configs
- Husky is set up for Git hooks

## Project Architecture

This is a minimalist personal portfolio built with Next.js 15, React 19, and TypeScript.

### Key Architectural Decisions
- **Next.js App Router**: Uses the modern app directory structure
- **Turbopack**: Enabled for both dev and build for faster compilation
- **Experimental Features**: 
  - `inlineCss: true` - Inlines critical CSS
  - `ppr: true` - Enables Partial Prerendering
- **Font Strategy**: Uses Geist font from Google Fonts with latin subset
- **Styling**: Custom CSS with modern features (CSS custom properties, oklch colors, dvh units)

### File Structure
```
app/
├── layout.tsx          # Root layout with font and metadata
├── page.tsx           # Homepage with main quote content  
├── not-found.tsx      # 404 page
├── globals.css        # Global styles with CSS custom properties
└── favicon.ico        # Site favicon

components/
└── footer.tsx         # Social media links footer

svgs/                  # SVG icons for social media
```

### Component Patterns
- Uses `@/` path mapping for clean imports
- Components are functional with TypeScript
- Next.js Image component with `unoptimized` flag for SVGs
- External links use `target="_blank"` for new tab navigation

### Styling Philosophy
- Mobile-first responsive design using CSS custom properties
- Safe area insets for modern devices
- Semantic HTML structure
- Minimal, clean aesthetic with typography contrast (serif for emphasis)