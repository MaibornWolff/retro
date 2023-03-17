import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, useTheme } from "@mui/material";

import { useUserContext } from "../../common/context/UserContext";
import { usePokerContext } from "../context/PokerContext";
import { ToggleThemeButton } from "../../common/components/buttons/ToggleThemeButton";
import { ShareSessionButton } from "../../common/components/buttons/ShareSessionButton";
import { ParticipantsButton } from "../../common/components/buttons/ParticipantsButton";
import { PokerSettingsButton } from "./buttons/PokerSettingsButton";

export function PokerHeader() {
  const { user } = useUserContext();
  const theme = useTheme();
  const {
    pokerState,
    handleKickUser,
    handleAcceptJoinUser,
    handleRejectJoinUser,
    handleTransferModeratorRole,
  } = usePokerContext();

  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: theme.palette.secondary.main }} position="static">
        <Toolbar>
          <Typography
            variant="h4"
            color="inherit"
            sx={{ flexGrow: 1, fontFamily: "Permanent Marker, cursive" }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Planning Poker
            </Link>
          </Typography>
          <ToggleThemeButton />
          <ShareSessionButton isDisabled={!user.id} />
          <ParticipantsButton
            participants={pokerState.participants}
            waitingList={pokerState.waitingList}
            handleKickUser={handleKickUser}
            onRejectJoinUser={handleRejectJoinUser}
            onAcceptJoinUser={handleAcceptJoinUser}
            onTransferModeratorRole={handleTransferModeratorRole}
          />
          <PokerSettingsButton />
        </Toolbar>
      </AppBar>
    </div>
  );
}
