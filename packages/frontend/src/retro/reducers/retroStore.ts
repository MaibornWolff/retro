import { configureStore } from "@reduxjs/toolkit";
import retroCardSlice from "./retroCardSlice";
import participantSlice from "./participantSlice";
import timerSlice from "./timerSlice";
import votingSlice from "./votingSlice";
import retroTitleSlice from "./retroTitleSlice";

const retroStore = configureStore({
  reducer: {
    cards: retroCardSlice,
    participants: participantSlice,
    timer: timerSlice,
    voting: votingSlice,
    title: retroTitleSlice,
  },
});

export default retroStore;
