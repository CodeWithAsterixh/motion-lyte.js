/** @typedef {import('./utils.js').AnimationVariables} AnimationVariables */

/**
 * @typedef {Object} AnimationConfig
 * @property {string|string[]} [hover] - Hover animation(s).
 * @property {string|string[]} [play] - Play animation(s).
 * @property {string|string[]} [toggle] - Toggle animation(s).
 * @property {string|string[]} [scroll] - Scroll animation(s).
 * @property {AnimationVariables} [variables] - Global variables.
 * @property {AnimationVariables} [hoverVariables] - Hover-specific variables.
 * @property {AnimationVariables} [playVariables] - Play-specific variables.
 * @property {AnimationVariables} [toggleVariables] - Toggle-specific variables.
 * @property {AnimationVariables} [scrollVariables] - Scroll-specific variables.
 */

/**
 * @typedef {Object} FactoryConfig
 * @property {HTMLElement} [targetElement] - If provided, automatically sets generated attributes on this element.
 */

/**
 * Helper function to generate standardized animation data attributes.
 * This provides type safety and framework-agnostic attribute generation.
 * 
 * @param {AnimationConfig} variables - The animation configuration and triggers.
 * @param {FactoryConfig} [config={}] - Optional factory configuration.
 * @returns {Record<string, string>} An object containing the data attributes.
 * 
 * @example
 * // For frameworks (React/Vue)
 * const attrs = createAnimationAttrs({
 *   hover: 'underline_animation',
 *   variables: { enterClass: 'text-blue-500' }
 * });
 * 
 * @example
 * // For direct DOM manipulation
 * createAttributes({
 *   scroll: 'dynamic_toggle',
 *   scrollVariables: { threshold: 0.5 }
 * }, { targetElement: document.querySelector('.my-el') });
 */
export function createAttributes(variables, config = {}) {
  const attrs = {};

  const map = {
    hover: 'data-hover-animation',
    play: 'data-play-animation',
    toggle: 'data-toggle-animation',
    scroll: 'data-scroll-animation',
    variables: 'data-animation-variables',
    hoverVariables: 'data-hover-variables',
    playVariables: 'data-play-variables',
    toggleVariables: 'data-toggle-variables',
    scrollVariables: 'data-scroll-variables'
  };

  Object.entries(variables).forEach(([key, value]) => {
    if (map[key]) {
      const attrName = map[key];
      
      if (Array.isArray(value)) {
        attrs[attrName] = value.join(', ');
      } else if (value !== null && typeof value === 'object') {
        attrs[attrName] = JSON.stringify(value);
      } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        attrs[attrName] = String(value);
      }
    }
  });

  if (config.targetElement && config.targetElement instanceof HTMLElement) {
    Object.entries(attrs).forEach(([key, value]) => {
      config.targetElement.setAttribute(key, value);
    });
  }

  return attrs;
}
