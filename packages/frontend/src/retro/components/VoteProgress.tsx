import React from "react";
import { Box, Typography } from "@mui/material";
import { useUserContext } from "../../common/context/UserContext";
import { CircularProgressWithLabel } from "./CircularProgressWithLabel";
import { useRetroContext } from "../context/RetroContext";
import { useVotesLeft } from "../hooks/useVotesLeft";

export function VoteProgress() {
  const { user } = useUserContext();
  const { retroState } = useRetroContext();
  const { maxVoteCount } = retroState;
  const votesLeft = useVotesLeft();

  if (!user.id) return null;

  return (
    <Box px={2} display="flex" alignItems="center">
      <Typography variant="body1" color="textPrimary" mr={2} noWrap>
        {"Remaining votes:"}
      </Typography>
      <CircularProgressWithLabel maxValue={maxVoteCount} currentValue={votesLeft} />
    </Box>
  );
}
