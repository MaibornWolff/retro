import React from "react";
import { Grid } from "@material-ui/core";
import VoteCountDialog from "../dialogs/VoteCountDialog";

function VoteCountButton(props) {
  const { className } = props;

  return (
    <>
      <Grid item className={className}>
        <VoteCountDialog />
      </Grid>
    </>
  );
}

export default VoteCountButton;
