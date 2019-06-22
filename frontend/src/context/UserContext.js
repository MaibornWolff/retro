import React, { useReducer } from "react";
import { reducer } from "../reducers/userReducer";
import {
  getUser,
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
  CREATE_PARTICIPANT
} from "../actionTypes/userTypes";

export const UserContext = React.createContext();

function getInitialState(boardId) {
  const userObject = getUser(boardId);

  if (userObject !== null) {
    return userObject;
  }

  return {};
}

export const UserContextProvider = props => {
  const boardId = props.match.params.boardId;
  const [userState, dispatch] = useReducer(reducer, getInitialState(boardId));

  const upvoteCard = (boardId, cardId, votesLeft) => {
    dispatch({ type: UPVOTE, payload: { cardId } });
    setVotedItem(cardId, boardId, true);
    setUser("votesLeft", votesLeft - 1, boardId);
  };

  const downvoteCard = (boardId, cardId, votesLeft) => {
    dispatch({ type: DOWNVOTE, payload: { cardId } });
    setVotedItem(cardId, boardId, false);
    setUser("votesLeft", votesLeft + 1, boardId);
  };

  const setMaxVote = (boardId, maxVoteCount) => {
    dispatch({ type: SET_MAX_VOTE, payload: { maxVoteCount } });
    setMaxVoteCountAndReset(maxVoteCount, boardId);
  };

  const resetVotes = (boardId, maxVoteCount) => {
    dispatch({ type: RESET });
    setMaxVoteCountAndReset(maxVoteCount, boardId);
  };

  const setUsername = (boardId, name) => {
    dispatch({ type: SET_NAME, payload: { name } });
    setUser("name", name, boardId);
  };

  const createModerator = (boardId, role, maxVoteCount) => {
    dispatch({ type: CREATE_MODERATOR, payload: { role, maxVoteCount } });
    createRole(ROLE_MODERATOR, boardId, maxVoteCount);
  };

  const createParticipant = (boardId, role, maxVoteCount) => {
    dispatch({ type: CREATE_PARTICIPANT, payload: { role, maxVoteCount } });
    createRole(ROLE_PARTICIPANT, boardId, maxVoteCount);
  };

  const value = {
    userState,
    upvoteCard,
    downvoteCard,
    setMaxVote,
    resetVotes,
    setUsername,
    createModerator,
    createParticipant
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
