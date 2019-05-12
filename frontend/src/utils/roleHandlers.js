export const isModerator = boardId => {
  const item = localStorage.getItem(boardId);
  if (item !== null) {
    const json = JSON.parse(item);
    return json.role === "moderator" ? true : false;
  }

  return false;
};

export const setUsername = (boardId, newName) => {
  const item = localStorage.getItem(boardId);
  if (item !== null) {
    const json = JSON.parse(item);
    json.name = newName;
    localStorage.setItem(boardId, JSON.stringify(json));
  }
};

export const getUsername = boardId => {
  const item = localStorage.getItem(boardId);
  if (item !== null) {
    const json = JSON.parse(item);
    return json.name;
  }
  return "";
};

export const createModeratorRole = boardId => {
  localStorage.setItem(
    boardId,
    JSON.stringify({ role: "moderator", name: "" })
  );
};

export const createParticipantRole = boardId => {
  sessionStorage.setItem(
    boardId,
    JSON.stringify({ role: "participant", name: "" })
  );
};
