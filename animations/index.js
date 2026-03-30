import { getVariables } from './core/utils.js';
import { runAnimation } from './core/runner.js';
import { availableAnimations } from './registry.js';

export { loadAnimations } from './runner.js';
export { createAttributes } from './core/factory.js';

/**
 * Initializes and loads all animations defined in the DOM.
 * 
 * Scans for elements with `data-hover-animation`, `data-play-animation`, 
 * `data-toggle-animation`, and `data-scroll-animation` attributes 
 * and attaches the corresponding animation logic.
 * 
 * @returns {void}
 */
export function loadAnimations() {
  const animationStates = ["hover", "play", "toggle", "scroll"];

  animationStates.forEach((state) => {
    const stateElements = document.querySelectorAll(`[data-${state}-animation]`);
    
    stateElements.forEach((element) => {
      const animationTypes = element
        .getAttribute(`data-${state}-animation`)
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);

      const animationVariables = getVariables(element, state);

      animationTypes.forEach((type) => {
        const animationFunction = availableAnimations[type];
        if (animationFunction) {
          runAnimation(
            element,
            state,
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
}
