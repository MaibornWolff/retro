import React from "react";
import { CardActions, useTheme } from "@mui/material";
import { HowToVote } from "@mui/icons-material";

import { PokerVoteDialog } from "../dialogs/PokerVoteDialog";
import { PokerCard } from "./PokerCard";
import { User } from "../../../common/types/commonTypes";
import { useUserContext } from "../../../common/context/UserContext";
import { useDialog } from "../../../common/hooks/useDialog";
import { TooltipIconButton } from "../../../common/components/buttons/TooltipIconButton";

interface PokerCardFrontProps {
  voted: boolean;
  pokerUser: User;
}

export function PokerCardFront({ voted, pokerUser }: PokerCardFrontProps) {
  const theme = useTheme();
  const { isOpen, closeDialog, openDialog } = useDialog(false);
  const { user } = useUserContext();
  const iconColor = voted || theme.palette.mode === "light" ? "black" : "white";

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
