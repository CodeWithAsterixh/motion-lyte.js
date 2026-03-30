export function motionLyte() {
  const virtualModuleId = 'virtual:motion-lyte-init';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'vite-plugin-motion-lyte',
    /**
     * 
     * @param {string} id 
     * @returns {string|undefined}
     */
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    /**
     * 
     * @param {string} id 
     * @returns {string|undefined}
     */
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `import { loadAnimations } from 'motion-lyte.js';\nloadAnimations();`;
      }
    },
    /**
     * 
     * @param {string} html 
     * @returns {string|undefined}
     */
    transformIndexHtml(html) {
      return html.replace(
        '</body>',
        `  <script type="module" src="/@id/${virtualModuleId}"></script>\n</body>`
      );
    }
  };
}
