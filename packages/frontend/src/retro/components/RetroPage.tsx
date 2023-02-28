import React, { useEffect } from "react";
import { Grid, useTheme } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import { Navigate } from "react-router-dom";

import AppHeader from "./header/AppHeader";
import RetroHeader from "./RetroHeader";
import MergeCardsDialog from "./dialogs/MergeCardsDialog";
import VoteProgress from "./VoteProgress";
import Columns from "./columns/Columns";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { useRetroContext } from "../context/RetroContext";
import SetupRetroButton from "./SetupRetroButton";
import { useRoomIdExists } from "../../common/hooks/useRoomIdExists";
import { useErrorContext } from "../../common/context/ErrorContext";
import { useExportRetroContext } from "../context/ExportRetroContext";
import { isWaitingUser } from "../../common/utils/participantsUtils";
import { WaitingForApproval } from "./WaitingForApproval";
import { useUserContext } from "../../common/context/UserContext";

export default function RetroPage() {
  const { retroState } = useRetroContext();
  const { isError } = useErrorContext();
  const { boardRef } = useExportRetroContext();
  const { isMergeDialogOpen, onDragEnd, closeMergeDialog, handleMergeCards } = useDragAndDrop();
  const { user } = useUserContext();
  const theme = useTheme();

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
        <AppHeader />
        <WaitingForApproval />
      </>
    );

  return (
    <>
      <AppHeader />
      <VoteProgress />
      <Grid
        container
        sx={{ flexGrow: 1, backgroundColor: theme.palette.background.default }}
        direction="column"
        ref={boardRef}
      >
        <RetroHeader />
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
        <SetupRetroButton />
      </Grid>
    </>
  );
}
