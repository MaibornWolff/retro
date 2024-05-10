import { TimerStatus } from "../types/retroTypes";
import { createSlice } from "@reduxjs/toolkit";

interface TimerInfo {
  timerStatus: TimerStatus;
  timerDuration: number;
}

const initialState: TimerInfo = {
  timerStatus: TimerStatus.STOPPED,
  timerDuration: 0,
};

const timerSlice = createSlice({
  name: "timer",
  initialState: initialState,
  reducers: {
    timerStarted(state, action) {
      state.timerDuration = action.payload.duration;
      state.timerStatus = TimerStatus.RUNNING;
    },
    timerStopped(state) {
      state.timerDuration = 0;
      state.timerStatus = TimerStatus.STOPPED;
    },
    timerPaused(state) {
      state.timerStatus = TimerStatus.PAUSED;
    },
    timerChanged(state, action) {
      state.timerDuration = action.payload.duration;
    },
  },
});

export const { timerStarted, timerStopped, timerPaused, timerChanged } = timerSlice.actions;

export default timerSlice.reducer;
