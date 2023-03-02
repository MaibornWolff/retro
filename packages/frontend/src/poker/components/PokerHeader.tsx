import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, useTheme } from "@mui/material";

import ToggleThemeButton from "../../common/components/ToggleThemeButton";
import ShareSessionButton from "../../common/components/ShareSessionButton";
import PokerSettingsButton from "./PokerSettingsButton";
import { useUserContext } from "../../common/context/UserContext";
import ParticipantsButton from "../../common/components/ParticipantsButton";
import { usePokerContext } from "../context/PokerContext";

export default function PokerHeader() {
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
            handleRejectJoinUser={handleRejectJoinUser}
            handleAcceptJoinUser={handleAcceptJoinUser}
            handleTransferModeratorRole={handleTransferModeratorRole}
          />
          <PokerSettingsButton />
        </Toolbar>
      </AppBar>
    </div>
  );
}
