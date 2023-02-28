import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { useRetroContext } from "../context/RetroContext";
import { useVotesLeft } from "../hooks/useVotesLeft";
import { useUserContext } from "../../common/context/UserContext";

function normalise(value: number, min = 0, max: number) {
  return ((value - min) * 100) / (max - min);
}

export default function VoteProgress() {
  const { user } = useUserContext();
  const { retroState } = useRetroContext();
  const { maxVoteCount } = retroState;
  const votesLeft = useVotesLeft();

  if (!user.id) return null;

  return (
    <div style={{ width: "100%" }}>
      <Box display="flex" alignItems="center">
        <Box width="100%" p={2}>
          <Typography variant="body2" color="textSecondary">
            {`Your remaining votes: ${votesLeft}`}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={normalise(maxVoteCount - votesLeft, 0, maxVoteCount)}
          />
        </Box>
      </Box>
    </div>
  );
}
