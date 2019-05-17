import { ROLE_MODERATOR } from "../utils/roleHandlers";

const moderatorRole = {
  role: ROLE_MODERATOR,
  name: "Scrum Master",
  maxVoteCount: 3,
  votesLeft: 3
};

export const setModerator = boardId => {
  localStorage.setItem(boardId, JSON.stringify(moderatorRole));
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
