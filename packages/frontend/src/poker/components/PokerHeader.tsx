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

  const isDarkMode = theme.palette.mode === "dark";
  const secondaryColor = theme.palette.secondary.main;
  const headerGradientDark = `linear-gradient(19deg, ${secondaryColor} 0%, #302879 100%)`;
  const headerGradientLight = `linear-gradient(19deg, #E1E1DD 0%, #F9FBFF 100%)`;
  const headerGradient = isDarkMode ? headerGradientDark : headerGradientLight;

  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundImage: headerGradient }} position="static">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, fontFamily: "Permanent Marker, cursive" }}>
            <Link to="/" style={{ textDecoration: "none", color: theme.palette.primary.main }}>
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
