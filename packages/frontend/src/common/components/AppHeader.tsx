import React, { PropsWithChildren } from "react";
import { Header } from "./Header";
import { ShareSessionButton } from "./buttons/ShareSessionButton";
import { ParticipantsButton } from "./buttons/ParticipantsButton";
import { UserByUserId } from "../../retro/types/retroTypes";
import { SettingsButton } from "./buttons/SettingsButton";
import { useUserContext } from "../context/UserContext";

interface AppHeaderProps extends PropsWithChildren {
  participants: UserByUserId;
  waitingList: UserByUserId;
  onKickUser: (userId: string) => void;
  onRejectJoinUser: (userId: string) => void;
  onAcceptJoinUser: (userId: string) => void;
  onTransferModeratorRole: (userId: string) => void;
}

export function AppHeader({
  participants,
  waitingList,
  onKickUser,
  onRejectJoinUser,
  onAcceptJoinUser,
  onTransferModeratorRole,
  children,
}: AppHeaderProps) {
  const { user } = useUserContext();
  return (
    <Header>
      <ShareSessionButton isDisabled={!user.id} />
      <ParticipantsButton
        participants={participants}
        waitingList={waitingList}
        handleKickUser={onKickUser}
        onRejectJoinUser={onRejectJoinUser}
        onAcceptJoinUser={onAcceptJoinUser}
        onTransferModeratorRole={onTransferModeratorRole}
      />
      <SettingsButton>{children}</SettingsButton>
    </Header>
  );
}
