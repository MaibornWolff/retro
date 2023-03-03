import React from "react";
import { Grid, useTheme } from "@mui/material";
import SetupSessionButton from "../../common/components/SetupSessionButton";
import { useNavigate } from "react-router-dom";
import { useRoomIdFromPath } from "../../common/hooks/useRoomIdFromPath";
import CreateColumnButton from "./header/CreateColumnButton";
import { useRetroContext } from "../context/RetroContext";
import ToggleRetroBlurButton from "./header/ToggleRetroBlurButton";

export default function RetroActionButtons() {
  const navigate = useNavigate();
  const roomId = useRoomIdFromPath();
  const { handleAddToWaitingList } = useRetroContext();

  function navigateToRoom() {
    navigate(`/retro/${roomId ?? ""}`);
  }

  return (
    <Grid container direction="row" alignItems="center" spacing={2}>
      <Grid item>
        <SetupSessionButton
          roomId={roomId}
          navigateToRoom={navigateToRoom}
          handleAddToWaitingList={handleAddToWaitingList}
        />
      </Grid>
      <Grid item>
        <ToggleRetroBlurButton />
      </Grid>
      <Grid item>
        <CreateColumnButton />
      </Grid>
    </Grid>
  );
}
