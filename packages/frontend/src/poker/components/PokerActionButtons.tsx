import React from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRoomIdFromPath } from "../../common/hooks/useRoomIdFromPath";
import { usePokerContext } from "../context/PokerContext";
import { SetupSessionButton } from "../../common/components/buttons/SetupSessionButton";
import { ResetVotesButton } from "./buttons/ResetVotesButton";
import { PokerResultButton } from "./buttons/PokerResultButton";
import { SetStoryButton } from "./buttons/SetStoryButton";
import { useUserContext } from "../../common/context/UserContext";

export function PokerActionButtons() {
  const navigate = useNavigate();
  const roomId = useRoomIdFromPath();
  const { user } = useUserContext();
  const { handleAddToWaitingList } = usePokerContext();

  const gridElementWidth = 1.2;

  function navigateToRoom() {
    navigate(`/poker/${roomId ?? ""}`);
  }
  return (
    <Grid container direction="row" alignItems="center" gap={2}>
      {!user.id && (
        <Grid item xs={gridElementWidth}>
          <SetupSessionButton
            roomId={roomId}
            navigateToRoom={navigateToRoom}
            onAddToWaitingList={handleAddToWaitingList}
          />
        </Grid>
      )}
      <Grid item>
        <SetStoryButton />
      </Grid>
      <Grid item>
        <ResetVotesButton />
      </Grid>
      <Grid item>
        <PokerResultButton />
      </Grid>
    </Grid>
  );
}
