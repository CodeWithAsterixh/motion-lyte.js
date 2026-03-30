import { useIntersectionObserver } from './observer.js';

/** @typedef {import('./utils.js').AnimationVariables} AnimationVariables */

/**
 * Runs a specific animation function on an element based on a trigger style.
 * 
 * @param {HTMLElement} element - The target HTML element.
 * @param {"hover"|"play"|"toggle"|"scroll"} animationStyle - The trigger that starts the animation.
 * @param {Function} animationFunction - The animation implementation function to execute.
 * @param {AnimationVariables} [animationVariables={}] - Additional variables for the animation.
 * @returns {void}
 */
export function runAnimation(
  element,
  animationStyle,
  animationFunction,
  animationVariables = {},
  animationName = '',
) {
  // Filter variables that are specific to the current animation style
  const styleOnlyVariables = Object.keys(animationVariables).filter((key) =>
    key.includes(`${animationStyle}`),
  );
  
  const styleOnlyVariablesPrefixed = styleOnlyVariables.reduce((acc, key) => {
    acc[key] = animationVariables[key];
    return acc;
  }, {});

  const variables =
    Object.keys(styleOnlyVariablesPrefixed).length > 0
      ? styleOnlyVariablesPrefixed
      : animationVariables;

  switch (animationStyle) {
    case "hover":
      ["mouseenter", "mouseleave"].forEach((eventName) => {
        const type = eventName === "mouseenter" ? "enter" : "leave";
        element.addEventListener(eventName, () => {
          animationFunction(element, type, variables, animationName);
        });
      });
      break;

    case "play":
      animationFunction(element, "enter", variables, animationName);
      break;

    case "toggle": {
      let toggled = false;
      element.addEventListener("click", () => {
        toggled = !toggled;
        const type = toggled ? "enter" : "leave";
        animationFunction(element, type, variables, animationName);
      });
      break;
    }

    case "scroll":
      useIntersectionObserver(element, (el, type, vars) => {
        animationFunction(el, type, vars, animationName);
      }, variables);
      break;
  }
}
