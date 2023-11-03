import { useCallback, useState } from "react";

export function useHover() {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleUnhover = useCallback(() => {
    setIsHovered(false);
  }, []);

  return {
    isHovered,
    handleHover,
    handleUnhover,
  };
}
