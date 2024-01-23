import { determineNewModerator } from "./determineNewModerator";
import { User } from "../types/commonTypes";
import { UserByUserId } from "../../retro/types/retroTypes";

export function getRemainingParticipants<T extends User>(
  participants: Record<string, T>,
  disconnectedUserId: string,
): Record<string, T> {
  const { [disconnectedUserId]: _disconnectedUser, ...remainingParticipants } = participants;
  return { ...remainingParticipants };
}

export function getRemainingParticipantsWithNewModerator<T extends User>(
  participants: Record<string, T>,
  disconnectedUserId: string,
): Record<string, T> {
  const { [disconnectedUserId]: _disconnectedUser, ...remainingParticipants } = participants;
  const newModerator = determineNewModerator(Object.values(remainingParticipants));
  if (!newModerator) return remainingParticipants;

  return {
    ...remainingParticipants,
    [newModerator.id]: newModerator,
  };
}

export function findModerators<T extends User>(participants: Record<string, T>) {
  return Object.values(participants).filter((participant) => isModerator(participant));
}

export function isModerator(user: User) {
  return user.role === "moderator";
}

export function hasRemainingModerator<T extends User>(
  participants: Record<string, T>,
  disconnectedUserId: string,
) {
  return Object.values(participants).some(
    ({ id, role }) => disconnectedUserId !== id && role === "moderator",
  );
}

export function isWaitingUser(waitingList: UserByUserId, userId: string): boolean {
  return Boolean(waitingList[userId]);
}
