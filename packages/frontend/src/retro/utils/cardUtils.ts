import { RetroCard } from "../types/retroTypes";

export function isCardVotedByUser(card: RetroCard, userId: string) {
  return Boolean(card.votes[userId]);
}
