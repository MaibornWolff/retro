import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, useTheme } from "@mui/material";

import { useUserContext } from "../context/UserContext";
import { ToggleThemeButton } from "./buttons/ToggleThemeButton";
import { ShareSessionButton } from "./buttons/ShareSessionButton";
import { ParticipantsButton } from "./buttons/ParticipantsButton";
import { UserByUserId } from "../../retro/types/retroTypes";
import { useNamespace } from "../hooks/useNamespace";
import { SettingsButton } from "./buttons/SettingsButton";

interface AppHeaderProps {
  participants: UserByUserId;
  waitingList: UserByUserId;
  onKickUser: (userId: string) => void;
  onRejectJoinUser: (userId: string) => void;
  onAcceptJoinUser: (userId: string) => void;
  onTransferModeratorRole: (userId: string) => void;
  settingElements: JSX.Element[];
}

export function AppHeader({
  participants,
  waitingList,
  onKickUser,
  onRejectJoinUser,
  onAcceptJoinUser,
  onTransferModeratorRole,
  settingElements,
}: AppHeaderProps) {
  const { user } = useUserContext();
  const theme = useTheme();
  const namespace = useNamespace();
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
              {namespace === "poker" ? "Planning Poker" : "Retro"}
            </Link>
          </Typography>
          <ToggleThemeButton />
          <ShareSessionButton isDisabled={!user.id} />
          <ParticipantsButton
            participants={participants}
            waitingList={waitingList}
            handleKickUser={onKickUser}
            onRejectJoinUser={onRejectJoinUser}
            onAcceptJoinUser={onAcceptJoinUser}
            onTransferModeratorRole={onTransferModeratorRole}
          />
          {settingElements.length > 0 && <SettingsButton settingElements={settingElements} />}
        </Toolbar>
      </AppBar>
    </div>
  );
}
