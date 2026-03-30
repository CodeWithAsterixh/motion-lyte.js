import { underlineAnimation } from './lib/underline.js';
import { characterAnimation } from './lib/character.js';
import { dynamicToggle } from './lib/toggle.js';

/** @typedef {import('./core/utils.js').AnimationVariables} AnimationVariables */

/**
 * @typedef {(
 *   element: HTMLElement,
 *   type: 'enter'|'leave',
 *   variables: AnimationVariables,
 *   name: string
 * ) => void} AnimationFunction
 */

/**
 * A registry of available animation implementations.
 * Maps the animation name (as used in `data-*-animation` attributes) 
 * to its corresponding function.
 * 
 * @type {Record<string, AnimationFunction>}
 */
export const availableAnimations = {
  underline_animation: underlineAnimation,
  character_animation: characterAnimation,
  dynamic_toggle: dynamicToggle,
};
