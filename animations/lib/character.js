/** @typedef {import('../core/utils.js').AnimationVariables} AnimationVariables */

/**
 * Animates text characters individually.
 * 
 * Splits the text content of an element into individual spans (characters or words)
 * and applies an index-based delay for staggered animations.
 * 
 * @param {HTMLElement} element - The element containing the text.
 * @param {'enter'|'leave'} type - The animation phase.
 * @param {AnimationVariables} variables - Animation configuration.
 * @param {string} [name='character-animation'] - The name of the animation.
 * @returns {void}
 */
export function characterAnimation(element, type, variables, name = "character_animation") {
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

  const { text, variant } = variables;
  if (!text) return;

  let characters = [text];
  if (variant === "char") {
    characters = text.split("");
  } else if (variant === "word") {
    characters = text.split(" ");
  }

  const animatedElements = characters.map((ele, index) => {
    const span = document.createElement("span");
    span.ariaHidden = "true";
    span.style.setProperty("--index", index);
    span.textContent = ele === " " ? "\u00A0" : ele;
    return span;
  });

  element.textContent = ""; // Clear original text
  animatedElements.forEach((span) => element.appendChild(span));
}
