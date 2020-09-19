import { removeFirstOccurenceFromArray } from ".";

export const ROLE_MODERATOR = "moderator";
export const ROLE_PARTICIPANT = "participant";

export function getUser(boardId: string) {
  const userObject = localStorage.getItem(boardId);
  if (userObject !== null) {
    return JSON.parse(userObject);
  }
  return null;
}

export function setUser(propertyName: string, newValue: any, boardId: string) {
  const userObject = getUser(boardId);
  if (userObject !== null) {
    userObject[propertyName] = newValue;
    saveToLocalStorage(boardId, JSON.stringify(userObject));
  }
}

export function setVotedItem(
  cardId: string,
  boardId: string,
  isUpvote: boolean
) {
  const userObject = getUser(boardId);

  if (userObject !== null) {
    const votedItems = userObject["votedItems"];

    if (isUpvote) votedItems.push(cardId);
    else removeFirstOccurenceFromArray(votedItems, cardId);

    userObject["votedItems"] = votedItems;
    saveToLocalStorage(boardId, JSON.stringify(userObject));
  }
}

export function setMaxVoteCountAndReset(newVoteCount: number, boardId: string) {
  const userObject = getUser(boardId);
  if (userObject !== null) {
    userObject["maxVoteCount"] = newVoteCount;
    userObject["votesLeft"] = newVoteCount;
    userObject["votedItems"] = [];
    saveToLocalStorage(boardId, JSON.stringify(userObject));
  }
}

export function hasVotedFor(cardId: string, boardId: string) {
  const userObject = getUser(boardId);
  if (userObject !== null) {
    const votedItems = userObject["votedItems"];
    if (votedItems.includes(cardId)) {
      return true;
    }
  }
  return false;
}

export function createRole(
  role: string,
  boardId: string,
  maxVoteCount: number
) {
  const data = JSON.stringify({
    role,
    name: "",
    maxVoteCount,
    votesLeft: maxVoteCount,
    votedItems: [],
  });
  saveToLocalStorage(boardId, data);
}

function saveToLocalStorage(boardId: string, data: string) {
  localStorage.setItem(boardId, data);
}
