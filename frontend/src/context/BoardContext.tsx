import React, { useReducer } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import {
  CONTINUE_DISCUSSION_VOTE_ABSTAIN,
  CONTINUE_DISCUSSION_VOTE_NO,
  CONTINUE_DISCUSSION_VOTE_YES,
  REMOVE_FOCUSED_CARD,
  SET_CONTINUE_DISCUSSION,
  SET_FOCUSED_CARD,
  SHOW_REACTION,
  UPDATE_COMMENTS,
} from "../actions/board.actions";
import { reducer } from "../reducers/board.reducer";
import { RetroCommentMap } from "../types/common.types";
import { BoardContextValues } from "../types/context.types";
import { BACKEND_ENDPOINT } from "../utils";

type BoardContextProviderProps = {
  children?: React.ReactNode;
};

interface ParamTypes {
  boardId: string;
}

const initialState = {
  focusedCard: "",
  shownReactions: [],
  comments: {},
  showContinueDiscussion: false,
  continueDiscussionVotes: {
    yes: 0,
    no: 0,
    abstain: 0,
  },
};

let socket: SocketIOClient.Socket;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const BoardContext = React.createContext<BoardContextValues>(undefined!);

export default function BoardContextProvider(props: BoardContextProviderProps) {
  const { boardId } = useParams<ParamTypes>();
  const [boardState, dispatch] = useReducer(reducer, initialState);

  if (!socket) {
    socket = io(BACKEND_ENDPOINT, { query: "boardId=" + boardId });
  }

  function setFocusedCard(focusedCard: string) {
    dispatch({ type: SET_FOCUSED_CARD, payload: { focusedCard } });
  }

  function showReaction(reactionId: string) {
    dispatch({ type: SHOW_REACTION, payload: { reactionId } });
  }

  function removeFocusedCard() {
    dispatch({ type: REMOVE_FOCUSED_CARD });
  }

  function toggleContinueDiscussion(isToggled: boolean) {
    dispatch({ type: SET_CONTINUE_DISCUSSION, payload: { isToggled } });
  }

  function updateComments(comments: RetroCommentMap) {
    dispatch({ type: UPDATE_COMMENTS, payload: { comments } });
  }

  function voteYes() {
    dispatch({ type: CONTINUE_DISCUSSION_VOTE_YES });
  }

  function voteNo() {
    dispatch({ type: CONTINUE_DISCUSSION_VOTE_NO });
  }

  function voteAbstain() {
    dispatch({ type: CONTINUE_DISCUSSION_VOTE_ABSTAIN });
  }

  const value = {
    boardId,
    boardState,
    socket,
    setFocusedCard,
    showReaction,
    removeFocusedCard,
    toggleContinueDiscussion,
    updateComments,
    voteYes,
    voteNo,
    voteAbstain,
  };

  return (
    <BoardContext.Provider value={value}>
      {props.children}
    </BoardContext.Provider>
  );
}
