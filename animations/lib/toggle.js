import { clsx_stringarray } from '../core/utils.js';

/** @typedef {import('../core/utils.js').AnimationVariables} AnimationVariables */

/**
 * Toggles custom CSS classes based on animation state and optional receiver element.
 * 
 * Useful for complex transitions where entering/leaving one element should 
 * trigger class changes on itself or another "receiver" element.
 * 
 * @param {HTMLElement} element - The trigger element.
 * @param {'enter'|'leave'} type - The animation phase.
 * @param {AnimationVariables} variables - Configuration variables.
 * @param {string} [variables.enterClass] - Class(es) to add on 'enter'.
 * @param {string} [variables.leaveClass] - Class(es) to add on 'leave'.
 * @param {string} [variables.scroll-enterClass] - Specific class(es) for scroll 'enter'.
 * @param {string} [variables.scroll-leaveClass] - Specific class(es) for scroll 'leave'.
 * @param {string} [variables.toggle-receiver-id] - ID of another element to toggle classes on.
 * @param {string} [variables.toggle-enterClass] - Class to add to receiver on 'enter'.
 * @param {string} [variables.toggle-leaveClass] - Class to add to receiver on 'leave'.
 * @param {string} [name='dynamic-toggle'] - The name of the animation.
 * @returns {void}
 */
export function dynamicToggle(element, type, variables, name = "dynamic_toggle") {
  const {
    enterClass,
    leaveClass,
    "toggle-receiver-id": toggle_receiver,
    "toggle-enterClass": toggleShowClass,
    "toggle-leaveClass": toggleRemoveClass,
    "scroll-enterClass": scrollEnterClass,
    "scroll-leaveClass": scrollLeaveClass,
    prefix: customPrefix,
  } = variables;

  const prefix = customPrefix || name.replaceAll("_", "-");
  const currentEnterClass = scrollEnterClass || enterClass || `${prefix}-enter`;
  const currentLeaveClass = scrollLeaveClass || leaveClass || `${prefix}-leave`;

  if (type === "enter" && currentEnterClass) {
    element.classList.remove(...clsx_stringarray([currentEnterClass, currentLeaveClass].flat()));
    element.classList.add(...clsx_stringarray(currentEnterClass));
  } else if (type === "leave" && currentLeaveClass) {
    element.classList.remove(...clsx_stringarray([currentEnterClass, currentLeaveClass].flat()));
    element.classList.add(...clsx_stringarray(currentLeaveClass));
  }

  if (toggle_receiver) {
    const toggleReceiverElement = document.querySelector(
      `[data-toggle-receiver-id=${toggle_receiver}]`,
    );

    if (toggleReceiverElement) {
      if (type === "enter" && toggleShowClass) {
        toggleReceiverElement.classList.remove(...clsx_stringarray([toggleRemoveClass, toggleShowClass]));
        toggleReceiverElement.classList.add(...clsx_stringarray(toggleShowClass));
      } else if (type === "leave" && toggleRemoveClass) {
        toggleReceiverElement.classList.remove(...clsx_stringarray([toggleRemoveClass, toggleShowClass]));
        toggleReceiverElement.classList.add(...clsx_stringarray(toggleRemoveClass));
      }
    }
  }
}
