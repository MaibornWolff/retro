import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const retroTitleSlice = createSlice({
  name: "retroTitle",
  initialState: "",
  reducers: {
    titleChanged(state, action: PayloadAction<{ title: string }>) {
      state = action.payload.title;
    },
  },
});

export const { titleChanged } = retroTitleSlice.actions;

export default retroTitleSlice.reducer;
