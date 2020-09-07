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
  id: string;
  role: string;
  name: string;
  vote: number;
  voted: boolean;
};
