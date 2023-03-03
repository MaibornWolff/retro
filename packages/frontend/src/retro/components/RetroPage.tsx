import React, { useEffect } from "react";
import { Grid, useTheme } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import { Navigate } from "react-router-dom";

import RetroHeader from "./header/RetroHeader";
import MergeCardsDialog from "./dialogs/MergeCardsDialog";
import VoteProgress from "./VoteProgress";
import Columns from "./columns/Columns";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { useRetroContext } from "../context/RetroContext";
import { useRoomIdExists } from "../../common/hooks/useRoomIdExists";
import { useErrorContext } from "../../common/context/ErrorContext";
import { useExportRetroContext } from "../context/ExportRetroContext";
import { isWaitingUser } from "../../common/utils/participantsUtils";
import { useUserContext } from "../../common/context/UserContext";
import { WaitingForApproval } from "../../common/components/WaitingForApproval";
import RetroTitle from "./RetroHeader";
import RetroActionButtons from "./RetroActionButtons";
import { useRoomIdFromPath } from "../../common/hooks/useRoomIdFromPath";

export default function RetroPage() {
  const { retroState, resetRetroState } = useRetroContext();
  const { user, resetUser } = useUserContext();
  const { isError } = useErrorContext();
  const { boardRef } = useExportRetroContext();
  const roomIdFromPath = useRoomIdFromPath();
  const { isMergeDialogOpen, onDragEnd, closeMergeDialog, handleMergeCards } = useDragAndDrop();
  const theme = useTheme();

  useEffect(() => {
    if (!roomIdFromPath) {
      resetUser();
      resetRetroState();
    }
  }, [roomIdFromPath, resetUser, resetRetroState]);

  useRoomIdExists();

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

  if (isError) return <Navigate to={"/error"} />;
  if (isWaitingUser(retroState.waitingList, user.id))
    return (
      <>
        <RetroHeader />
        <WaitingForApproval />
      </>
    );

  return (
    <>
      <RetroHeader />
      <Grid
        container
        sx={{ backgroundColor: theme.palette.background.default }}
        direction="column"
        ref={boardRef}
      >
        <RetroTitle />
        <Grid container direction="row" alignItems="center" pb={2}>
          <Grid item>
            <VoteProgress />
          </Grid>
          <Grid item>
            <RetroActionButtons />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Columns />
          </DragDropContext>
        </Grid>
        <MergeCardsDialog
          open={isMergeDialogOpen}
          closeDialog={closeMergeDialog}
          onMergeCards={handleMergeCards}
        />
      </Grid>
    </>
  );
}
