import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserRole } from "../../common/types/commonTypes";
import { findModerator } from "../../common/utils/participantsUtils";
import { determineNewModerator } from "../../common/utils/determineNewModerator";

const participantsAdapter = createEntityAdapter<User>();
const waitingListAdapter = createEntityAdapter<User>();

const initialParticipantsState = participantsAdapter.getInitialState();
const initialWaitingListState = waitingListAdapter.getInitialState();
const initialState = {
  participants: initialParticipantsState,
  waitingList: initialWaitingListState,
};

const participantSlice = createSlice({
  name: "participants",
  initialState: initialState,
  reducers: {
    participantJoined(state, action: PayloadAction<{ name: string; id: string; role: UserRole }>) {
      const { name, id, role } = action.payload;
      waitingListAdapter.removeOne(state.waitingList, id);
      participantsAdapter.addOne(state.participants, { name, id, role });
    },
    moderatorRoleTransferred(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      const user = state.participants.entities[id];
      const currentModerator = findModerator(state.participants.entities);
      if (!user || !currentModerator) return state;
      participantsAdapter.updateOne(state.participants, { id: id, changes: { role: "moderator" } });
      participantsAdapter.updateOne(state.participants, {
        id: currentModerator.id,
        changes: { role: "participant" },
      });
    },
    addedToWaitingList(state, action) {
      const { userId, name } = action.payload;
      waitingListAdapter.addOne(state.waitingList, { id: userId, name: name, role: "participant" });
    },
    removedFromWaitingList(state, action: PayloadAction<{ userId: string }>) {
      waitingListAdapter.removeOne(state.waitingList, action.payload.userId);
    },
    userDisconnected(state, action: PayloadAction<{ id: string }>) {
      const disconnectedUserId = action.payload.id;
      const hasRemainingModerator = Object.values(state.participants.entities).some(
        ({ id, role }) => disconnectedUserId !== id && role === "moderator",
      );
      waitingListAdapter.removeOne(state.participants, disconnectedUserId);
      participantsAdapter.removeOne(state.participants, disconnectedUserId);
      if (!hasRemainingModerator) {
        determineNewModerator(Object.values(state.participants.entities));
      }
    },
  },
});

export const {
  participantJoined,
  moderatorRoleTransferred,
  addedToWaitingList,
  removedFromWaitingList,
} = participantSlice.actions;

export default participantSlice.reducer;
