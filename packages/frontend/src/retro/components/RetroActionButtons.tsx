import React from "react";
import { useRoomIdFromPath } from "../../common/hooks/useRoomIdFromPath";
import { useRetroContext } from "../context/RetroContext";
import { SetupSessionButton } from "../../common/components/buttons/SetupSessionButton";
import { ToggleRetroBlurButton } from "./buttons/ToggleRetroBlurButton";
import { CreateColumnButton } from "./buttons/CreateColumnButton";
import { FlexBox } from "../../common/components/FlexBox";
import { ToggleRetroVotingButton } from "./ToggleRetroVotingButton";
import { useRouter } from "next/navigation";

export function RetroActionButtons() {
  const { push } = useRouter();
  const roomId = useRoomIdFromPath();
  const { handleAddToWaitingList } = useRetroContext();

  function navigateToRoom() {
    push(`/retro/${roomId ?? ""}`);
  }

  return (
    <FlexBox flexDirection="row" p={1}>
      <SetupSessionButton
        roomId={roomId}
        navigateToRoom={navigateToRoom}
        onAddToWaitingList={handleAddToWaitingList}
      />
      <CreateColumnButton />
      <ToggleRetroBlurButton />
      <ToggleRetroVotingButton />
    </FlexBox>
  );
}
