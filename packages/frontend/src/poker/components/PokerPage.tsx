import React, { useEffect } from "react";
import { Grid, useTheme } from "@mui/material";
import { Navigate } from "react-router-dom";

import PokerHeader from "./PokerHeader";
import PokerActionButtons from "./PokerActionButtons";
import PokerTitle from "./PokerTitle";
import PokerUsers from "./PokerUsers";

import PokerStats from "./PokerStats";
import { useErrorContext } from "../../common/context/ErrorContext";
import { usePokerContext } from "../context/PokerContext";
import { isWaitingUser } from "../../common/utils/participantsUtils";
import { useUserContext } from "../../common/context/UserContext";
import { WaitingForApproval } from "../../common/components/WaitingForApproval";

export default function PokerPage() {
  const { pokerState } = usePokerContext();
  const { user } = useUserContext();
  const { isError } = useErrorContext();
  const theme = useTheme();

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
