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
import { useHover } from "../../common/hooks/useHover";

export function RetroTitle() {
  const { isHovered, handleHover, handleUnhover } = useHover();
  const { isOpen, closeDialog, openDialog } = useDialog(false);
  const { user } = useUserContext();
  const { retroState } = useRetroContext();

  const showEditButton = isModerator(user) && isHovered;

  return (
    <>
      <FlexBox
        justifyContent="center"
        alignItems="center"
        gap={1}
        onMouseEnter={handleHover}
        onMouseLeave={handleUnhover}
      >
        <Typography variant="h4">{retroState.title}</Typography>
        {showEditButton && (
          <TooltipIconButton aria-label="Edit" onClick={openDialog} tooltipText="Edit">
            <Edit />
          </TooltipIconButton>
        )}
      </FlexBox>
      <SetRetroTitleDialog isOpen={isOpen} close={closeDialog} />
    </>
  );
}
