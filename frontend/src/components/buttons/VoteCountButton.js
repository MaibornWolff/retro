import React from "react";
import { Grid } from "@material-ui/core";
import VoteCountDialog from "../dialogs/VoteCountDialog";

const VoteCountButton = props => {
  const { className, boardId, maxVoteCount } = props;

  return (
    <>
      <Grid item className={className}>
        <VoteCountDialog boardId={boardId} maxVoteCount={maxVoteCount} />
      </Grid>
    </>
  );
};

export default VoteCountButton;
