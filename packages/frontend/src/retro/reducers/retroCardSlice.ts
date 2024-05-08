import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VotesByUserId } from "../types/retroTypes";

interface RetroCard {
  id: string;
  owners: string[];
  content: string;
  isDiscussed: boolean;
  votes: VotesByUserId;
}

const retroCardAdapter = createEntityAdapter<RetroCard>();
const initialState = retroCardAdapter.getInitialState();

const retroCardSlice = createSlice({
  name: "retroCard",
  initialState: initialState,
  reducers: {
    cardCreated: retroCardAdapter.addOne,
    cardDeleted: retroCardAdapter.removeOne,
    cardEdited(state, action: PayloadAction<{ id: string; content: string }>) {
      const card = state.entities[action.payload.id];
      if (!card) return state;
      retroCardAdapter.upsertOne(state, { ...card, content: action.payload.content });
    },
    cardDiscussedToggled(state, action: PayloadAction<{ id: string }>) {
      const card = state.entities[action.payload.id];
      if (!card) return state;
      retroCardAdapter.upsertOne(state, { ...card, isDiscussed: !card.isDiscussed });
    },
    cardUpvoted(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      const card = state.entities[id];
      if (!card) return state;
      const votes = { ...card.votes, [id]: (card.votes[id] ?? 0) + 1 };
      retroCardAdapter.upsertOne(state, { ...card, votes: votes });
    },
    cardUpvoteRemoved(state, action) {
      const { id } = action.payload;
      const card = state.entities[id];
      if (!card) return state;
      const votes = { ...card.votes, [id]: (card.votes[id] ?? 0) - 1 };
      retroCardAdapter.upsertOne(state, { ...card, votes: votes });
    },
    votesReset(state) {
      Object.values(state.entities).forEach((card) => {
        retroCardAdapter.upsertOne(state, { ...card, votes: {} });
      });
    },
  },
});

export const {
  cardCreated,
  cardDeleted,
  cardEdited,
  cardUpvoted,
  cardUpvoteRemoved,
  cardDiscussedToggled,
} = retroCardSlice.actions;

export default retroCardSlice.reducer;
