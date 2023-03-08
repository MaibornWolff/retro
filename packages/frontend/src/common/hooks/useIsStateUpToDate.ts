import { useEffect, useRef } from "react";
import { isModerator } from "../utils/participantsUtils";
import { useUserContext } from "../context/UserContext";

export function useIsStateUpToDate() {
  const isStateUpToDate = useRef(false);
  const { user } = useUserContext();

  useEffect(() => {
    isStateUpToDate.current = isModerator(user) || isStateUpToDate.current;
  }, [user]);

  return isStateUpToDate;
}
