import React from "react";
import { CardActions, IconButton } from "@mui/material";
import { HowToVote } from "@mui/icons-material";

import PokerVoteDialog from "../dialogs/PokerVoteDialog";
import PokerCard from "./PokerCard";
import { UserRole } from "../../../common/types/commonTypes";
import { useDialog } from "../../../retro/hooks/useDialog";
import { useUserContext } from "../../../common/context/UserContext";

interface PokerCardFrontProps {
  styleProps: { backgroundColor: string };
  userName: string;
  userId: string;
  role: UserRole;
}

export default function PokerCardFront({
  styleProps,
  userId,
  userName,
  role,
}: PokerCardFrontProps) {
  const { isOpen, closeDialog, openDialog } = useDialog(false);
  const { user } = useUserContext();

  return (
    <PokerCard
      styleProps={styleProps}
      userName={userName}
      role={role}
      FooterComponent={
        <>
          {userId === user.id && (
            <CardActions sx={{ justifyContent: "center" }}>
              <IconButton
                color="secondary"
                aria-label="vote"
                onClick={() => {
                  openDialog();
                }}
              >
                <HowToVote />
              </IconButton>
            </CardActions>
          )}
        </>
      }
      DialogComponent={<PokerVoteDialog isOpen={isOpen} close={closeDialog} />}
    />
  );
}
