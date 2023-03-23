import React from "react";
import { CardActions } from "@mui/material";
import { HowToVote } from "@mui/icons-material";

import { PokerVoteDialog } from "../dialogs/PokerVoteDialog";
import { PokerCard } from "./PokerCard";
import { User } from "../../../common/types/commonTypes";
import { useDialog } from "../../../retro/hooks/useDialog";
import { useUserContext } from "../../../common/context/UserContext";
import { TooltipIconButton } from "../../../common/TooltipIconButton";

interface PokerCardFrontProps {
  voted: boolean;
  pokerUser: User;
}

export function PokerCardFront({ voted, pokerUser }: PokerCardFrontProps) {
  const { isOpen, closeDialog, openDialog } = useDialog(false);
  const { user } = useUserContext();
  const iconColor = voted ? "black" : "white";

  return (
    <PokerCard
      voted={voted}
      pokerUser={pokerUser}
      FooterComponent={
        <>
          {pokerUser.id === user.id && (
            <CardActions sx={{ justifyContent: "center" }}>
              <TooltipIconButton
                aria-label="Vote"
                onClick={() => {
                  openDialog();
                }}
                tooltipText="Vote"
                sx={{ color: iconColor }}
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
