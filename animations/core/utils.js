/**
 * @typedef {Object} BaseAnimationVariables
 * @property {string} [enterClass] - Class to add on 'enter'.
 * @property {string} [leaveClass] - Class to add on 'leave'.
 * @property {string} [text] - Text for character animations.
 * @property {'char'|'word'} [variant] - Splitting variant for character animations.
 * @property {'scrollTo'|'scrolling'} [type] - Scroll intersection type.
 * @property {number} [threshold] - Intersection threshold.
 * @property {string} [receiver-id] - ID of the element that receives toggle classes (becomes toggle-receiver-id).
 * @property {string} [prefix] - Optional prefix override.
 */

/**
 * @typedef {Object} HoverAnimationVariables
 * @property {string} [hover-enterClass]
 * @property {string} [hover-leaveClass]
 * @property {string} [hover-receiver-id]
 */

/**
 * @typedef {Object} PlayAnimationVariables
 * @property {string} [play-enterClass]
 * @property {string} [play-leaveClass]
 * @property {string} [play-receiver-id]
 */

/**
 * @typedef {Object} ToggleAnimationVariables
 * @property {string} [toggle-enterClass]
 * @property {string} [toggle-leaveClass]
 * @property {string} [toggle-receiver-id]
 */

/**
 * @typedef {Object} ScrollAnimationVariables
 * @property {string} [scroll-enterClass]
 * @property {string} [scroll-leaveClass]
 * @property {'scrollTo'|'scrolling'} [scroll-type]
 * @property {number} [scroll-threshold]
 * @property {string} [scroll-receiver-id]
 */

/**
 * @typedef {BaseAnimationVariables & HoverAnimationVariables & PlayAnimationVariables & ToggleAnimationVariables & ScrollAnimationVariables} AnimationVariables
 */

/**
 * Conditionally combines class names into an array of strings.
 * 
 * @param {string|string[]} string - A class name string or an array of class name strings.
 * @returns {string[]} An array of unique, non-empty class name strings.
 * 
 * @example
 * clsx_stringarray("class1 class2") // ["class1", "class2"]
 * clsx_stringarray(["class1", "class2 class3"]) // ["class1", "class2", "class3"]
 */
export function clsx_stringarray(string) {
  if (Array.isArray(string)) {
    return [...new Set(string.join(" ").split(" ").filter(Boolean))];
  }

  const classes = string ? string.split(" ").filter(Boolean) : [];
  return [...new Set(classes)];
}

/**
 * Validates animation variables against the known schema and logs warnings for issues.
 * Provides runtime feedback across all IDEs via the browser console.
 * 
 * @param {AnimationVariables} variables - The variables to validate.
 * @param {string} style - The animation style (hover, scroll, etc.)
 * @returns {void}
 */
export function validateVariables(variables, style) {
  const schema = {
    enterClass: 'string',
    leaveClass: 'string',
    text: 'string',
    variant: ['char', 'word'],
    type: ['scrollTo', 'scrolling'],
    threshold: 'number',
    'receiver-id': 'string',
    prefix: 'string'
  };

  const prefixedProperties = [
    'enterClass', 'leaveClass', 'receiver-id', 'type', 'threshold'
  ];

  Object.keys(variables).forEach(key => {
    // Check if it's a global property or a prefixed property for the current style
    const baseKey = prefixedProperties.some(p => key === `${style}-${p}`) ? key.replace(`${style}-`, '') : key;

    if (schema[baseKey]) {
      const expected = schema[baseKey];
      const value = variables[key];

      if (Array.isArray(expected)) {
        if (!expected.includes(value)) {
          console.warn(`[Animation] Invalid value for "${key}": expected one of [${expected.join(', ')}], got "${value}"`);
        }
      } else if (typeof value !== expected) {
        console.warn(`[Animation] Invalid type for "${key}": expected ${expected}, got ${typeof value}`);
      }
    } else if (!key.includes('-')) {
      // If it's not a known global property and not a prefixed one, it might be a typo
      console.warn(`[Animation] Unknown variable property: "${key}". See documentation for supported properties.`);
    }
  });
}

/**
 * Extracts animation variables from an element's data attributes.
 * It combines global variables from `data-animation-variables` with 
 * style-specific variables from `data-{style}-variables`.
 * 
 * @param {HTMLElement} element - The target HTML element.
 * @param {"hover"|"play"|"toggle"|"scroll"} style - The animation trigger style.
 * @returns {AnimationVariables} A merged object of animation variables.
 */
export function getVariables(element, style) {
  const animationVariables = element.dataset.animationVariables || "{}";

  // Fix potential JSON format issues from attributes (single quotes to double quotes, unquoted keys)
  const fixJson = (str) => str.replaceAll("'", '"').replaceAll(/(\w+):/g, '"$1":');

  const fixedAnimationVariableJson = fixJson(animationVariables);

  const styleOnlyVariables = element.dataset[`${style}Variables`] || "{}";

  let fixedStyleOnlyVariablesJson = {};
  try {
    fixedStyleOnlyVariablesJson = JSON.parse(fixJson(styleOnlyVariables));
  } catch (e) {
    console.error(`Error parsing data-${style}-variables for element:`, element, e);
  }

  const styleOnlyVariablesPrefixed = Object.keys(
    fixedStyleOnlyVariablesJson,
  ).reduce((acc, key) => {
    acc[`${style}-${key}`] = fixedStyleOnlyVariablesJson[key];
    return acc;
  }, {});

  let variables = {};
  try {
    variables = Object.assign(
      JSON.parse(fixedAnimationVariableJson),
      styleOnlyVariablesPrefixed,
    );

    validateVariables(variables, style);
  } catch (e) {
    console.error("Error parsing data-animation-variables for element:", element, e);
  }

  return variables;
}
