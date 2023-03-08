import React from "react";
import { Grid, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRoomIdFromPath } from "../../common/hooks/useRoomIdFromPath";
import { usePokerContext } from "../context/PokerContext";
import SetupSessionButton from "../../common/components/buttons/SetupSessionButton";
import PokerStoryButton from "./buttons/PokerStoryButton";
import PokerResetButton from "./buttons/PokerResetButton";
import PokerResultButton from "./buttons/PokerResultButton";

export default function PokerActionButtons() {
  const theme = useTheme();
  const navigate = useNavigate();
  const roomId = useRoomIdFromPath();
  const { handleAddToWaitingList } = usePokerContext();

  function navigateToRoom() {
    navigate(`/poker/${roomId ?? ""}`);
  }

  return (
    <Grid item xs={12} sx={{ margin: theme.spacing(1) }}>
      <Grid container direction="row">
        <Grid item>
          <SetupSessionButton
            roomId={roomId}
            navigateToRoom={navigateToRoom}
            onAddToWaitingList={handleAddToWaitingList}
          />
        </Grid>
        <Grid item>
          <PokerStoryButton />
        </Grid>
        <Grid item>
          <PokerResetButton />
        </Grid>
        <Grid item>
          <PokerResultButton />
        </Grid>
      </Grid>
    </Grid>
  );
}
