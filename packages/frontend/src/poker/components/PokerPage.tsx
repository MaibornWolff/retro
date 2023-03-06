import React, { useEffect } from "react";
import { Grid, useTheme } from "@mui/material";
import { Navigate } from "react-router-dom";

import PokerHeader from "./PokerHeader";
import PokerActionButtons from "./PokerActionButtons";
import PokerTitle from "./PokerTitle";
import PokerUsers from "./PokerUsers";

import PokerStats from "./PokerStats";
import { useRoomIdExists } from "../../common/hooks/useRoomIdExists";
import { useErrorContext } from "../../common/context/ErrorContext";
import { usePokerContext } from "../context/PokerContext";
import { isWaitingUser } from "../../common/utils/participantsUtils";
import { useUserContext } from "../../common/context/UserContext";
import { WaitingForApproval } from "../../common/components/WaitingForApproval";
import { useRoomIdFromPath } from "../../common/hooks/useRoomIdFromPath";

export default function PokerPage() {
  const { pokerState, resetPokerState } = usePokerContext();
  const { user, resetUser } = useUserContext();
  const { isError } = useErrorContext();
  const roomIdFromPath = useRoomIdFromPath();
  const theme = useTheme();

  useEffect(() => {
    if (!roomIdFromPath) {
      resetUser();
      resetPokerState();
    }
  }, [roomIdFromPath, resetUser, resetPokerState]);

  useRoomIdExists();

  useEffect(() => {
    document.title = "Retro | Planning Poker";

    return () => {
      document.title = "Retro";
    };
  });

  if (isError) return <Navigate to={"/error"} />;

  if (isWaitingUser(pokerState.waitingList, user.id))
    return (
      <>
        <PokerHeader />
        <WaitingForApproval />
      </>
    );

  return (
    <div>
      <PokerHeader />
      <Grid container sx={{ flexGrow: 1 }} direction="column" justifyContent="space-between">
        <PokerActionButtons />
        <Grid item xs={12}>
          <PokerTitle />
        </Grid>
        <Grid item xs={12}>
          <PokerUsers />
        </Grid>
        <Grid item xs={12} sx={{ marginTop: theme.spacing(2) }}>
          {pokerState.showResults ? <PokerStats /> : null}
        </Grid>
      </Grid>
    </div>
  );
}
