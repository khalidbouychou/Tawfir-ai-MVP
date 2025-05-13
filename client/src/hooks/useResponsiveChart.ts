import { useState, useEffect, RefObject } from 'react';

export const useResponsiveChart = (containerRef: RefObject<HTMLDivElement>) => {
  const [containerWidth, setContainerWidth] = useState(300); // Default fallback width
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    // Initial calculation
    updateWidth();
    
    // Add event listener to recalculate on resize
    window.addEventListener('resize', updateWidth);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [containerRef]);
  
  return { containerWidth };
};
