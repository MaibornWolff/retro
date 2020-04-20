import { removeFirstOccurenceFromArray } from ".";

export const ROLE_MODERATOR = "moderator";

export const ROLE_PARTICIPANT = "participant";

export const getUser = (boardId) => {
  const userObject = localStorage.getItem(boardId);

  if (userObject !== null) {
    return JSON.parse(userObject);
  }

  return null;
};

export const setUser = (propertyName, newValue, boardId) => {
  const userObject = getUser(boardId);

  if (userObject !== null) {
    userObject[propertyName] = newValue;
    saveToLocalStorage(boardId, JSON.stringify(userObject));
  }
};

export const setVotedItem = (cardId, boardId, isUpvote) => {
  const userObject = getUser(boardId);

  if (userObject !== null) {
    const votedItems = userObject["votedItems"];

    if (isUpvote) votedItems.push(cardId);
    else removeFirstOccurenceFromArray(votedItems, cardId, false);

    userObject["votedItems"] = votedItems;
    saveToLocalStorage(boardId, JSON.stringify(userObject));
  }
};

export const setMaxVoteCountAndReset = (newVoteCount, boardId) => {
  const userObject = getUser(boardId);

  if (userObject !== null) {
    userObject["maxVoteCount"] = newVoteCount;
    userObject["votesLeft"] = newVoteCount;
    userObject["votedItems"] = [];
    saveToLocalStorage(boardId, JSON.stringify(userObject));
  }
};

export const hasVotedFor = (cardId, boardId) => {
  const userObject = getUser(boardId);

  if (userObject !== null) {
    const votedItems = userObject["votedItems"];

    if (votedItems.includes(cardId)) {
      return true;
    }

    return false;
  }
};

export const createRole = (role, boardId, maxVoteCount) => {
  const data = JSON.stringify({
    role,
    name: "",
    maxVoteCount,
    votesLeft: maxVoteCount,
    votedItems: [],
  });

  saveToLocalStorage(boardId, data);
};

const saveToLocalStorage = (boardId, data) => {
  localStorage.setItem(boardId, data);
};
