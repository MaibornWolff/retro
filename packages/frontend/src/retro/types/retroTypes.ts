import { User } from "../../common/types/commonTypes";

export interface RetroCard {
  id: string;
  index: number;
  owners: User[];
  content: string;
  isDiscussed: boolean;
  votes: VotesByUserId;
}

export interface RetroColumn {
  id: string;
  index: number;
  columnTitle: string;
  cards: RetroCard[];
  isBlurred: boolean;
}

export enum TimerStatus {
  RUNNING,
  PAUSED,
  STOPPED,
}

export interface RetroState {
  title: string;
  format: string;
  columns: RetroColumn[];
  isBlurred: boolean;
  maxVoteCount: number;
  highlightedCardId?: string;
  participants: UserByUserId;
  waitingList: UserByUserId;
  isVotingEnabled: boolean;
  isMultipleVotesPerCardAllowed: boolean;
  timerStatus: TimerStatus;
  timerDuration: number;
}

export type VotesByUserId = Record<string, number>;

export type UserByUserId = Record<string, User>;
