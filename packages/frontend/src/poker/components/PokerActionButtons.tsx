import React from "react";
import { useNavigate } from "react-router-dom";
import { useRoomIdFromPath } from "../../common/hooks/useRoomIdFromPath";
import { usePokerContext } from "../context/PokerContext";
import { FlexBox } from "../../common/components/FlexBox";
import { SetupSessionButton } from "../../common/components/buttons/SetupSessionButton";
import { SetStoryButton } from "./buttons/SetStoryButton";
import { ResetVotesButton } from "./buttons/ResetVotesButton";
import { PokerResultButton } from "./buttons/PokerResultButton";

export function PokerActionButtons() {
  const navigate = useNavigate();
  const roomId = useRoomIdFromPath();
  const { handleAddToWaitingList } = usePokerContext();

  function navigateToRoom() {
    navigate(`/poker/${roomId ?? ""}`);
  }
  return (
    <FlexBox flexDirection="row" p={1}>
      <SetupSessionButton
        roomId={roomId}
        navigateToRoom={navigateToRoom}
        onAddToWaitingList={handleAddToWaitingList}
      />
      <SetStoryButton />
      <ResetVotesButton />
      <PokerResultButton />
    </FlexBox>
  );
}
