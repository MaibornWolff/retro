import React from "react";
import { Grid, useTheme } from "@mui/material";
import PokerStoryButton from "./PokerStoryButton";
import PokerResultButton from "./PokerResultButton";
import PokerResetButton from "./PokerResetButton";
import SetupSessionButton from "../../common/components/SetupSessionButton";
import { useNavigate } from "react-router-dom";
import { useRoomIdFromPath } from "../../common/hooks/useRoomIdFromPath";
import { usePokerContext } from "../context/PokerContext";

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
      <Grid container direction="row" sx={{ height: "20px" }}>
        <SetupSessionButton
          roomId={roomId}
          navigateToRoom={navigateToRoom}
          handleAddToWaitingList={handleAddToWaitingList}
        />
        <PokerStoryButton />
        <PokerResetButton />
        <PokerResultButton />
      </Grid>
    </Grid>
  );
}
