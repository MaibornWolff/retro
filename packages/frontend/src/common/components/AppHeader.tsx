import React, { ReactNode } from "react";
import { AppBar, Toolbar, Typography, useTheme } from "@mui/material";

import { useUserContext } from "../context/UserContext";
import { ToggleThemeButton } from "./buttons/ToggleThemeButton";
import { ShareSessionButton } from "./buttons/ShareSessionButton";
import { ParticipantsButton } from "./buttons/ParticipantsButton";
import { UserByUserId } from "../../retro/types/retroTypes";
import { useNamespace } from "../hooks/useNamespace";
import { SettingsButton } from "./buttons/SettingsButton";
import Link from "next/link";

interface AppHeaderProps {
  participants: UserByUserId;
  waitingList: UserByUserId;
  onKickUser: (userId: string) => void;
  onRejectJoinUser: (userId: string) => void;
  onAcceptJoinUser: (userId: string) => void;
  onPromoteToModerator: (userId: string) => void;
  children?: ReactNode;
}

export function AppHeader({
  participants,
  waitingList,
  onKickUser,
  onRejectJoinUser,
  onAcceptJoinUser,
  onPromoteToModerator,
  children,
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
          <Link href="/" style={{ textDecoration: "none", color: theme.palette.primary.main }}>
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
          onPromoteToModerator={onPromoteToModerator}
        />
        <SettingsButton>{children}</SettingsButton>
      </Toolbar>
    </AppBar>
  );
}
