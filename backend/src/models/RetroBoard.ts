import { RetroItem } from "./RetroItem";
import { RetroColumn } from "./RetroColumn";

export type RetroBoard = {
  boardId: string;
  title: string;
  format: string;
  items: { [name: string]: RetroItem };
  columns: { [name: string]: RetroColumn };
  columnOrder: string[];
  error: boolean;
  isBlurred: boolean;
  maxVoteCount: number;
  showContinueDiscussion: boolean;
  continueDiscussionVotes: {
    yes: number;
    no: number;
    abstain: number;
  };
};
