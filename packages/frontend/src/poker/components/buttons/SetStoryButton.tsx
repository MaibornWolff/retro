import React from "react";
import { Button, useTheme } from "@mui/material";
import { useUserContext } from "../../../common/context/UserContext";
import { isModerator } from "../../../common/utils/participantsUtils";
import { SetStoryDialog } from "../dialogs/SetStoryDialog";
import { useDialog } from "../../../common/hooks/useDialog";

export function SetStoryButton() {
  const { isOpen, closeDialog, openDialog } = useDialog(false);
  const { user } = useUserContext();
  const theme = useTheme();

  if (!isModerator(user)) return null;

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        aria-label="Set User Story"
        sx={{ margin: theme.spacing(1) }}
        onClick={() => {
          openDialog();
        }}
      >
        Set User Story
      </Button>
      <SetStoryDialog isOpen={isOpen} close={closeDialog} />
    </>
  );
}
