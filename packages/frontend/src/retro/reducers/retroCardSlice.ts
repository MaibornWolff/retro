import { VotesByUserId } from "../types/retroTypes";
import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sumVotes } from "../utils/retroUtils";
import { retroFormatConfig } from "../config/formatConfig";
import { generateId } from "../../common/utils/generateId";

interface RetroCard {
  id: string;
  owners: string[];
  content: string;
  isDiscussed: boolean;
  votes: VotesByUserId;
}

interface RetroColumn {
  id: string;
  title: string;
  cards: string[];
  isBlurred: boolean;
}

interface HighlightedCard {
  id?: string;
}

const retroCardAdapter = createEntityAdapter<RetroCard>();
const retroColumnAdapter = createEntityAdapter<RetroColumn>();

const initialCardState = retroCardAdapter.getInitialState();
const initialColumnState = retroColumnAdapter.getInitialState();
const initialHighlightedCardState: HighlightedCard = { id: undefined };
const initialState = {
  cards: initialCardState,
  columns: initialColumnState,
  highlightedCard: initialHighlightedCardState,
};

const retroCardSlice = createSlice({
  name: "cardColumn",
  initialState: initialState,
  reducers: {
    cardCreated(state, action: PayloadAction<{ columnId: string; card: RetroCard }>) {
      const { columnId, card } = action.payload;
      retroCardAdapter.addOne(state.cards, card);

      const column = state.columns.entities[columnId];
      if (!column) return state;
      column.cards.push(columnId);
    },
    cardDeleted(state, action: PayloadAction<{ columnId: string; cardId: string }>) {
      const { columnId, cardId } = action.payload;
      retroCardAdapter.removeOne(state.cards, cardId);

      const column = state.columns.entities[columnId];
      if (!column) return state;
      column.cards = column.cards.filter(() => cardId !== action.payload.cardId);
    },
    cardEdited(state, action: PayloadAction<{ id: string; content: string }>) {
      const card = state.cards.entities[action.payload.id];
      if (!card) return state;
      retroCardAdapter.updateOne(state.cards, {
        id: card.id,
        changes: { content: action.payload.content },
      });
    },
    cardDiscussedToggled(state, action: PayloadAction<{ id: string }>) {
      const card = state.cards.entities[action.payload.id];
      if (!card) return state;
      retroCardAdapter.updateOne(state.cards, {
        id: card.id,
        changes: { isDiscussed: !card.isDiscussed },
      });
    },
    cardUpvoted(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      const card = state.cards.entities[id];
      if (!card) return state;
      const votes = { ...card.votes, [id]: (card.votes[id] ?? 0) + 1 };
      retroCardAdapter.updateOne(state.cards, { id: card.id, changes: { votes: votes } });
    },
    cardUpvoteRemoved(state, action) {
      const { id } = action.payload;
      const card = state.cards.entities[id];
      if (!card) return state;
      const votes = { ...card.votes, [id]: (card.votes[id] ?? 0) - 1 };
      retroCardAdapter.updateOne(state.cards, { id: card.id, changes: { votes: votes } });
    },
    votesReset(state) {
      Object.values(state.cards.entities).forEach((card) => {
        retroCardAdapter.updateOne(state.cards, { id: card.id, changes: { votes: {} } });
      });
    },
    columnCreated(state, action: PayloadAction<{ column: RetroColumn }>) {
      retroColumnAdapter.addOne(state.columns, action.payload.column);
    },
    columnDeleted(state, action: PayloadAction<{ id: string }>) {
      retroColumnAdapter.removeOne(state.columns, action.payload.id);
    },
    columnEdited(state, action: PayloadAction<{ id: string; title: string }>) {
      const column = state.columns.entities[action.payload.id];
      if (!column) return state;
      retroColumnAdapter.updateOne(state.columns, {
        id: column.id,
        changes: { title: action.payload.title },
      });
    },
    columnBlurToggled(state, action: PayloadAction<{ id: string }>) {
      const column = state.columns.entities[action.payload.id];
      if (!column) return state;
      retroColumnAdapter.updateOne(state.columns, {
        id: column.id,
        changes: { isBlurred: !column.isBlurred },
      });
    },
    cardsSorted(state, action: PayloadAction<{ columnId: string }>) {
      const { columnId } = action.payload;
      const column = state.columns.entities[columnId];
      if (!column) return state;
      const cards = Object.values(state.cards.entities).filter((card) =>
        column.cards.includes(card.id),
      );
      const sortedCards = cards.sort((a, b) => sumVotes(b.votes) - sumVotes(a.votes));
      state.columns.entities[columnId] = {
        ...column,
        cards: sortedCards.map((card) => card.id),
      };
    },
    retroBlurToggled(state) {
      Object.values(state.columns.entities).forEach((column: RetroColumn) => {
        retroColumnAdapter.updateOne(state.columns, {
          id: column.id,
          changes: { isBlurred: !column.isBlurred },
        });
      });
    },
    retroFormatChanged(state, action: PayloadAction<{ format: string }>) {
      const retroFormat = retroFormatConfig[action.payload.format];
      if (!retroFormat) return state;
      retroColumnAdapter.removeAll(state.columns);
      retroFormat.columnTitles.forEach((title) => {
        retroColumnAdapter.addOne(state.columns, {
          id: generateId(),
          title: title,
          cards: [],
          isBlurred: false,
        });
      });
    },
    cardHighlighted(state, action: PayloadAction<{ id: string }>) {
      state.highlightedCard.id = action.payload.id;
    },
    cardHighlightRemoved(state) {
      state.highlightedCard.id = undefined;
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
  votesReset,
  columnCreated,
  columnDeleted,
  columnEdited,
  columnBlurToggled,
  cardsSorted,
  retroBlurToggled,
  retroFormatChanged,
  cardHighlighted,
  cardHighlightRemoved,
} = retroCardSlice.actions;

export default retroCardSlice.reducer;
