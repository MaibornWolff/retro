import React, { useReducer } from "react";
import { getUser } from "../../utils/roleHandlers";
import {
  UPVOTE,
  DOWNVOTE,
  SET_MAX_VOTE,
  RESET
} from "../../actions/actionTypes";

export const VoteContext = React.createContext();

function getInitialState(boardId) {
  const userObject = getUser(boardId);

  if (userObject !== null) {
    return userObject;
  }

  return {};
}

function removeFirstOccurence(array, element) {
  const index = array.indexOf(element);

  if (index > -1) {
    array.splice(index, 1);
  }

  return array;
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
        votedItems: removeFirstOccurence(
          state.votedItems,
          action.payload.cardId
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
    default:
      return state;
  }
}

export const VoteContextProvider = props => {
  const boardId = props.match.params.boardId;
  const [state, dispatch] = useReducer(reducer, getInitialState(boardId));

  const value = {
    userState: state,
    dispatch
  };

  return (
    <VoteContext.Provider value={value}>{props.children}</VoteContext.Provider>
  );
};
