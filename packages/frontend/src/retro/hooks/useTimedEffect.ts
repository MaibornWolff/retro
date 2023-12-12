import { useEffect, useState } from "react";

interface useFinishEffectProps {
  effectLength: number;
}
export default function useTimedEffect({ effectLength }: useFinishEffectProps) {
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
    if (!isEffectActive) {
      setIsEffectActive(true);
    }
  }
  return {
    isEffectActive,
    startEffect,
  };
}
