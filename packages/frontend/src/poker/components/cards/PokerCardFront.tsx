import React from "react";
import { CardActions } from "@mui/material";
import { HowToVote } from "@mui/icons-material";

import PokerVoteDialog from "../dialogs/PokerVoteDialog";
import PokerCard from "./PokerCard";
import { User } from "../../../common/types/commonTypes";
import { useDialog } from "../../../retro/hooks/useDialog";
import { useUserContext } from "../../../common/context/UserContext";
import TooltipIconButton from "../../../common/TooltipIconButton";

interface PokerCardFrontProps {
  styleProps: { backgroundColor: string };
  pokerUser: User;
}

export default function PokerCardFront({ styleProps, pokerUser }: PokerCardFrontProps) {
  const { isOpen, closeDialog, openDialog } = useDialog(false);
  const { user } = useUserContext();

  return (
    <PokerCard
      styleProps={styleProps}
      pokerUser={pokerUser}
      FooterComponent={
        <>
          {pokerUser.id === user.id && (
            <CardActions sx={{ justifyContent: "center" }}>
              <TooltipIconButton
                color="secondary"
                aria-label="vote"
                onClick={() => {
                  openDialog();
                }}
                tooltipText="Vote"
              >
                <HowToVote />
              </TooltipIconButton>
            </CardActions>
          )}
        </>
      }
      DialogComponent={<PokerVoteDialog isOpen={isOpen} close={closeDialog} />}
    />
  );
}
