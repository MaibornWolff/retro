export const ROLE_MODERATOR = "moderator";

export const ROLE_PARTICIPANT = "participant";

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

export const setVotedItem = (cardId, boardId, isUpvote) => {
  const roleObject = localStorage.getItem(boardId);

  if (roleObject !== null) {
    const json = JSON.parse(roleObject);
    const votedItems = json["votedItems"];

    if (isUpvote) votedItems.push(cardId);
    else removeFirstOccurence(votedItems, cardId);

    json["votedItems"] = votedItems;
    localStorage.setItem(boardId, JSON.stringify(json));
  }
};

export const hasVotedFor = (cardId, boardId) => {
  const roleObject = localStorage.getItem(boardId);

  if (roleObject !== null) {
    const json = JSON.parse(roleObject);
    const votedItems = json["votedItems"];

    if (votedItems.includes(cardId)) {
      return true;
    }

    return false;
  }
};

export const setMaxVoteCountAndReset = (newVoteCount, boardId) => {
  const roleObject = localStorage.getItem(boardId);

  if (roleObject !== null) {
    const json = JSON.parse(roleObject);
    json["maxVoteCount"] = newVoteCount;
    json["votesLeft"] = newVoteCount;
    json["votedItems"] = [];
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

export const createRole = (role, boardId, maxVoteCount) => {
  const data = JSON.stringify({
    role,
    name: "",
    maxVoteCount,
    votesLeft: maxVoteCount,
    votedItems: []
  });

  localStorage.setItem(boardId, data);
};

export const removeFirstOccurence = (array, element) => {
  const index = array.indexOf(element);

  if (index > -1) {
    array.splice(index, 1);
  }
};
