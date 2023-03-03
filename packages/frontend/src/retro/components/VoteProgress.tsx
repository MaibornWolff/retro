import React from "react";
import { Box, Typography } from "@mui/material";
import { useUserContext } from "../../common/context/UserContext";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

export default function VoteProgress() {
  const { user } = useUserContext();

  if (!user.id) return null;

  return (
    <Box width="100%" px={2} display="flex" alignItems="center">
      <Typography variant="body1" color="textPrimary" mr={2}>
        {"Remaining votes:"}
      </Typography>
      <CircularProgressWithLabel />
    </Box>
  );
}
