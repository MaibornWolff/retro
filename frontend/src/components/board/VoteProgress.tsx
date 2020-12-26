import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";

import { UserContext } from "../../context/UserContext";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

function normalise(value: number, min = 0, max: number) {
  return ((value - min) * 100) / (max - min);
}

export default function VoteProgress() {
  const classes = useStyles();
  const { userState } = useContext(UserContext);
  const voted = userState?.votedItems ? userState.votedItems.length : 0;
  const maxVotes = userState?.maxVoteCount ? userState.maxVoteCount : 3;

  return (
    <div className={classes.root}>
      <Box display="flex" alignItems="center">
        <Box width="100%" p={2}>
          <Typography variant="body2" color="textSecondary">
            {`Your remaining votes: ${userState.votesLeft}`}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={normalise(voted, 0, maxVotes)}
          />
        </Box>
      </Box>
    </div>
  );
}
