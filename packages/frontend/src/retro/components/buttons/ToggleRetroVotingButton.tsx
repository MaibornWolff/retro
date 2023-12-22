import { ActionButton } from "../../../common/components/buttons/ActionButton";
import React from "react";
import { Stop, HowToVote } from "@mui/icons-material";
import { useRetroContext } from "../../context/RetroContext";
import { isModerator } from "../../../common/utils/participantsUtils";
import { useUserContext } from "../../../common/context/UserContext";
import { useDialog } from "../../../common/hooks/useDialog";
import { ManageVotesDialog } from "../dialogs/ManageVotesDialog";

export function ToggleRetroVotingButton() {
  const { retroState, handleIsVotingEnabledChanged } = useRetroContext();
  const { isOpen, closeDialog, openDialog } = useDialog();
  const { isVotingEnabled } = retroState;
  const { user } = useUserContext();

  function handleStartVoting() {
    if (!isModerator(user)) return;
    openDialog();
  }

  function handleStopVoting() {
    handleIsVotingEnabledChanged(false);
  }

  if (!isModerator(user)) return null;

  return (
    <>
      {isVotingEnabled ? (
        <ActionButton onClick={handleStopVoting} icon={<Stop />}>
          Stop Voting
        </ActionButton>
      ) : (
        <ActionButton onClick={handleStartVoting} icon={<HowToVote />}>
          Voting
        </ActionButton>
      )}
      <ManageVotesDialog isOpen={isOpen} close={closeDialog} />
    </>
  );
}
