import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, useTheme } from "@mui/material";

import ToggleThemeButton from "../../../common/components/ToggleThemeButton";
import ShareSessionButton from "../../../common/components/ShareSessionButton";
import CreateColumnButton from "./CreateColumnButton";
import SettingsButton from "./SettingsButton";
import ParticipantsButton from "../../../common/components/ParticipantsButton";
import { useRetroContext } from "../../context/RetroContext";

export default function RetroHeader() {
  const {
    retroState,
    handleKickUser,
    handleAcceptJoinUser,
    handleRejectJoinUser,
    handleTransferModeratorRole,
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
            state={retroState}
            handleKickUser={handleKickUser}
            handleAcceptJoinUser={handleAcceptJoinUser}
            handleRejectJoinUser={handleRejectJoinUser}
            handleTransferModeratorRole={handleTransferModeratorRole}
          />
          <CreateColumnButton />
          <SettingsButton />
        </Toolbar>
      </AppBar>
    </div>
  );
}
