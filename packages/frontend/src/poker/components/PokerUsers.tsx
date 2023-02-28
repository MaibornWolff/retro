import React from "react";
import { Grid } from "@mui/material";
import PokerUser from "./PokerUser";
import { usePokerContext } from "../context/PokerContext";

export default function PokerUsers() {
  const { pokerState } = usePokerContext();
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {Object.values(pokerState.participants).map((user) => {
        return <PokerUser key={user.id} user={user} />;
      })}
    </Grid>
  );
}
