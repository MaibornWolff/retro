import {
  setVotedItem,
  setUser,
  setMaxVoteCountAndReset,
  createRole,
  ROLE_MODERATOR,
  ROLE_PARTICIPANT
} from "../utils/userUtils";
import {
  UPVOTE,
  DOWNVOTE,
  SET_MAX_VOTE,
  RESET,
  SET_NAME,
  CREATE_MODERATOR,
  CREATE_PARTICIPANT,
  SET_FOCUSED_CARD,
  REMOVE_FOCUSED_CARD
} from "./actionTypes";

export const upvoteCard = (boardId, cardId, votesLeft, dispatch) => {
  dispatch({ type: UPVOTE, payload: { cardId } });
  setVotedItem(cardId, boardId, true);
  setUser("votesLeft", votesLeft - 1, boardId);
};

export const downvoteCard = (boardId, cardId, votesLeft, dispatch) => {
  dispatch({ type: DOWNVOTE, payload: { cardId } });
  setVotedItem(cardId, boardId, false);
  setUser("votesLeft", votesLeft + 1, boardId);
};

export const setMaxVote = (boardId, maxVoteCount, dispatch) => {
  dispatch({ type: SET_MAX_VOTE, payload: { maxVoteCount } });
  setMaxVoteCountAndReset(maxVoteCount, boardId);
};

export const resetVotes = (boardId, maxVoteCount, dispatch) => {
  dispatch({ type: RESET });
  setMaxVoteCountAndReset(maxVoteCount, boardId);
};

export const setUsername = (boardId, name, dispatch) => {
  dispatch({ type: SET_NAME, payload: { name } });
  setUser("name", name, boardId);
};

export const createModerator = (boardId, role, maxVoteCount, dispatch) => {
  dispatch({ type: CREATE_MODERATOR, payload: { role, maxVoteCount } });
  createRole(ROLE_MODERATOR, boardId, maxVoteCount);
};

export const createParticipant = (boardId, role, maxVoteCount, dispatch) => {
  dispatch({ type: CREATE_PARTICIPANT, payload: { role, maxVoteCount } });
  createRole(ROLE_PARTICIPANT, boardId, maxVoteCount);
};

export const setFocusedCard = (focusedCard, dispatch) => {
  dispatch({ type: SET_FOCUSED_CARD, payload: { focusedCard } });
};

export const removeFocusedCard = dispatch => {
  dispatch({ type: REMOVE_FOCUSED_CARD });
};
