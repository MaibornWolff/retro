export interface RetroCard {
  id: string;
  author: string;
  commentIds: string[];
  content: string;
  points: number;
  isBlurred: boolean;
  isDiscussed: boolean;
  isExpanded: boolean;
}

export interface RetroComment {
  id: string;
  author: string;
  content: string;
}

export interface RetroComment {
  id: string;
  author: string;
  content: string;
}

export interface RetroCommentMap {
  [cardId: string]: RetroComment[];
}

export interface RetroColumn {
  id: string;
  columnTitle: string;
  itemIds: string[];
  isBlurred: boolean;
}

export interface RetroBoard {
  boardId: string;
  title: string;
  format: string;
  items: {
    [key: string]: RetroCard;
  };
  columns: {
    [key: string]: RetroColumn;
  };
  comments: {
    [key: string]: RetroComment;
  };
  columnOrder: string[];
  error: boolean;
  isBlurred: boolean;
  isReactionOn: boolean;
  maxVoteCount: number;
  showContinueDiscussion: boolean;
  continueDiscussionVotes: {
    yes: number;
    no: number;
    abstain: number;
  };
}

export interface Poker {
  pokerId: string;
  story: PokerStory;
  pokerUnit: PokerUnit;
  error: boolean;
  participants: PokerUser[];
  chartData: PokerChartData;
}

export interface PokerChartData {
  data: ChartData[];
}

export interface ChartData {
  name: string;
  value: number;
}

interface PokerUnit {
  unitType: string;
  unitRangeHigh: number;
}

interface PokerUser {
  id: string;
  role: string;
  name: string;
  vote: number;
  voted: false;
}

interface PokerStory {
  storyTitle: string;
  storyUrl?: string;
}

export type DarkTheme = "dark";

export type LightTheme = "light";
