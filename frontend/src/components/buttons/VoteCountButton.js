import React from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { Grid, Button } from "@material-ui/core";

import { isModerator } from "../../utils";

const VoteCountButton = props => {
  const { className, boardId } = props;

  return (
    <>
      <Grid item className={className}>
        <Button
          size="small"
          variant="outlined"
          aria-label="Set Vote Count"
          color="primary"
          onClick={() => {}}
          disabled={!isModerator(boardId)}
        >
          <ThumbUpIcon style={{ marginRight: 5 }} />
          Vote Count
        </Button>
      </Grid>
    </>
  );
};

export default VoteCountButton;
