import React from "react";
import { ThumbUp } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";

import { isModerator } from "../../../common/utils/participantsUtils";
import { useDialog } from "../../../common/hooks/useDialog";
import { useUserContext } from "../../../common/context/UserContext";
import { ManageVotesDialog } from "../dialogs/ManageVotesDialog";

export function ManageVotesMenuItem() {
  const { user } = useUserContext();
  const { isOpen, closeDialog, openDialog } = useDialog();

  return (
    <>
      <MenuItem aria-label="Set Vote Count" onClick={openDialog} disabled={!isModerator(user)}>
        <ListItemIcon>
          <ThumbUp fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Manage Votes" />
      </MenuItem>
      <ManageVotesDialog isOpen={isOpen} close={closeDialog} />
    </>
  );
}
