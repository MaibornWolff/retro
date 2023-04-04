import { ApplicationState, User } from "../../common/types/commonTypes";

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

export interface RetroState extends ApplicationState {
  title: string;
  format: string;
  columns: RetroColumn[];
  isBlurred: boolean;
  maxVoteCount: number;
  highlightedCardId?: string;
  isVotingEnabled: boolean;
}

export type VotesByUserId = Record<string, number>;
