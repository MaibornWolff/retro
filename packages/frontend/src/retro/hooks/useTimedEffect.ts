import { useEffect, useState } from "react";
import useSound from "use-sound";

interface useTimedEffectProps {
  effectLength: number;
}

export default function useTimedEffect({ effectLength }: useTimedEffectProps) {
  const [isEffectActive, setIsEffectActive] = useState(false);
  const [playTimeExpiredSound] = useSound("/sfx/timer_expired.wav");

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
    playTimeExpiredSound();
  }

  return {
    isEffectActive,
    startEffect,
  };
}
