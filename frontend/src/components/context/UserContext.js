import React, { useReducer } from "react";
import { getUser } from "../../utils/userUtils";
import {
  UPVOTE,
  DOWNVOTE,
  SET_MAX_VOTE,
  RESET,
  SET_NAME
} from "../../actions/actionTypes";
import { removeFirstOccurenceFromArray } from "../../utils";

export const UserContext = React.createContext();

function getInitialState(boardId) {
  const userObject = getUser(boardId);

  if (userObject !== null) {
    return userObject;
  }

  return {};
}

function reducer(state, action) {
  switch (action.type) {
    case UPVOTE:
      return {
        ...state,
        votesLeft: state.votesLeft - 1,
        votedItems: [...state.votedItems, action.payload.cardId]
      };
    case DOWNVOTE:
      return {
        ...state,
        votesLeft: state.votesLeft + 1,
        votedItems: removeFirstOccurenceFromArray(
          state.votedItems,
          action.payload.cardId,
          true
        )
      };
    case SET_MAX_VOTE:
      return {
        ...state,
        maxVoteCount: action.payload.maxVoteCount,
        votesLeft: action.payload.maxVoteCount,
        votedItems: []
      };
    case RESET:
      return {
        ...state,
        votesLeft: state.maxVoteCount,
        votedItems: []
      };
    case SET_NAME:
      return {
        ...state,
        name: action.payload.name
      };
    default:
      return state;
  }
}

export const UserContextProvider = props => {
  const boardId = props.match.params.boardId;
  const [state, dispatch] = useReducer(reducer, getInitialState(boardId));

  const value = {
    userState: state,
    dispatch
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
