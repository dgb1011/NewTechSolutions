import { useCallback, useEffect, useState } from "react";

interface SpotlightPosition {
  x: number;
  y: number;
}

export function useSpotlight() {
  const [position, setPosition] = useState<SpotlightPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPosition({ x, y });
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const bindSpotlight = useCallback((element: HTMLElement | null) => {
    if (!element) return;

    const onMouseMove = (e: MouseEvent) => handleMouseMove(e, element);
    
    element.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', onMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return {
    position,
    isVisible,
    bindSpotlight,
  };
}
