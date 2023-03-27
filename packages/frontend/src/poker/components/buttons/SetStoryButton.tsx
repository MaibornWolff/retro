import React from "react";
import { useUserContext } from "../../../common/context/UserContext";
import { isModerator } from "../../../common/utils/participantsUtils";
import { SetStoryDialog } from "../dialogs/SetStoryDialog";
import { useDialog } from "../../../common/hooks/useDialog";
import { ActionButton } from "../../../common/components/buttons/ActionButton";
import { Article } from "@mui/icons-material";

export function SetStoryButton() {
  const { isOpen, closeDialog, openDialog } = useDialog(false);
  const { user } = useUserContext();

  if (!isModerator(user)) return null;

  return (
    <>
      <ActionButton
        aria-label="Set user story"
        onClick={openDialog}
        label="Set user story"
        icon={<Article />}
      />
      <SetStoryDialog isOpen={isOpen} close={closeDialog} />
    </>
  );
}
