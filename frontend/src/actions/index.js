import {
  setVotedItem,
  setUser,
  setMaxVoteCountAndReset
} from "../utils/roleHandlers";
import { UPVOTE, DOWNVOTE, SET_MAX_VOTE, RESET } from "./actionTypes";

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
