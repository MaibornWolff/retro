import React, { Dispatch, useContext, useReducer } from "react";
import { usePeerToPeer } from "../../common/hooks/usePeerToPeer";
import { PokerState } from "../types/pokerTypes";
import {
  PokerAction,
  SendVoteAction,
  SetPokerUnitAction,
  SetUserStoryAction,
} from "../types/pokerActions";
import { pokerReducer } from "../reducers/pokerReducer";
import { useErrorContext } from "../../common/context/ErrorContext";
import { JoinSessionAction, TransferModeratorRoleAction } from "../../common/types/peerToPeerTypes";
import { useSyncUser } from "../../common/hooks/useSyncUser";

interface PokerContextProviderProps {
  children?: React.ReactNode;
}

export interface PokerContextValues {
  pokerState: PokerState;
  broadcastAction: (event: PokerAction) => void;
  sendAction: (event: PokerAction, userId: string) => void;
  dispatchPokerStateAction: Dispatch<PokerAction>;
  handleShowPokerResults: () => void;
  handleSetUserStory: (payload: SetUserStoryAction["payload"]) => void;
  handleResetUserStory: () => void;
  handleSetPokerUnit: (payload: SetPokerUnitAction["payload"]) => void;
  handleSendVote: (payload: SendVoteAction["payload"]) => void;
  handleTransferModeratorRole: (payload: TransferModeratorRoleAction["payload"]) => void;
  handleKickUser: (userId: string) => void;
  handleJoinSession: (payload: JoinSessionAction["payload"]) => void;
}

const initialState: PokerState = {
  story: {
    storyTitle: "",
    storyUrl: "",
  },
  pokerUnit: {
    unitType: "fibonacci",
    unitRangeHigh: 34,
  },
  participants: {},
  showResults: false,
};

export const PokerContext = React.createContext<PokerContextValues>(undefined!);
export default function PokerContextProvider(props: PokerContextProviderProps) {
  const [state, dispatch] = useReducer(pokerReducer, initialState);
  const { setIsError } = useErrorContext();

  useSyncUser(state.participants);

  const { broadcastAction, sendAction } = usePeerToPeer<PokerState, PokerAction>({
    state,
    onDataReceived: dispatch,
    onUserDisconnected: handleUserDisconnect,
    onError: handleError,
  });

  function handleError() {
    setIsError(true);
  }

  function handleUserDisconnect(userId: string) {
    const event: PokerAction = { type: "DISCONNECT", payload: userId };
    dispatch(event);
  }

  function handleShowPokerResults() {
    const event: PokerAction = { type: "SHOW_POKER_RESULTS" };
    dispatch(event);
    broadcastAction(event);
  }

  function handleSetUserStory(payload: SetUserStoryAction["payload"]) {
    const event: PokerAction = { type: "SET_USER_STORY", payload };
    dispatch(event);
    broadcastAction(event);
  }

  function handleResetUserStory() {
    const event: PokerAction = { type: "RESET_USER_STORY" };
    dispatch(event);
    broadcastAction(event);
  }

  function handleSetPokerUnit(payload: SetPokerUnitAction["payload"]) {
    const event: PokerAction = { type: "SET_POKER_UNIT", payload };
    dispatch(event);
    broadcastAction(event);
  }

  function handleSendVote(payload: SendVoteAction["payload"]) {
    const event: PokerAction = { type: "SEND_VOTE", payload };
    dispatch(event);
    broadcastAction(event);
  }

  function handleTransferModeratorRole(payload: TransferModeratorRoleAction["payload"]) {
    const event: PokerAction = { type: "TRANSFER_MODERATOR_ROLE", payload };
    dispatch(event);
    broadcastAction(event);
  }

  function handleKickUser(userId: string) {
    sendAction({ type: "KICK" }, userId);
  }

  function handleJoinSession(payload: JoinSessionAction["payload"]) {
    const event: PokerAction = { type: "JOIN_SESSION", payload };
    dispatch(event);
  }

  const value: PokerContextValues = {
    pokerState: state,
    broadcastAction,
    sendAction,
    dispatchPokerStateAction: dispatch,
    handleShowPokerResults,
    handleSetUserStory,
    handleResetUserStory,
    handleSetPokerUnit,
    handleSendVote,
    handleTransferModeratorRole,
    handleKickUser,
    handleJoinSession,
  };

  return <PokerContext.Provider value={value}>{props.children}</PokerContext.Provider>;
}

export function usePokerContext() {
  return useContext(PokerContext);
}
