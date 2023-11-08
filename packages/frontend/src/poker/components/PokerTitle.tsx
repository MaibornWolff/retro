import React from "react";
import { Link, Typography } from "@mui/material";
import { usePokerContext } from "../context/PokerContext";
import { FlexBox } from "../../common/components/FlexBox";
import { TooltipIconButton } from "../../common/components/buttons/TooltipIconButton";
import { Edit } from "@mui/icons-material";
import { SetStoryDialog } from "./dialogs/SetStoryDialog";
import { useDialog } from "../../common/hooks/useDialog";
import { useUserContext } from "../../common/context/UserContext";
import { isModerator } from "../../common/utils/participantsUtils";

export function PokerTitle() {
  const { isOpen, closeDialog, openDialog } = useDialog(false);
  const { storyTitle, storyUrl } = usePokerContext().pokerState.story;
  const { user } = useUserContext();

  return (
    <>
      <FlexBox justifyContent="center" alignItems="center" gap={1}>
        <Typography variant="h4" py={2}>
          {storyUrl ? (
            <Link href={storyUrl} target="_blank" rel="nofollow noreferrer">
              {storyTitle}
            </Link>
          ) : (
            storyTitle
          )}
        </Typography>
        {isModerator(user) && (
          <TooltipIconButton aria-label="Edit" onClick={openDialog} tooltipText="Edit">
            <Edit />
          </TooltipIconButton>
        )}
      </FlexBox>
      <SetStoryDialog isOpen={isOpen} close={closeDialog} />
    </>
  );
}
