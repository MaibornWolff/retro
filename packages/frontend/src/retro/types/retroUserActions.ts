import { BaseAction, User } from "../../common/types/commonTypes";

export interface SetUserAction extends BaseAction {
  type: "SET_USER";
  payload: User;
}

export interface CardUpvoteAction extends BaseAction {
  type: "CARD_UPVOTE";
  payload: string;
}

export interface CardRemoveUpvoteAction extends BaseAction {
  type: "CARD_REMOVE_UPVOTE";
  payload: string;
}

export interface VoteResetAction extends BaseAction {
  type: "VOTE_RESET";
}

export interface DeleteCardAction extends BaseAction {
  type: "DELETE_CARD";
  payload: string;
}

export type RetroUserAction =
  | SetUserAction
  | CardUpvoteAction
  | CardRemoveUpvoteAction
  | DeleteCardAction
  | VoteResetAction;
