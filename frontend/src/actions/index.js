import { setVotedItem, setUser } from "../utils/roleHandlers";
import { UPVOTE, DOWNVOTE } from "./actionTypes";

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
