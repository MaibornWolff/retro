import React from "react";
import { useRoomIdFromPath } from "../../common/hooks/useRoomIdFromPath";
import { usePokerContext } from "../context/PokerContext";
import { FlexBox } from "../../common/components/FlexBox";
import { SetupSessionButton } from "../../common/components/buttons/SetupSessionButton";
import { SetStoryButton } from "./buttons/SetStoryButton";
import { ResetVotesButton } from "./buttons/ResetVotesButton";
import { PokerResultButton } from "./buttons/PokerResultButton";
import { useRouter } from "next/navigation";

export function PokerActionButtons() {
  const { push } = useRouter();
  const roomId = useRoomIdFromPath();
  const { handleAddToWaitingList } = usePokerContext();

  function navigateToRoom() {
    push(`/poker/${roomId ?? ""}`);
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
