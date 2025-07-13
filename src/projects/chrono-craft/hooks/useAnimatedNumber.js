import { useState, useEffect, useRef } from "react";

/**
 * A custom React hook that animates a number from a previous value to a target value over a specified duration.
 * @param targetValue The number to animate to.
 * @param duration The duration of the animation in milliseconds. Defaults to 500ms.
 * @returns The current value of the number during the animation.
 */
export const useAnimatedNumber = (targetValue, duration = 500) => {
  const [currentValue, setCurrentValue] = useState(targetValue);
  const frameRef = useRef(undefined);
  const prevValueRef = useRef(currentValue);

  useEffect(() => {
    // The value to start the animation from.
    const startValue = prevValueRef.current;
    let startTime = null;

    // The animation function, called recursively by requestAnimationFrame.
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const nextValue = Math.floor(startValue + (targetValue - startValue) * progress);

      setCurrentValue(nextValue);

      // If the animation is not yet complete, request the next frame.
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        // When animation completes, update the prevValueRef for the next change.
        prevValueRef.current = targetValue;
      }
    };

    // Start the animation.
    frameRef.current = requestAnimationFrame(animate);

    // Cleanup function: runs when the component unmounts or dependencies change.
    // This is crucial to prevent memory leaks and stop the animation if the target changes mid-animation.
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [targetValue, duration]);

  return currentValue;
};
