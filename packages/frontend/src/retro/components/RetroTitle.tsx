import React from "react";
import { Typography } from "@mui/material";
import { useRetroContext } from "../context/RetroContext";
import { FlexBox } from "../../common/components/FlexBox";
import { isModerator } from "../../common/utils/participantsUtils";
import { TooltipIconButton } from "../../common/components/buttons/TooltipIconButton";
import { Edit } from "@mui/icons-material";
import { useDialog } from "../../common/hooks/useDialog";
import { useUserContext } from "../../common/context/UserContext";
import { SetRetroTitleDialog } from "./dialogs/SetRetroTitleDialog";

export function RetroTitle() {
  const { isOpen, closeDialog, openDialog } = useDialog(false);
  const { user } = useUserContext();
  const { retroState } = useRetroContext();

  return (
    <>
      <FlexBox justifyContent="center" alignItems="center" gap={1}>
        <Typography variant="h4">{retroState.title}</Typography>
        {isModerator(user) && (
          <TooltipIconButton aria-label="Edit" onClick={openDialog} tooltipText="Edit">
            <Edit />
          </TooltipIconButton>
        )}
      </FlexBox>
      <SetRetroTitleDialog isOpen={isOpen} close={closeDialog} />
    </>
  );
}
