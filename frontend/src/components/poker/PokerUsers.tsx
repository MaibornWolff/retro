import React from "react";
import { Grid } from "@material-ui/core";

import { PokerUser as PokerUserType } from "../../hooks/poker.hooks";
import PokerUser from "./PokerUser";

interface PokerUsersProps {
  participants: PokerUserType[];
  flip: boolean;
}

export default function PokerUsers(props: PokerUsersProps) {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      {props.participants.map((user, index) => {
        return <PokerUser key={index} user={user} isFlipped={props.flip} />;
      })}
    </Grid>
  );
}
