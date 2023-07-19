import React from "react";
import { useNavigate } from "react-router-dom";
import { useRoomIdFromPath } from "../../common/hooks/useRoomIdFromPath";
import { useRetroContext } from "../context/RetroContext";
import { SetupSessionButton } from "../../common/components/buttons/SetupSessionButton";
import { ToggleRetroBlurButton } from "./buttons/ToggleRetroBlurButton";
import { CreateColumnButton } from "./buttons/CreateColumnButton";
import { FlexBox } from "../../common/components/FlexBox";
import { ToggleRetroVotingButton } from "./ToggleRetroVotingButton";

export function RetroActionButtons() {
  const navigate = useNavigate();
  const roomId = useRoomIdFromPath();
  const { handleAddToWaitingList, retroState } = useRetroContext();

  function navigateToRoom() {
    navigate(`/retro/${roomId ?? ""}`);
  }

  return (
    <FlexBox flexDirection="row" p={1}>
      <SetupSessionButton
        roomId={roomId}
        navigateToRoom={navigateToRoom}
        onAddToWaitingList={handleAddToWaitingList}
        isAutoAcceptEnabled={retroState.isAutoAcceptEnabled}
      />
      <CreateColumnButton />
      <ToggleRetroBlurButton />
      <ToggleRetroVotingButton />
    </FlexBox>
  );
}
