import { User } from "../../common/types/commonTypes";
import { VotesByUserId } from "./retroTypes";

export interface RetroCardSchemaV1 {
  id: string;
  index: number;
  owners: User[];
  content: string;
  isDiscussed: boolean;
  votes: VotesByUserId;
}

export interface RetroColumnSchemaV1 {
  id: string;
  index: number;
  columnTitle: string;
  cards: RetroCardSchemaV1[];
  isBlurred: boolean;
}

export interface RetroSchemaV1 {
  version: string;
  title: string;
  format: string;
  columns: RetroColumnSchemaV1[];
  isBlurred: boolean;
  maxVoteCount: number;
  highlightedCardId?: string;
}
