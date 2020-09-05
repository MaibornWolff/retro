export type PokerState = {
  pokerId: string;
  story: PokerStory;
  participants: PokerParticipant[];
};

export type PokerStory = {
  storyTitle: string;
  storyUrl?: string;
};

export type PokerParticipant = {
  name: string;
  vote: number;
  voted: boolean;
};
