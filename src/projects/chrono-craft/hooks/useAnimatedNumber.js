import { useState, useEffect, useRef } from "react";

export const useAnimatedNumber = (targetValue, duration = 500) => {
  const [currentValue, setCurrentValue] = useState(targetValue);
  const frameRef = useRef(undefined);
  const prevValueRef = useRef(currentValue);

  useEffect(() => {
    const startValue = prevValueRef.current;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const nextValue = Math.floor(startValue + (targetValue - startValue) * progress);

      setCurrentValue(nextValue);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        prevValueRef.current = targetValue;
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [targetValue, duration]);

  return currentValue;
};
