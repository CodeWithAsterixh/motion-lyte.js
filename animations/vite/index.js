export function motionLyte() {
  return {
    name: 'vite-plugin-motion-lyte',
    // We use the transform hook to inject the initialization code into the main entry point.
    // This ensures that the code is processed by Vite's bundler.
    /**
     * @param {string} code 
     * @param {string} id 
     */
    transform(code, id) {
      // Check if this is a main entry point (common patterns)
      if (id.endsWith('main.js') || id.endsWith('main.ts') || id.endsWith('index.js') || id.endsWith('index.ts')) {
        // Only inject if it's not already there
        if (!code.includes('loadAnimations')) {
          return {
            code: `import { loadAnimations } from 'motion-lyte.js';\nloadAnimations();\n${code}`,
            map: null // We don't need a source map for this simple injection
          };
        }
      }
      return null;
    }
  };
}
