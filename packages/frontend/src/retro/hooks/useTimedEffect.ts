import { useEffect, useState } from "react";

interface useFinishEffectProps {
  effectLength: number;
}
export default function useTimedEffect({ effectLength }: useFinishEffectProps) {
  const [isEffectActive, setIsEffectActive] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsEffectActive(false);
    }, effectLength);
    return () => {
      clearTimeout(timeout);
    };
  }, [isEffectActive]);

  function startEffect() {
    setIsEffectActive(true);
  }
  return {
    isEffectActive,
    startEffect,
  };
}
