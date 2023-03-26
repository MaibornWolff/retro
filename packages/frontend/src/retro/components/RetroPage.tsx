import React, { useEffect, useState } from "react";
import { Box, Snackbar } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import { Navigate } from "react-router-dom";

import { MergeCardsDialog } from "./dialogs/MergeCardsDialog";
import { VoteProgress } from "./VoteProgress";
import { Columns } from "./columns/Columns";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { useRetroContext } from "../context/RetroContext";
import { useErrorContext } from "../../common/context/ErrorContext";
import { useExportRetroContext } from "../context/ExportRetroContext";
import { isModerator, isWaitingUser } from "../../common/utils/participantsUtils";
import { useUserContext } from "../../common/context/UserContext";
import { WaitingForApproval } from "../../common/components/WaitingForApproval";
import { RetroTitle } from "./RetroTitle";
import { RetroActionButtons } from "./RetroActionButtons";
import { useRoomIdFromPath } from "../../common/hooks/useRoomIdFromPath";
import { useFirstWaitingUser } from "../../common/components/useFirstWaitingUser";
import { Alert } from "../../common/components/Alert";
import { AppHeader } from "../../common/components/AppHeader";
import { QrCodeMenuItem } from "./buttons/QrCodeMenuItem";
import { ExportRetroImageMenuItem } from "./buttons/ExportRetroImageMenuItem";
import { ExportRetroMenuItem } from "./buttons/ExportRetroMenuItem";
import { ImportRetroMenuItem } from "./buttons/ImportRetroMenuItem";
import { ManageVotesMenuItem } from "./buttons/ManageVotesMenuItem";

export function RetroPage() {
  const {
    retroState,
    resetRetroState,
    handleKickUser,
    handleAcceptJoinUser,
    handleRejectJoinUser,
    handleTransferModeratorRole,
  } = useRetroContext();
  const { user, resetUser } = useUserContext();
  const { error } = useErrorContext();
  const { boardRef } = useExportRetroContext();
  const roomIdFromPath = useRoomIdFromPath();
  const { isMergeDialogOpen, onDragEnd, closeMergeDialog, handleMergeCards } = useDragAndDrop();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useFirstWaitingUser({ waitingList: retroState.waitingList, onFirstUserWaiting: showSnackbar });

  useEffect(() => {
    if (!roomIdFromPath) {
      resetUser();
      resetRetroState();
    }
  }, [roomIdFromPath, resetUser, resetRetroState]);

  function showSnackbar() {
    if (isModerator(user)) setSnackbarOpen(true);
  }

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;

    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (!retroState.title) {
      document.title = "Retro";
    } else {
      document.title = `Retro | ${retroState.title}`;
    }

    return () => {
      document.title = "Retro";
    };
  }, [retroState.title]);

  if (error) return <Navigate to={"/error"} />;
  if (isWaitingUser(retroState.waitingList, user.id))
    return (
      <>
        <AppHeader
          participants={retroState.participants}
          waitingList={retroState.waitingList}
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
        participants={retroState.participants}
        waitingList={retroState.waitingList}
        onKickUser={handleKickUser}
        onAcceptJoinUser={handleAcceptJoinUser}
        onRejectJoinUser={handleRejectJoinUser}
        onTransferModeratorRole={handleTransferModeratorRole}
      >
        <ManageVotesMenuItem />
        <ExportRetroImageMenuItem />
        <ExportRetroMenuItem />
        <ImportRetroMenuItem />
        <QrCodeMenuItem />
      </AppHeader>
      <Box sx={{ width: "100%" }} ref={boardRef}>
        <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", p: 2 }}>
          <RetroTitle />
          <VoteProgress />
        </Box>
        <Box sx={{ display: "flex", gap: "1rem", p: 2 }}>
          <RetroActionButtons />
        </Box>
        <DragDropContext onDragEnd={onDragEnd}>
          <Columns />
        </DragDropContext>
        <MergeCardsDialog
          open={isMergeDialogOpen}
          closeDialog={closeMergeDialog}
          onMergeCards={handleMergeCards}
        />
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <div>
          <Alert onClose={handleCloseSnackbar} severity="info">
            There is a new participant waiting to be accepted.
          </Alert>
        </div>
      </Snackbar>
    </>
  );
}
