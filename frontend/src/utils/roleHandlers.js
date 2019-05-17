export const isModerator = boardId => localStorage.getItem(boardId) !== null;

export const getUser = boardId => {
  const moderatorItem = localStorage.getItem(boardId);
  const participantItem = sessionStorage.getItem(boardId);

  if (moderatorItem !== null) {
    return JSON.parse(moderatorItem);
  }

  if (participantItem !== null) {
    return JSON.parse(participantItem);
  }

  return null;
};

export const setUser = (propertyName, newValue, boardId) => {
  const moderatorItem = localStorage.getItem(boardId);
  const participantItem = sessionStorage.getItem(boardId);

  if (moderatorItem !== null) {
    const json = JSON.parse(moderatorItem);
    json[propertyName] = newValue;
    localStorage.setItem(boardId, JSON.stringify(json));
  }

  if (participantItem !== null) {
    const json = JSON.parse(participantItem);
    json[propertyName] = newValue;
    sessionStorage.setItem(boardId, JSON.stringify(json));
  }
};

export const setMaxVoteCount = (newVoteCount, boardId) => {
  const moderatorItem = localStorage.getItem(boardId);
  const participantItem = sessionStorage.getItem(boardId);

  if (moderatorItem !== null) {
    const json = JSON.parse(moderatorItem);

    json["maxVoteCount"] = newVoteCount;
    json["votesLeft"] = newVoteCount;

    localStorage.setItem(boardId, JSON.stringify(json));
  }

  if (participantItem !== null) {
    const json = JSON.parse(participantItem);

    json["maxVoteCount"] = newVoteCount;
    json["votesLeft"] = newVoteCount;

    sessionStorage.setItem(boardId, JSON.stringify(json));
  }
};

export const getVotesLeft = boardId => {
  const moderatorItem = localStorage.getItem(boardId);
  const participantItem = sessionStorage.getItem(boardId);

  if (moderatorItem !== null) {
    const json = JSON.parse(moderatorItem);
    return json["votesLeft"];
  }

  if (participantItem !== null) {
    const json = JSON.parse(participantItem);
    return json["votesLeft"];
  }

  return -1;
};

export const createModeratorRole = boardId => {
  const data = JSON.stringify({
    role: "moderator",
    name: "",
    maxVoteCount: 3,
    votesLeft: 3
  });
  localStorage.setItem(boardId, data);
};

export const createParticipantRole = boardId => {
  const data = JSON.stringify({
    role: "participant",
    name: "",
    maxVoteCount: 3,
    votesLeft: 3
  });
  sessionStorage.setItem(boardId, data);
};
