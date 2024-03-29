import React, { Ref, PropsWithChildren } from "react";
import { Build } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useUserContext } from "../../../common/context/UserContext";
import { isModerator } from "../../../common/utils/participantsUtils";
import { EstimationUnitSetupDialog } from "../dialogs/EstimationUnitSetupDialog";
import { useDialog } from "../../../common/hooks/useDialog";

export const EstimationUnitSetupMenuItem = React.forwardRef(
  (_: PropsWithChildren, ref: Ref<HTMLLIElement>) => {
    const { user } = useUserContext();
    const { isOpen, closeDialog, openDialog } = useDialog(false);

    return (
      <>
        <MenuItem
          ref={ref}
          aria-label="Change Poker Unit"
          onClick={openDialog}
          disabled={!isModerator(user)}
        >
          <ListItemIcon>
            <Build fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Change Poker Unit" />
        </MenuItem>
        <EstimationUnitSetupDialog close={closeDialog} isOpen={isOpen} />
      </>
    );
  },
);
