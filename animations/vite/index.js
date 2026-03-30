/**
 * Vite plugin for motion-lyte.js.
 * Automatically injects the loadAnimations() call into your index.html.
 * 
 * @returns {import('vite').Plugin}
 */
export function motionLyte() {
  return {
    name: 'vite-plugin-motion-lyte',
    transformIndexHtml(html) {
      return html.replace(
        '</body>',
        `  <script type="module">
    import { loadAnimations } from 'motion-lyte.js';
    loadAnimations();
  </script>\n</body>`
      );
    }
  };
}
