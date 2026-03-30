import { getVariables } from './core/utils.js';
import { runAnimation } from './core/runner.js';
import { availableAnimations } from './registry.js';


export { createAttributes } from './core/factory.js';

/**
 * Initializes and loads all animations defined in the DOM.
 * 
 * Scans for elements with `data-hover-animation`, `data-play-animation`, 
 * `data-toggle-animation`, and `data-scroll-animation` attributes 
 * and attaches the corresponding animation logic.
 * 
 * @returns {() => void} A cleanup function.
 */
export function loadAnimations() {
  const animationStates = ["hover", "play", "toggle", "scroll"];

  animationStates.forEach((state) => {
    const stateElements = document.querySelectorAll(`[data-${state}-animation]`);
    
    stateElements.forEach((element) => {
      if (!(element instanceof HTMLElement)) return;

      const attrValue = element.getAttribute(`data-${state}-animation`);
      if (!attrValue) return;

      const animationTypes = attrValue
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);

      const animationVariables = getVariables(element, /** @type {any} */ (state));

      animationTypes.forEach((type) => {
        const animationFunction = availableAnimations[type];
        if (animationFunction) {
          runAnimation(
            element,
            /** @type {any} */ (state),
            animationFunction,
            animationVariables,
            type,
          );
        } else {
          console.warn(`Animation type "${type}" not found in registry.`);
        }
      });
    });
  });

  return () => {};
}
