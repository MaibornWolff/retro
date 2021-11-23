import React, { useReducer } from "react";
import { useParams } from "react-router-dom";
import {
  CREATE_MODERATOR,
  CREATE_PARTICIPANT,
  DOWNVOTE,
  RESET,
  SET_MAX_VOTE,
  SET_NAME,
  UPVOTE,
  WROTE_COMMENT,
} from "../actions/user.actions";
import { reducer } from "../reducers/user.reducer";
import { UserContextValues } from "../types/context.types";
import {
  createRole,
  getUser,
  ROLE_MODERATOR,
  ROLE_PARTICIPANT,
  setMaxVoteCountAndReset,
  setUser,
  setVotedItem,
} from "../utils/user.utils";

type UserContextProviderProps = {
  children?: React.ReactNode;
};

interface ParamTypes {
  boardId: string;
}

function getInitialState(boardId: string) {
  const userObject = getUser(boardId);

  if (userObject !== null) {
    return userObject;
  }

  return {};
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const UserContext = React.createContext<UserContextValues>(undefined!);

export default function UserContextProvider(props: UserContextProviderProps) {
  const { boardId } = useParams<ParamTypes>();
  const [userState, dispatch] = useReducer(reducer, getInitialState(boardId));

  function upvoteCard(boardId: string, cardId: string, votesLeft: number) {
    dispatch({ type: UPVOTE, payload: { cardId } });
    setVotedItem(cardId, boardId, true);
    setUser("votesLeft", votesLeft - 1, boardId);
  }

  function downvoteCard(boardId: string, cardId: string, votesLeft: number) {
    dispatch({ type: DOWNVOTE, payload: { cardId } });
    setVotedItem(cardId, boardId, false);
    setUser("votesLeft", votesLeft + 1, boardId);
  }

  function setMaxVote(boardId: string, maxVoteCount: number) {
    dispatch({ type: SET_MAX_VOTE, payload: { maxVoteCount } });
    setMaxVoteCountAndReset(maxVoteCount, boardId);
  }

  function resetVotes(boardId: string, maxVoteCount: number) {
    dispatch({ type: RESET });
    setMaxVoteCountAndReset(maxVoteCount, boardId);
  }

  function setUsername(boardId: string, name: string) {
    dispatch({ type: SET_NAME, payload: { name } });
    setUser("name", name, boardId);
  }

  function createModerator(
    boardId: string,
    role: string,
    maxVoteCount: number
  ) {
    dispatch({ type: CREATE_MODERATOR, payload: { role, maxVoteCount } });
    createRole(ROLE_MODERATOR, boardId, maxVoteCount);
  }

  function createParticipant(
    boardId: string,
    role: string,
    maxVoteCount: number
  ) {
    dispatch({ type: CREATE_PARTICIPANT, payload: { role, maxVoteCount } });
    createRole(ROLE_PARTICIPANT, boardId, maxVoteCount);
  }

  function commentItem(boardId: string, commentId: string) {
    const oldCommentList = userState.writtenComments;
    dispatch({ type: WROTE_COMMENT, payload: { commentId } });
    setUser("writtenComments", oldCommentList.concat(commentId), boardId);
  }

  const value = {
    userState,
    upvoteCard,
    downvoteCard,
    setMaxVote,
    resetVotes,
    setUsername,
    createModerator,
    createParticipant,
    commentItem,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
