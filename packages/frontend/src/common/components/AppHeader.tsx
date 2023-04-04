import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, useTheme } from "@mui/material";

import { useUserContext } from "../context/UserContext";
import { ToggleThemeButton } from "./buttons/ToggleThemeButton";
import { ShareSessionButton } from "./buttons/ShareSessionButton";
import { ParticipantsButton } from "./buttons/ParticipantsButton";
import { useNamespace } from "../hooks/useNamespace";
import { SettingsButton } from "./buttons/SettingsButton";
import { UserByUserId } from "../types/commonTypes";

interface AppHeaderProps {
  participants: UserByUserId;
  waitingList: UserByUserId;
  isAutoAcceptEnabled: boolean;
  onKickUser: (userId: string) => void;
  onRejectJoinUser: (userId: string) => void;
  onAcceptJoinUser: (userId: string) => void;
  onTransferModeratorRole: (userId: string) => void;
  children?: ReactNode;
  onIsAutoAcceptEnabledChanged: (isEnabled: boolean) => void;
}

export function AppHeader({
  participants,
  waitingList,
  isAutoAcceptEnabled,
  onKickUser,
  onRejectJoinUser,
  onAcceptJoinUser,
  onTransferModeratorRole,
  children,
  onIsAutoAcceptEnabledChanged,
}: AppHeaderProps) {
  const { user } = useUserContext();
  const theme = useTheme();
  const namespace = useNamespace();

  return (
    <AppBar
      position="static"
      enableColorOnDark={true}
      sx={{ backgroundColor: theme.palette.background.paper }}
    >
      <Toolbar>
        <Typography
          variant="h4"
          flexGrow={1}
          fontFamily="Permanent"
          sx={{ fontFamily: "Permanent Marker, cursive" }}
        >
          <Link to="/" style={{ textDecoration: "none", color: theme.palette.primary.main }}>
            {namespace === "poker" ? "Planning Poker" : "Retro"}
          </Link>
        </Typography>
        <ToggleThemeButton />
        <ShareSessionButton isDisabled={!user.id} />
        <ParticipantsButton
          participants={participants}
          waitingList={waitingList}
          isAutoAcceptEnabled={isAutoAcceptEnabled}
          handleKickUser={onKickUser}
          onRejectJoinUser={onRejectJoinUser}
          onAcceptJoinUser={onAcceptJoinUser}
          onTransferModeratorRole={onTransferModeratorRole}
          onIsAutoAcceptEnabledChanged={onIsAutoAcceptEnabledChanged}
        />
        <SettingsButton>{children}</SettingsButton>
      </Toolbar>
    </AppBar>
  );
}
