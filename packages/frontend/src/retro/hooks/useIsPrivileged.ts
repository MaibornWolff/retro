import { useUserContext } from "../../common/context/UserContext";
import { RetroCard } from "../types/retroTypes";

export function useIsPrivileged(card: RetroCard) {
  const { user } = useUserContext();

  const isOwner = card.owners.some((owner) => owner.id === user.id);

  return user.role === "moderator" || isOwner;
}
