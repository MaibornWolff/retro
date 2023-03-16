import React, { useCallback, useContext, useReducer } from "react";
import { usePeerToPeer } from "../../common/hooks/usePeerToPeer";
import { RetroState } from "../types/retroTypes";
import {
  CardRemoveUpvoteAction,
  CardUpvoteAction,
  ChangeRetroFormatAction,
  CreateCardAction,
  CreateColumnAction,
  DeleteCardAction,
  DeleteColumnAction,
  EditCardAction,
  EditColumnAction,
  HighlightCardAction,
  MaxVoteChangeAction,
  RetroAction,
  SetRetroStateAction,
  SortCardsByVotesDescendingAction,
  ToggleCardDiscussedAction,
  ToggleColumnBlurAction,
  UnhighlightCardAction,
} from "../types/retroActions";
import { retroReducer } from "../reducers/retroReducer";
import {
  AddToWaitingListAction,
  DisconnectAction,
  JoinSessionAction,
  RemoveFromWaitingListAction,
  TransferModeratorRoleAction,
} from "../../common/types/peerToPeerTypes";
import { useUserContext } from "../../common/context/UserContext";
import { useErrorContext } from "../../common/context/ErrorContext";
import { useSyncUser } from "../../common/hooks/useSyncUser";
import { ErrorState, User } from "../../common/types/commonTypes";

interface RetroContextProviderProps {
  children?: React.ReactNode;
}

const initialState: RetroState = {
  title: "",
  format: "",
  columns: [],
  isBlurred: false,
  maxVoteCount: 3,
  participants: {},
  waitingList: {},
  isAutoAllowActivated: true,
};

export interface RetroContextValues {
  retroState: RetroState;
  broadcastAction: (event: RetroAction) => void;
  sendAction: (event: RetroAction, userId: string) => void;
  resetRetroState: () => void;
  handleUpvoteCard: (payload: CardUpvoteAction["payload"]) => void;
  handleChangeMaxVote: (payload: MaxVoteChangeAction["payload"]) => void;
  handleResetVotes: () => void;
  handleRemoveUpvoteFromCard: (payload: CardRemoveUpvoteAction["payload"]) => void;
  handleSetRetroState: (payload: SetRetroStateAction["payload"]) => void;
  handleCreateCard: (payload: CreateCardAction["payload"]) => void;
  handleDeleteCard: (payload: DeleteCardAction["payload"]) => void;
  handleEditCard: (payload: EditCardAction["payload"]) => void;
  handleCreateColumn: (payload: CreateColumnAction["payload"]) => void;
  handleDeleteColumn: (payload: DeleteColumnAction["payload"]) => void;
  handleEditColumn: (payload: EditColumnAction["payload"]) => void;
  handleToggleColumnBlur: (payload: ToggleColumnBlurAction["payload"]) => void;
  handleToggleRetroBlur: () => void;
  handleToggleCardDiscussed: (payload: ToggleCardDiscussedAction["payload"]) => void;
  handleHighlightCard: (payload: HighlightCardAction["payload"]) => void;
  handleUnhighlightCard: (payload: UnhighlightCardAction["payload"]) => void;
  handleSortCardsByVotesDescending: (payload: SortCardsByVotesDescendingAction["payload"]) => void;
  handleChangeRetroFormat: (payload: ChangeRetroFormatAction["payload"]) => void;
  handleKickUser: (userId: string) => void;
  handleJoinSession: (payload: JoinSessionAction["payload"]) => void;
  handleTransferModeratorRole: (payload: TransferModeratorRoleAction["payload"]) => void;
  handleRejectJoinUser: (userId: string) => void;
  handleAcceptJoinUser: (userId: string) => void;
  handleAddToWaitingList: (payload: AddToWaitingListAction["payload"]) => void;
  handleJoinRoom: ({ user, roomId }: { user: User; roomId: string }) => void;
}

export const RetroContext = React.createContext<RetroContextValues>(undefined!);

