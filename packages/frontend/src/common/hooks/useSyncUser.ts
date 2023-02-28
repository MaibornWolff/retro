import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { User } from "../types/commonTypes";

export function useSyncUser<T extends User>(participants: Record<string, T>) {
  const { user, setUser } = useUserContext();

  useEffect(() => {
    const myUser = participants[user.id];
    if (!myUser) return;
    setUser(myUser);
  }, [participants, setUser, user.id]);
}
