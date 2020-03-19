import React, { useReducer } from "react";
import io from "socket.io-client";

import { reducer } from "../reducers/boardReducer";
import { BACKEND_ENDPOINT } from "../utils";
import {
  SET_FOCUSED_CARD,
  REMOVE_FOCUSED_CARD,
  SET_CONTINUE_DISCUSSION,
  CONTINUE_DISCUSSION_VOTE_YES,
  CONTINUE_DISCUSSION_VOTE_NO,
  CONTINUE_DISCUSSION_VOTE_ABSTAIN
} from "../actionTypes/boardTypes";

export const BoardContext = React.createContext();

const initialState = {
  focusedCard: "",
  showContinueDiscussion: false,
  continueDiscussionVotes: {
    yes: 0,
    no: 0,
    abstain: 0
  }
};

let socket;

export const BoardContextProvider = props => {
  const boardId = props.match.params.boardId;
  const [boardState, dispatch] = useReducer(reducer, initialState);

  if (!socket) {
    socket = io(BACKEND_ENDPOINT, { query: "boardId=" + boardId });
  }

  const setFocusedCard = focusedCard => {
    dispatch({ type: SET_FOCUSED_CARD, payload: { focusedCard } });
  };

  const removeFocusedCard = () => {
    dispatch({ type: REMOVE_FOCUSED_CARD });
  };

  const toggleContinueDiscussion = isToggled => {
    dispatch({ type: SET_CONTINUE_DISCUSSION, payload: { isToggled } });
  };

  const voteYes = () => {
    dispatch({ type: CONTINUE_DISCUSSION_VOTE_YES });
  };

  const voteNo = () => {
    dispatch({ type: CONTINUE_DISCUSSION_VOTE_NO });
  };

  const voteAbstain = () => {
    dispatch({ type: CONTINUE_DISCUSSION_VOTE_ABSTAIN });
  };

  const value = {
    boardId,
    boardState,
    socket,
    setFocusedCard,
    removeFocusedCard,
    toggleContinueDiscussion,
    voteYes,
    voteNo,
    voteAbstain
  };

  return <BoardContext.Provider value={value}>{props.children}</BoardContext.Provider>;
};
