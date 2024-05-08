import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RetroCard } from "../types/retroTypes";

interface RetroColumn {
  id: string;
  title: string;
  cards: string[];
  isBlurred: boolean;
}

const retroColumnAdapter = createEntityAdapter<RetroColumn>();
const initialState = retroColumnAdapter.getInitialState();

const retroColumnSlice = createSlice({
  name: "retroColumn",
  initialState: initialState,
  reducers: {
    columnCreated: retroColumnAdapter.addOne,
    columnDeleted: retroColumnAdapter.removeOne,
    columnEdited(state, action: PayloadAction<{ id: string; title: string }>) {
      const column = state.entities[action.payload.id];
      if (!column) return state;
      retroColumnAdapter.upsertOne(state, { ...column, title: action.payload.title });
    },
    columnBlurToggled(state, action: PayloadAction<{ id: string }>) {
      const column = state.entities[action.payload.id];
      if (!column) return state;
      retroColumnAdapter.upsertOne(state, { ...column, isBlurred: !column.isBlurred });
    },
    cardCreated(state, action: PayloadAction<{ id: string; card: RetroCard }>) {
      const column = state.entities[action.payload.id];
      if (!column) return state;
      column.cards.push(action.payload.id);
    },
    cardDeleted(state, action: PayloadAction<{ columnId: string; cardId: string }>) {
      const column = state.entities[action.payload.columnId];
      if (!column) return state;
      column.cards = column.cards.filter((id) => id !== action.payload.cardId);
    },
  },
});

export const {
  columnCreated,
  columnDeleted,
  columnEdited,
  columnBlurToggled,
  cardCreated,
  cardDeleted,
} = retroColumnSlice.actions;

export default retroColumnSlice.reducer;
