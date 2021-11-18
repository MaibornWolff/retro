import { RetroItem } from "./RetroItem";
import { RetroColumn } from "./RetroColumn";
import { RetroComment } from "./RetroComment";

export type RetroBoard = {
  boardId: string;
  title: string;
  format: string;
  items: { [name: string]: RetroItem };
  columns: { [name: string]: RetroColumn };
  columnOrder: string[];
  comments: { [name: string]: RetroComment};
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
