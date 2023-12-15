import { useEffect, useState } from "react";

interface useTimedEffectProps {
  effectLength: number;
}
export default function useTimedEffect({ effectLength }: useTimedEffectProps) {
  const [isEffectActive, setIsEffectActive] = useState(false);

  useEffect(() => {
    if (isEffectActive) {
      const timeout = setTimeout(() => {
        setIsEffectActive(false);
      }, effectLength);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isEffectActive, effectLength]);

  function startEffect() {
    setIsEffectActive(true);
  }

  return {
    isEffectActive,
    startEffect,
  };
}
