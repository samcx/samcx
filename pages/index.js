/**
 * This is the index page. Next.js + Now will automatically process
 * and render this page first upon loading https://samsisle.dev ☀️
 * on the browser.
 */

import Main from "../components/Main";

export default function index() {
  console.log(
    '%c"People love what other people are passionate about."\n\n — Mia Sebastian, La La Land ☀️',
    "font-style: italic; font-size: 12px; color: #fdc82c;"
  );
  
  return <Main />;
}
