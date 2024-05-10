import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VotingInfo {
  isVotingEnabled: boolean;
  maxVotes: number;
  votesPerCard: number;
}

const initialState: VotingInfo = {
  isVotingEnabled: false,
  maxVotes: 0,
  votesPerCard: 1,
};

const votingSlice = createSlice({
  name: "votes",
  initialState: initialState,
  reducers: {
    maxVotesChanged(state, action: PayloadAction<{ maxVotes: number }>) {
      state.maxVotes = action.payload.maxVotes;
    },
    isVotingEnabledChanged(state, action: PayloadAction<{ isEnabled: boolean }>) {
      state.isVotingEnabled = action.payload.isEnabled;
    },
    votesPerCardChanged(state, action: PayloadAction<{ votesPerCard: number }>) {
      state.votesPerCard = action.payload.votesPerCard;
    },
  },
});

export const { maxVotesChanged, isVotingEnabledChanged, votesPerCardChanged } = votingSlice.actions;

export default votingSlice.reducer;
