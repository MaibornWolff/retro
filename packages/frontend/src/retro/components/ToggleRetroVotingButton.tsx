import { ActionButton } from "../../common/components/buttons/ActionButton";
import React from "react";
import { PlayArrow, Stop } from "@mui/icons-material";
import { useRetroContext } from "../context/RetroContext";
import { isModerator } from "../../common/utils/participantsUtils";
import { useUserContext } from "../../common/context/UserContext";

export function ToggleRetroVotingButton() {
  const { retroState, handleIsVotingEnabledChanged } = useRetroContext();
  const { isVotingEnabled } = retroState;
  const { user } = useUserContext();

  const buttonText = isVotingEnabled ? "Stop Voting" : "Start Voting";
  const buttonIcon = isVotingEnabled ? <Stop /> : <PlayArrow />;

  function toggleIsVotingEnabled() {
    if (!isModerator(user)) return;
    handleIsVotingEnabledChanged(!isVotingEnabled);
  }

  if (!isModerator(user)) return null;

  return <ActionButton onClick={toggleIsVotingEnabled} label={buttonText} icon={buttonIcon} />;
}
