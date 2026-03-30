/** @typedef {import('../core/utils.js').AnimationVariables} AnimationVariables */

/**
 * Adds an underline animation to an element.
 * 
 * This animation works by adding CSS classes that control the appearance 
 * and disappearance of an underline effect.
 * 
 * @param {HTMLElement} element - The element to animate.
 * @param {'enter'|'leave'} type - The animation phase.
 * @param {AnimationVariables} [variables={}] - Animation variables.
 * @param {string} [name='underline-animation'] - The name of the animation.
 * @returns {void}
 */
export function underlineAnimation(element, type, variables = {}, name = "underline_animation") {
  const prefix = variables.prefix || name.replaceAll("_", "-");
  const enterClass = `${prefix}-enter`;
  const leaveClass = `${prefix}-leave`;

  if (type === "enter") {
    element.classList.remove(leaveClass);
    element.classList.add(enterClass);
  } else {
    element.classList.remove(enterClass);
    element.classList.add(leaveClass);
  }
}