export default function RetroContextProvider(props: RetroContextProviderProps) {
  const [state, dispatch] = useReducer(retroReducer, initialState);
  const { user } = useUserContext();
  const { setError } = useErrorContext();

  useSyncUser(state.participants);

  const { broadcastAction, sendAction, rejectJoinUser, acceptJoinUser, joinRoom } = usePeerToPeer<
    RetroState,
    RetroAction
  >({
    state,
    onDataReceived: dispatch,
    onUserDisconnected: handleUserDisconnect,
    onError: handleError,
    onRequestJoinRoom: handleAddToWaitingList,
    onJoinRoomRejected: handleJoinRoomReject,
    onJoinSession: handleJoinSession,
  });

  function dispatchAndBroadcast(action: RetroAction) {
    dispatch(action);
    broadcastAction(action);
  }

  function handleError(error: ErrorState) {
    setError(error);
  }

  function handleAddToWaitingList(payload: AddToWaitingListAction["payload"]) {
    dispatch({ type: "ADD_TO_WAITING_LIST", payload });
  }

  function handleRemoveFromWaitingList(payload: RemoveFromWaitingListAction["payload"]) {
    dispatch({ type: "REMOVE_FROM_WAITING_LIST", payload });
  }

  function handleJoinRoomReject(userId: string) {
    if (userId === user.id) {
      setError({ type: "REJECTED" });
      return;
    }
    handleRemoveFromWaitingList({ userId });
  }

  function handleUserDisconnect(payload: DisconnectAction["payload"]) {
    dispatch({ type: "DISCONNECT", payload });
  }

  function handleUpvoteCard(payload: CardUpvoteAction["payload"]) {
    dispatchAndBroadcast({ type: "CARD_UPVOTE", payload });
  }

  function handleChangeMaxVote(payload: MaxVoteChangeAction["payload"]) {
    dispatchAndBroadcast({ type: "MAX_VOTE_CHANGE", payload });
  }

  function handleResetVotes() {
    dispatchAndBroadcast({ type: "VOTE_RESET" });
  }

  function handleRemoveUpvoteFromCard(payload: CardRemoveUpvoteAction["payload"]) {
    dispatchAndBroadcast({ type: "CARD_REMOVE_UPVOTE", payload });
  }

  function handleSetRetroState(payload: SetRetroStateAction["payload"]) {
    dispatchAndBroadcast({ type: "SET_RETRO_STATE", payload });
  }

  function handleCreateCard(payload: CreateCardAction["payload"]) {
    dispatchAndBroadcast({ type: "CREATE_CARD", payload });
  }

  function handleDeleteCard(payload: DeleteCardAction["payload"]) {
    dispatchAndBroadcast({ type: "DELETE_CARD", payload });
  }

  function handleEditCard(payload: EditCardAction["payload"]) {
    dispatchAndBroadcast({ type: "EDIT_CARD", payload });
  }

  function handleCreateColumn(payload: CreateColumnAction["payload"]) {
    dispatchAndBroadcast({ type: "CREATE_COLUMN", payload });
  }

  function handleDeleteColumn(payload: DeleteColumnAction["payload"]) {
    dispatchAndBroadcast({ type: "DELETE_COLUMN", payload });
  }

  function handleEditColumn(payload: EditColumnAction["payload"]) {
    dispatchAndBroadcast({ type: "EDIT_COLUMN", payload });
  }

  function handleToggleColumnBlur(payload: ToggleColumnBlurAction["payload"]) {
    dispatchAndBroadcast({ type: "TOGGLE_COLUMN_BLUR", payload });
  }

  function handleToggleRetroBlur() {
    dispatchAndBroadcast({ type: "TOGGLE_RETRO_BLUR" });
  }

  function handleToggleCardDiscussed(payload: ToggleCardDiscussedAction["payload"]) {
    dispatchAndBroadcast({ type: "TOGGLE_CARD_DISCUSSED", payload });
  }

  function handleHighlightCard(payload: HighlightCardAction["payload"]) {
    dispatchAndBroadcast({ type: "HIGHLIGHT_CARD", payload });
  }

  function handleUnhighlightCard(payload: UnhighlightCardAction["payload"]) {
    dispatchAndBroadcast({ type: "UNHIGHLIGHT_CARD", payload });
  }

  function handleSortCardsByVotesDescending(payload: SortCardsByVotesDescendingAction["payload"]) {
    dispatchAndBroadcast({ type: "SORT_CARDS", payload });
  }

  function handleChangeRetroFormat(payload: ChangeRetroFormatAction["payload"]) {
    dispatchAndBroadcast({ type: "CHANGE_RETRO_FORMAT", payload });
  }

  function handleKickUser(userId: string) {
    sendAction({ type: "KICK" }, userId);
  }

  function handleJoinSession(payload: JoinSessionAction["payload"]) {
    dispatchAndBroadcast({ type: "JOIN_SESSION", payload });
  }

  function handleTransferModeratorRole(payload: TransferModeratorRoleAction["payload"]) {
    dispatchAndBroadcast({ type: "TRANSFER_MODERATOR_ROLE", payload });
  }

  const resetRetroState = useCallback(() => {
    dispatch({ type: "SET_RETRO_STATE", payload: initialState });
  }, []);

  const value: RetroContextValues = {
    retroState: state,
    broadcastAction,
    sendAction,
    resetRetroState,
    handleUpvoteCard,
    handleChangeMaxVote,
    handleResetVotes,
    handleRemoveUpvoteFromCard,
    handleSetRetroState,
    handleCreateCard,
    handleDeleteCard,
    handleEditCard,
    handleCreateColumn,
    handleDeleteColumn,
    handleEditColumn,
    handleHighlightCard,
    handleToggleCardDiscussed,
    handleToggleColumnBlur,
    handleToggleRetroBlur,
    handleUnhighlightCard,
    handleSortCardsByVotesDescending,
    handleChangeRetroFormat,
    handleKickUser,
    handleJoinSession,
    handleTransferModeratorRole,
    handleRejectJoinUser: rejectJoinUser,
    handleAcceptJoinUser: acceptJoinUser,
    handleAddToWaitingList,
    handleJoinRoom: joinRoom,
  };

  return <RetroContext.Provider value={value}>{props.children}</RetroContext.Provider>;
}

export function useRetroContext() {
  return useContext(RetroContext);
}
