import React from "react";
import { Grid } from "@material-ui/core";
import VoteCountDialog from "../dialogs/VoteCountDialog";

function VoteCountButton(props) {
  const { className, maxVoteCount } = props;

  return (
    <>
      <Grid item className={className}>
        <VoteCountDialog maxVoteCount={maxVoteCount} />
      </Grid>
    </>
  );
}

export default VoteCountButton;
