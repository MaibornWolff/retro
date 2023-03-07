import { useEffect, useRef } from "react";
import { UserByUserId } from "../../retro/types/retroTypes";

export interface UseFirstWaitingUserOptions {
  waitingList: UserByUserId;
  onFirstUserWaiting: () => void;
}

export function useFirstWaitingUser({
  waitingList,
  onFirstUserWaiting,
}: UseFirstWaitingUserOptions) {
  const waitingUsersCount = Object.entries(waitingList).length;
  const prevWaitingUsersCount = useRef(Object.entries(waitingList).length);

  useEffect(() => {
    if (prevWaitingUsersCount.current === 0 && waitingUsersCount === 1) {
      // waiting list went from 0 to 1
      onFirstUserWaiting();
    }
    prevWaitingUsersCount.current = waitingUsersCount;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitingList]);
}
