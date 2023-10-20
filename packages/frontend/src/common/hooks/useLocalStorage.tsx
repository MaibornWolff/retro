import { useEffect } from "react";

export function useLocalStorage(action: () => void) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      action();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
