import React from "react";
import { Grid } from "@mui/material";
import SetupSessionButton from "../../common/components/SetupSessionButton";
import { useNavigate } from "react-router-dom";
import { useRoomIdFromPath } from "../../common/hooks/useRoomIdFromPath";
import CreateColumnButton from "./header/CreateColumnButton";
import { useRetroContext } from "../context/RetroContext";
import ToggleRetroBlurButton from "./header/ToggleRetroBlurButton";
import { useUserContext } from "../../common/context/UserContext";

export default function RetroActionButtons() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const roomId = useRoomIdFromPath();
  const { handleAddToWaitingList } = useRetroContext();

  function navigateToRoom() {
    navigate(`/retro/${roomId ?? ""}`);
  }

  const gridElementWidth = 1;

  return (
    <Grid container direction="row" alignItems="center" spacing={2} sx={{ width: "100%" }}>
      {!user.id && (
        <Grid item xs={gridElementWidth}>
          <SetupSessionButton
            roomId={roomId}
            navigateToRoom={navigateToRoom}
            handleAddToWaitingList={handleAddToWaitingList}
          />
        </Grid>
      )}
      <Grid item xs={gridElementWidth}>
        <ToggleRetroBlurButton />
      </Grid>
      <Grid item xs={gridElementWidth}>
        <CreateColumnButton />
      </Grid>
    </Grid>
  );
}
