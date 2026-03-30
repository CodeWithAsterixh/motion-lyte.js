import { useEffect } from 'react';
import { loadAnimations } from '../index.js';

/**
 * React hook to initialize motion-lyte-js animations.
 * 
 * This hook ensures that loadAnimations is called once when the component mounts.
 * In a standard React application, this should typically be used in your top-level 
 * App component or a layout wrapper.
 * 
 * @example
 * ```jsx
 * import { useMotionLyte } from 'motion-lyte-js/react';
 * 
 * function App() {
 *   useMotionLyte();
 *   return <div data-scroll-animation="dynamic_toggle">Hello World</div>;
 * }
 * ```
 */
export function useMotionLyte() {
  useEffect(() => {
    // Initialize global observers
    const cleanup = loadAnimations();

    return () => {
      // Optional: Cleanup logic if the library supports it
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, []);
}
