import { useEffect, useState } from "react";
import useSound from "use-sound";

interface useTimedEffectProps {
  effectLength: number;
}

export default function useTimedEffect({ effectLength }: useTimedEffectProps) {
  const [isWiggleEffectActive, setIsWiggleEffectActive] = useState(false);
  const [playTimeExpiredSound] = useSound("/sfx/timer_expired.wav");

  useEffect(() => {
    if (isWiggleEffectActive) {
      const timeout = setTimeout(() => {
        setIsWiggleEffectActive(false);
      }, effectLength);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isWiggleEffectActive, effectLength]);

  function startWiggleEffect() {
    setIsWiggleEffectActive(true);
  }

  return {
    isWiggleEffectActive,
    startWiggleEffect,
    playTimeExpiredSound,
  };
}
