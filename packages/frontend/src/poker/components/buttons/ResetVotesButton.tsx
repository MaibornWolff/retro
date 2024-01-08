import React from "react";
import { useUserContext } from "../../../common/context/UserContext";
import { usePokerContext } from "../../context/PokerContext";
import { isModerator } from "../../../common/utils/participantsUtils";
import { ResetVotesDialog } from "../dialogs/ResetVotesDialog";
import { useDialog } from "../../../common/hooks/useDialog";
import { ActionButton } from "../../../common/components/buttons/ActionButton";
import { RestartAlt } from "@mui/icons-material";

export function ResetVotesButton() {
  const { user } = useUserContext();
  const { isOpen, closeDialog, openDialog } = useDialog(false);
  const { pokerState } = usePokerContext();
  const noUserVoted = Object.keys(pokerState.votes).length === 0;

  if (!isModerator(user)) return null;

  return (
    <>
      <ActionButton onClick={openDialog} disabled={noUserVoted} icon={<RestartAlt />}>
        Reset Votes
      </ActionButton>
      <ResetVotesDialog isOpen={isOpen} close={closeDialog} />
    </>
  );
}
