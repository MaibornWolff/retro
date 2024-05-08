import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RetroCard, RetroColumn } from "../types/retroTypes";
import { replace, replaceCardContent, replaceCardInColumn } from "../utils/retroUtils";

const retroColumnSlice = createSlice({
  name: "retroColumn",
  initialState: [] as RetroColumn[],
  reducers: {
    columnCreated(state, action: PayloadAction<RetroColumn>) {
      state = [...state, action.payload];
    },
    columnDeleted(state, action: PayloadAction<{ columnId: string }>) {
      state = state.filter((column) => column.id === action.payload.columnId);
    },
    columnEdited(state, action: PayloadAction<{ index: number; title: string }>) {
      const column = state[action.payload.index];
      if (!column) return state;
      const updatedColumn: RetroColumn = {
        ...column,
        columnTitle: action.payload.title,
      };
      state = replace(state, action.payload.index, updatedColumn);
    },
    columnBlurToggled(state, action: PayloadAction<{ columnIndex: number }>) {
      const column = state[action.payload.columnIndex];
      if (!column) return state;
      state = replace(state, action.payload.columnIndex, {
        ...column,
        isBlurred: !column.isBlurred,
      });
    },
    cardCreated(state, action: PayloadAction<{ columnId: string; card: RetroCard }>) {
      const { columnId, card } = action.payload;
      const column = state.find((column) => column.id === columnId);
      if (!column) return state;
      column.cards.push(card);
    },
    cardDeleted(state, action: PayloadAction<{ columnId: string; cardId: string }>) {
      const { columnId, cardId } = action.payload;
      const column = state.find((column) => column.id === columnId);
      if (!column) return state;
      column.cards = column.cards.filter((card) => card.id !== cardId);
    },
    cardEdited(
      state,
      action: PayloadAction<{ columnIndex: number; cardIndex: number; content: string }>,
    ) {
      state = replaceCardContent(
        state,
        action.payload.cardIndex,
        action.payload.columnIndex,
        action.payload.content,
      );
    },
    cardDiscussedToggled(state, action) {
      const column = state[action.payload.columnIndex];
      const card = column?.cards[action.payload.cardIndex];
      if (!card) return state;
      state = replaceCardInColumn(state, action.payload.cardIndex, action.payload.columnIndex, {
        ...card,
        isDiscussed: !card.isDiscussed,
      });
    },
    cardUpvoted(state, action) {
      const { columnIndex, cardIndex, userId } = action.payload;
      const column = state[columnIndex];
      const card = column?.cards[cardIndex];
      if (!card) return state;
      const votes = { ...card.votes, [userId]: (card.votes[userId] ?? 0) + 1 };
      const updatedCard = { ...card, votes };
      state = replaceCardInColumn(state, cardIndex, columnIndex, updatedCard);
    },
    cardUpvoteRemoved(state, action) {
      const { columnIndex, cardIndex, userId } = action.payload;
      const column = state[columnIndex];
      const card = column?.cards[cardIndex];
      if (!card) return state;
      const votes = { ...card.votes, [userId]: (card.votes[userId] ?? 0) - 1 };
      const updatedCard = { ...card, votes };
      state = replaceCardInColumn(state, cardIndex, columnIndex, updatedCard);
    },
    votesReset(state) {
      state = state.map((column) => {
        const cards = column.cards.map((card) => {
          return { ...card, votes: {} };
        });
        return { ...column, cards };
      });
    },
  },
});
