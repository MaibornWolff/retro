import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useVotesLeft } from "../hooks/useVotesLeft";
import { useRetroContext } from "../context/RetroContext";

function normalise(value: number, min = 0, max: number) {
  return ((value - min) * 100) / (max - min);
}

export function CircularProgressWithLabel() {
  const { retroState } = useRetroContext();
  const { maxVoteCount } = retroState;
  const votesLeft = useVotesLeft();

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={normalise(maxVoteCount - votesLeft, maxVoteCount, 0)}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" component="div">
          {votesLeft}
        </Typography>
      </Box>
    </Box>
  );
}
