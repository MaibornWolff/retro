import React, { useEffect, useState } from "react";
import { Box, Snackbar } from "@mui/material";
import { Navigate } from "react-router-dom";

import { PokerTitle } from "./PokerTitle";
import { PokerUsers } from "./PokerUsers";
import { PokerStats } from "./PokerStats";
import { useErrorContext } from "../../common/context/ErrorContext";
import { usePokerContext } from "../context/PokerContext";
import { isModerator, isWaitingUser } from "../../common/utils/participantsUtils";
import { useUserContext } from "../../common/context/UserContext";
import { WaitingForApproval } from "../../common/components/WaitingForApproval";
import { useRoomIdFromPath } from "../../common/hooks/useRoomIdFromPath";
import { Alert } from "../../common/components/Alert";
import { useFirstWaitingUser } from "../../common/components/useFirstWaitingUser";
import { AppHeader } from "../../common/components/AppHeader";
import { EstimationUnitSetupMenuItem } from "./buttons/EstimationUnitSetupMenuItem";
import { PokerActionButtons } from "./PokerActionButtons";
import { FlexBox } from "../../common/components/FlexBox";

export function PokerPage() {
  const {
    pokerState,
    resetPokerState,
    handleKickUser,
    handleAcceptJoinUser,
    handleRejectJoinUser,
    handleTransferModeratorRole,
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

  function showSnackbar() {
    if (isModerator(user)) setSnackbarOpen(true);
  }

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;

    setSnackbarOpen(false);
  };

  if (error) return <Navigate to="/error" />;

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
      <FlexBox mt={1}>
        <PokerActionButtons />
      </FlexBox>
      <PokerTitle />
      <PokerUsers />
      <FlexBox mt={10}>{pokerState.showResults ? <PokerStats /> : null}</FlexBox>
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <Box>
          <Alert onClose={handleCloseSnackbar} severity="info">
            There is a new participant waiting to be accepted.
          </Alert>
        </Box>
      </Snackbar>
    </>
  );
}
