import { BaseAction, User } from "./commonTypes";

export interface InitializeStateAction<T> extends BaseAction {
  type: "INITIALIZE_STATE";
  payload: T;
}

export interface JoinSessionAction extends BaseAction {
  type: "JOIN_SESSION";
  payload: User;
}

export interface DisconnectAction extends BaseAction {
  type: "DISCONNECT";
  payload: string;
}

export interface KickAction extends BaseAction {
  type: "KICK";
}

export interface PromoteToModeratorAction extends BaseAction {
  type: "PROMOTE_TO_MODERATOR";
  payload: string;
}

export interface AddToWaitingListAction extends BaseAction {
  type: "ADD_TO_WAITING_LIST";
  payload: { userId: string; userName: string };
}

export interface RemoveFromWaitingListAction extends BaseAction {
  type: "REMOVE_FROM_WAITING_LIST";
  payload: { userId: string };
}

export type PeerToPeerAction<T> =
  | InitializeStateAction<T>
  | JoinSessionAction
  | DisconnectAction
  | KickAction
  | PromoteToModeratorAction
  | RemoveFromWaitingListAction
  | AddToWaitingListAction;
