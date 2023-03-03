import React from "react";
import { Grid, useTheme } from "@mui/material";
import SetupSessionButton from "../../common/components/SetupSessionButton";
import { useNavigate } from "react-router-dom";
import { useRoomIdFromPath } from "../../common/hooks/useRoomIdFromPath";
import CreateColumnButton from "./header/CreateColumnButton";
import { useRetroContext } from "../context/RetroContext";
import ToggleRetroBlurButton from "./header/ToggleRetroBlurButton";

export default function RetroActionButtons() {
  const theme = useTheme();
  const navigate = useNavigate();
  const roomId = useRoomIdFromPath();
  const { handleAddToWaitingList } = useRetroContext();

  function navigateToRoom() {
    navigate(`/retro/${roomId ?? ""}`);
  }

  return (
    <>
      <Grid item>
        <SetupSessionButton
          roomId={roomId}
          navigateToRoom={navigateToRoom}
          handleAddToWaitingList={handleAddToWaitingList}
        />
      </Grid>
      <Grid item>
        <CreateColumnButton />
      </Grid>
      <Grid item>
        <ToggleRetroBlurButton />
      </Grid>
    </>
  );
}
