import { BaseAction } from "../../common/types/commonTypes";
import { RetroCard, RetroColumn, RetroState } from "./retroTypes";
import { PeerToPeerAction } from "../../common/types/peerToPeerTypes";

export interface CardUpvoteAction extends BaseAction {
  type: "CARD_UPVOTE";
  payload: { columnIndex: number; cardIndex: number; userId: string };
}

export interface CardRemoveUpvoteAction extends BaseAction {
  type: "CARD_REMOVE_UPVOTE";
  payload: { columnIndex: number; cardIndex: number; userId: string };
}

export interface MaxVoteChangeAction extends BaseAction {
  type: "MAX_VOTE_CHANGE";
  payload: number;
}

export interface VoteResetAction extends BaseAction {
  type: "VOTE_RESET";
}

export interface SetRetroStateAction extends BaseAction {
  type: "SET_RETRO_STATE";
  payload: RetroState;
}

export interface HighlightCardAction extends BaseAction {
  type: "HIGHLIGHT_CARD";
  payload: { columnIndex: number; cardIndex: number };
}

export interface UnhighlightCardAction extends BaseAction {
  type: "UNHIGHLIGHT_CARD";
  payload: { columnIndex: number; cardIndex: number };
}

export interface CreateCardAction extends BaseAction {
  type: "CREATE_CARD";
  payload: { card: RetroCard; columnIndex: number };
}

export interface DeleteCardAction extends BaseAction {
  type: "DELETE_CARD";
  payload: { columnIndex: number; cardIndex: number };
}

export interface EditCardAction extends BaseAction {
  type: "EDIT_CARD";
  payload: { columnIndex: number; cardIndex: number; cardContent: string };
}

export interface CreateColumnAction extends BaseAction {
  type: "CREATE_COLUMN";
  payload: RetroColumn;
}

export interface DeleteColumnAction extends BaseAction {
  type: "DELETE_COLUMN";
  payload: number;
}

export interface EditColumnAction extends BaseAction {
  type: "EDIT_COLUMN";
  payload: { columnIndex: number; title: string };
}

export interface ToggleColumnBlurAction extends BaseAction {
  type: "TOGGLE_COLUMN_BLUR";
  payload: number;
}

export interface ToggleRetroBlurAction extends BaseAction {
  type: "TOGGLE_RETRO_BLUR";
}

export interface ToggleCardDiscussedAction extends BaseAction {
  type: "TOGGLE_CARD_DISCUSSED";
  payload: { columnIndex: number; cardIndex: number };
}

export interface SortCardsByVotesDescendingAction extends BaseAction {
  type: "SORT_CARDS";
  payload: number;
}

export interface ChangeRetroFormatAction extends BaseAction {
  type: "CHANGE_RETRO_FORMAT";
  payload: string;
}

export interface IsVotingEnabledChangedAction extends BaseAction {
  type: "IS_VOTING_ENABLED_CHANGED";
  isEnabled: boolean;
}
export interface CardVotingLimitChangedAction extends BaseAction {
  type: "CARD_VOTING_LIMIT_CHANGED";
  limit: number;
}

export interface StartTimerAction extends BaseAction {
  type: "START_TIMER";
  duration: number;
}

export interface PauseTimerAction extends BaseAction {
  type: "PAUSE_TIMER";
}

export interface StopTimerAction extends BaseAction {
  type: "STOP_TIMER";
}

export interface ChangeTimerAction extends BaseAction {
  type: "CHANGE_TIMER";
  duration: number;
}

export type RetroAction =
  | PeerToPeerAction<RetroState>
  | CardUpvoteAction
  | CardRemoveUpvoteAction
  | MaxVoteChangeAction
  | VoteResetAction
  | SetRetroStateAction
  | HighlightCardAction
  | UnhighlightCardAction
  | CreateCardAction
  | DeleteCardAction
  | EditCardAction
  | CreateColumnAction
  | EditColumnAction
  | DeleteColumnAction
  | ToggleColumnBlurAction
  | ToggleRetroBlurAction
  | ToggleCardDiscussedAction
  | ChangeRetroFormatAction
  | SortCardsByVotesDescendingAction
  | IsVotingEnabledChangedAction
  | CardVotingLimitChangedAction
  | StartTimerAction
  | PauseTimerAction
  | StopTimerAction
  | ChangeTimerAction;
