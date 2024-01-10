import { User } from "../types/commonTypes";

export function determineNewModerator<T extends User>(users: T[]): T | undefined {
  const [newModerator] = users.sort((a, b) => a.id.localeCompare(b.id));
  if (!newModerator) return;

  return { ...newModerator, isModerator: true };
}
