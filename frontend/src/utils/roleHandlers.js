export const ROLE_MODERATOR = "moderator";

export const ROLE_PARTICIPANT = "participant";

export const isModerator = boardId => {
  const roleObject = localStorage.getItem(boardId);

  if (roleObject !== null) {
    const json = JSON.parse(roleObject);
    return json.role === ROLE_MODERATOR;
  }

  return false;
};

export const getUser = boardId => {
  const roleObject = localStorage.getItem(boardId);

  if (roleObject !== null) {
    return JSON.parse(roleObject);
  }

  return null;
};

export const setUser = (propertyName, newValue, boardId) => {
  const roleObject = localStorage.getItem(boardId);

  if (roleObject !== null) {
    const json = JSON.parse(roleObject);
    json[propertyName] = newValue;
    localStorage.setItem(boardId, JSON.stringify(json));
  }
};

export const setMaxVoteCount = (newVoteCount, boardId) => {
  const roleObject = localStorage.getItem(boardId);

  if (roleObject !== null) {
    const json = JSON.parse(roleObject);
    json["maxVoteCount"] = newVoteCount;
    json["votesLeft"] = newVoteCount;
    localStorage.setItem(boardId, JSON.stringify(json));
  }
};

export const getVotesLeft = boardId => {
  const roleObject = localStorage.getItem(boardId);

  if (roleObject !== null) {
    const json = JSON.parse(roleObject);
    return json["votesLeft"];
  }

  return -1;
};

export const createRole = (boardId, role) => {
  const data = JSON.stringify({
    role,
    name: "",
    maxVoteCount: 3,
    votesLeft: 3
  });

  localStorage.setItem(boardId, data);
};
