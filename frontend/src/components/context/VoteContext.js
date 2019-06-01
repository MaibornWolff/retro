import React, { useReducer } from "react";
import { getUser } from "../../utils/roleHandlers";
import { UPVOTE, DOWNVOTE } from "../../actions/actionTypes";

export const VoteContext = React.createContext();

function getInitialState(boardId) {
  const roleObject = getUser(boardId);

  if (roleObject !== null) {
    const { maxVoteCount, name, role, votedItems, votesLeft } = roleObject;
    return {
      maxVoteCount,
      name,
      role,
      votedItems,
      votesLeft
    };
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
