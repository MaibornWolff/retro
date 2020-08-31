export type PokerState = {
  pokerId: string;
  story: string;
  participants: PokerParticipant[];
};

export type PokerParticipant = {
  name: string;
  vote: number;
  voted: boolean;
};
