import { PokerStory, PokerUnit } from "./pokerTypes";
import { BaseAction, User } from "../../common/types/commonTypes";
import { PeerToPeerAction } from "../../common/types/peerToPeerTypes";
import { PokerState } from "../pokerSlice";

export interface ShowPokerResultsAction extends BaseAction {
  type: "SHOW_POKER_RESULTS";
}

export interface SetUserStoryAction extends BaseAction {
  type: "SET_USER_STORY";
  payload: PokerStory;
}

export interface ResetUserStoryAction extends BaseAction {
  type: "RESET_USER_STORY";
}

export interface SetPokerUnitAction extends BaseAction {
  type: "SET_POKER_UNIT";
  payload: PokerUnit;
}

export interface SendVoteAction extends BaseAction {
  type: "SEND_VOTE";
  payload: { userId: string; vote: number };
}

export interface SetUserAction extends BaseAction {
  type: "SET_USER";
  payload: User;
}

export type PokerAction =
  | PeerToPeerAction<PokerState>
  | ShowPokerResultsAction
  | SetUserStoryAction
  | ResetUserStoryAction
  | SetPokerUnitAction
  | SendVoteAction
  | SetUserAction;
