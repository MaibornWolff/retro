import React, { useEffect, useState } from "react";

import { PokerTitle } from "./PokerTitle";
import { PokerUsers } from "./PokerUsers";
import { PokerStats } from "./PokerStats";
import { useErrorContext } from "../../common/context/ErrorContext";
import { usePokerContext } from "../context/PokerContext";
import { isModerator, isWaitingUser } from "../../common/utils/participantsUtils";
import { useUserContext } from "../../common/context/UserContext";
import { WaitingForApproval } from "../../common/components/WaitingForApproval";
import { useRoomIdFromPath } from "../../common/hooks/useRoomIdFromPath";
import { useFirstWaitingUser } from "../../common/components/useFirstWaitingUser";
import { AppHeader } from "../../common/components/AppHeader";
import { EstimationUnitSetupMenuItem } from "./buttons/EstimationUnitSetupMenuItem";
import { NewParticipantSnackbar } from "../../common/components/NewParticipantSnackbar";
import { PokerActionButtons } from "./PokerActionButtons";
import { useRouter } from "next/navigation";
import { SetupSessionDialog } from "../../common/dialogs/SetupSessionDialog";
import { FlexBox } from "../../common/components/FlexBox";
import Footer from "../../common/components/Footer";

export function PokerPageContent() {
  const { push } = useRouter();
  const {
    pokerState,
    resetPokerState,
    handleKickUser,
    handleAcceptJoinUser,
    handleRejectJoinUser,
    handleTransferModeratorRole,
    handleAddToWaitingList,
  } = usePokerContext();
  const { user, resetUser } = useUserContext();
  const { error } = useErrorContext();
  const roomIdFromPath = useRoomIdFromPath();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useFirstWaitingUser({ waitingList: pokerState.waitingList, onFirstUserWaiting: showSnackbar });

  useEffect(() => {
    if (!roomIdFromPath) {
      resetUser();
      resetPokerState();
    }
  }, [roomIdFromPath, resetUser, resetPokerState]);

  useEffect(() => {
    document.title = "Retro | Planning Poker";

    return () => {
      document.title = "Retro";
    };
  });

  useEffect(() => {
    if (error) push("/error");
  }, [error, push]);

  function showSnackbar() {
    if (isModerator(user)) setSnackbarOpen(true);
  }

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;

    setSnackbarOpen(false);
  };

  if (isWaitingUser(pokerState.waitingList, user.id))
    return (
      <>
        <AppHeader
          participants={pokerState.participants}
          waitingList={pokerState.waitingList}
          onKickUser={handleKickUser}
          onAcceptJoinUser={handleAcceptJoinUser}
          onRejectJoinUser={handleRejectJoinUser}
          onTransferModeratorRole={handleTransferModeratorRole}
        />
        <WaitingForApproval />
      </>
    );

  return (
    <>
      <AppHeader
        participants={pokerState.participants}
        waitingList={pokerState.waitingList}
        onKickUser={handleKickUser}
        onAcceptJoinUser={handleAcceptJoinUser}
        onRejectJoinUser={handleRejectJoinUser}
        onTransferModeratorRole={handleTransferModeratorRole}
      >
        <EstimationUnitSetupMenuItem />
      </AppHeader>
      <FlexBox justifyContent="center" mt={2}>
        <PokerActionButtons />
      </FlexBox>
      <PokerTitle />
      <PokerUsers />
      {pokerState.showResults && <PokerStats />}
      <NewParticipantSnackbar
        isSnackbarOpen={snackbarOpen}
        handleCloseSnackbar={handleCloseSnackbar}
      />
      <SetupSessionDialog onAddToWaitingList={handleAddToWaitingList} />
      <Footer />
    </>
  );
}
