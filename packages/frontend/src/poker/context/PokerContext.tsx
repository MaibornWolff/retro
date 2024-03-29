import React, { useCallback, useContext, useReducer } from "react";
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
import {
  AddToWaitingListAction,
  JoinSessionAction,
  RemoveFromWaitingListAction,
  TransferModeratorRoleAction,
} from "../../common/types/peerToPeerTypes";
import { useSyncUser } from "../../common/hooks/useSyncUser";
import { useUserContext } from "../../common/context/UserContext";
import { ErrorState } from "../../common/types/commonTypes";

interface PokerContextProviderProps {
  children?: React.ReactNode;
}

export interface PokerContextValues {
  pokerState: PokerState;
  broadcastAction: (event: PokerAction) => void;
  sendAction: (event: PokerAction, userId: string) => void;
  resetPokerState: () => void;
  handleShowPokerResults: () => void;
  handleSetUserStory: (payload: SetUserStoryAction["payload"]) => void;
  handleResetUserStory: () => void;
  handleSetPokerUnit: (payload: SetPokerUnitAction["payload"]) => void;
  handleSendVote: (payload: SendVoteAction["payload"]) => void;
  handleTransferModeratorRole: (payload: TransferModeratorRoleAction["payload"]) => void;
  handleKickUser: (userId: string) => void;
  handleJoinSession: (payload: JoinSessionAction["payload"]) => void;
  handleRejectJoinUser: (userId: string) => void;
  handleAcceptJoinUser: (userId: string) => void;
  handleAddToWaitingList: (payload: AddToWaitingListAction["payload"]) => void;
}

const initialState: PokerState = {
  story: {
    storyTitle: "User Story",
    storyUrl: "",
  },
  pokerUnit: {
    unitType: "fibonacci",
    unitRangeHigh: 34,
  },
  participants: {},
  showResults: false,
  waitingList: {},
  votes: {},
};

export const PokerContext = React.createContext<PokerContextValues>(undefined!);

export function PokerContextProvider(props: PokerContextProviderProps) {
  const [state, dispatch] = useReducer(pokerReducer, initialState);
  const { user } = useUserContext();
  const { setError } = useErrorContext();

  useSyncUser(state.participants);

  const { broadcastAction, sendAction, rejectJoinUser, acceptJoinUser } = usePeerToPeer<
    PokerState,
    PokerAction
  >({
    state,
    onDataReceived: dispatch,
    onUserDisconnected: handleUserDisconnect,
    onError: handleError,
    onRequestJoinRoom: handleAddToWaitingList,
    onJoinRoomRejected: handleJoinRoomReject,
    onJoinSession: handleJoinSession,
  });

  function dispatchAndBroadcast(action: PokerAction) {
    dispatch(action);
    broadcastAction(action);
  }

  function handleError(error: ErrorState) {
    setError(error);
  }

  function handleUserDisconnect(userId: string) {
    dispatch({ type: "DISCONNECT", payload: userId });
  }

  function handleAddToWaitingList(payload: AddToWaitingListAction["payload"]) {
    dispatch({ type: "ADD_TO_WAITING_LIST", payload });
  }

  function handleJoinRoomReject(userId: string) {
    if (userId === user.id) {
      setError({ type: "REJECTED" });
      return;
    }
    handleRemoveFromWaitingList({ userId });
  }

  function handleRemoveFromWaitingList(payload: RemoveFromWaitingListAction["payload"]) {
    dispatch({ type: "REMOVE_FROM_WAITING_LIST", payload });
  }

  function handleShowPokerResults() {
    dispatchAndBroadcast({ type: "SHOW_POKER_RESULTS" });
  }

  function handleSetUserStory(payload: SetUserStoryAction["payload"]) {
    dispatchAndBroadcast({ type: "SET_USER_STORY", payload });
  }

  function handleResetUserStory() {
    dispatchAndBroadcast({ type: "RESET_USER_STORY" });
  }

  function handleSetPokerUnit(payload: SetPokerUnitAction["payload"]) {
    dispatchAndBroadcast({ type: "SET_POKER_UNIT", payload });
  }

  function handleSendVote(payload: SendVoteAction["payload"]) {
    dispatchAndBroadcast({ type: "SEND_VOTE", payload });
  }

  function handleTransferModeratorRole(payload: TransferModeratorRoleAction["payload"]) {
    dispatchAndBroadcast({ type: "TRANSFER_MODERATOR_ROLE", payload });
  }

  function handleKickUser(userId: string) {
    sendAction({ type: "KICK" }, userId);
  }

  function handleJoinSession(payload: JoinSessionAction["payload"]) {
    dispatchAndBroadcast({ type: "JOIN_SESSION", payload });
  }

  const resetPokerState = useCallback(() => {
    dispatch({ type: "INITIALIZE_STATE", payload: initialState });
  }, []);

  const value: PokerContextValues = {
    pokerState: state,
    broadcastAction,
    sendAction,
    resetPokerState,
    handleShowPokerResults,
    handleSetUserStory,
    handleResetUserStory,
    handleSetPokerUnit,
    handleSendVote,
    handleTransferModeratorRole,
    handleKickUser,
    handleJoinSession,
    handleAddToWaitingList,
    handleRejectJoinUser: rejectJoinUser,
    handleAcceptJoinUser: acceptJoinUser,
  };

  return <PokerContext.Provider value={value}>{props.children}</PokerContext.Provider>;
}

export function usePokerContext() {
  return useContext(PokerContext);
}
