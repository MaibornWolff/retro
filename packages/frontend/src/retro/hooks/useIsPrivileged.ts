import { useUserContext } from "../../common/context/UserContext";
import { RetroCard } from "../types/retroTypes";
import { isModerator } from "../../common/utils/participantsUtils";

export function useIsPrivileged(card: RetroCard) {
  const { user } = useUserContext();

  const isOwner = card.owners.some((owner) => owner.id === user.id);

  return isModerator(user) || isOwner;
}
