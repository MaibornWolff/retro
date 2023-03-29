import React from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRoomIdFromPath } from "../../common/hooks/useRoomIdFromPath";
import { useRetroContext } from "../context/RetroContext";
import { useUserContext } from "../../common/context/UserContext";
import { SetupSessionButton } from "../../common/components/buttons/SetupSessionButton";
import { ToggleRetroBlurButton } from "./buttons/ToggleRetroBlurButton";
import { CreateColumnButton } from "./buttons/CreateColumnButton";

export function RetroActionButtons() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const roomId = useRoomIdFromPath();
  const { handleAddToWaitingList } = useRetroContext();

  function navigateToRoom() {
    navigate(`/retro/${roomId ?? ""}`);
  }

  return (
    <Grid container direction="row" alignItems="center" gap={2}>
      {!user.id && (
        <Grid item>
          <SetupSessionButton
            roomId={roomId}
            navigateToRoom={navigateToRoom}
            onAddToWaitingList={handleAddToWaitingList}
          />
        </Grid>
      )}
      <Grid item>
        <CreateColumnButton />
      </Grid>
      <Grid item>
        <ToggleRetroBlurButton />
      </Grid>
    </Grid>
  );
}
