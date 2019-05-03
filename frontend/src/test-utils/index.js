const moderatorRole = { role: "moderator", name: "Thanos" };

export const setModeratorRole = boardId => {
  localStorage.setItem(boardId, JSON.stringify(moderatorRole));
};

export const removeModeratorRole = boardId => {
  localStorage.removeItem(boardId);
};
