import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, useTheme } from "@mui/material";
import { useRetroContext } from "../context/RetroContext";
import ToggleThemeButton from "../../common/components/buttons/ToggleThemeButton";
import ShareSessionButton from "../../common/components/buttons/ShareSessionButton";
import ParticipantsButton from "../../common/components/buttons/ParticipantsButton";
import SettingsButton from "./buttons/SettingsButton";

export default function RetroHeader() {
  const {
    handleKickUser,
    handleAcceptJoinUser,
    handleRejectJoinUser,
    handleTransferModeratorRole,
    retroState,
  } = useRetroContext();
  const theme = useTheme();

  return (
    <div
      style={{
        flexGrow: 1,
      }}
    >
      <AppBar
        sx={{
          backgroundColor: theme.palette.secondary.main,
        }}
        position="static"
      >
        <Toolbar>
          <Typography
            variant="h4"
            color="inherit"
            sx={{
              flexGrow: 1,
              fontFamily: "Permanent Marker, cursive",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              Retro
            </Link>
          </Typography>
          <ToggleThemeButton />
          <ShareSessionButton />
          <ParticipantsButton
            participants={retroState.participants}
            waitingList={retroState.waitingList}
            handleKickUser={handleKickUser}
            onAcceptJoinUser={handleAcceptJoinUser}
            onRejectJoinUser={handleRejectJoinUser}
            onTransferModeratorRole={handleTransferModeratorRole}
          />
          <SettingsButton />
        </Toolbar>
      </AppBar>
    </div>
  );
}
