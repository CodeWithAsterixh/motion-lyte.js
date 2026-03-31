/**
 * @typedef {'enter'|'leave'} TimelineType
 */

/**
 * Custom hook-like function to use Intersection Observer for triggering animations.
 * 
 * @param {HTMLElement} element - The element to observe.
 * @param {Function} animationFunction - The function to call when the element enters or leaves the viewport.
 * @param {Object} [options={}] - Configuration options for the observer.
 * @param {number} [options.threshold=0.1] - A threshold at which the observer's callback should be executed.
 * @param {"scrolling"|"scrollTo"} [options.type="scrollTo"] - The type of intersection behavior.
 * @param {Element|Document|null} [options.root=null] - The element that is used as the viewport for checking visibility of the target.
 * @returns {number} The current visibility percentage (0-100).
 */
export function useIntersectionObserver(element, animationFunction, options = {}) {
  const config = {
    threshold: 0.1,
    type: "scrollTo",
    root: null,
    ...options,
  };

  let visibilityPercentage = 0;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        visibilityPercentage = entry.intersectionRatio * 100;
        element.dataset["visibility-percent"] = visibilityPercentage.toFixed(2);
        if (entry.isIntersecting) {
          animationFunction(element, "enter", config);
        } else {
          animationFunction(element, "leave", config);
        }
      });
    },
    {
      threshold:
        config.type === "scrollTo"
          ? config.threshold
          : Array.from({ length: 101 }, (_, i) => i / 100),
      root: config.root,
    },
  );
  

  observer.observe(element);
  return visibilityPercentage;
}
