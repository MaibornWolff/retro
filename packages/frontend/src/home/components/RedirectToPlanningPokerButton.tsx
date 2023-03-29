import React from "react";
import { useNavigate } from "react-router-dom";
import { Fab, useTheme } from "@mui/material";
import { Casino } from "@mui/icons-material";

export function RedirectToPlanningPokerButton() {
  const theme = useTheme();
  const navigate = useNavigate();

  function navigateToPlanningPoker() {
    navigate(`/poker`);
  }

  return (
    <Fab
      size="large"
      variant="extended"
      onClick={navigateToPlanningPoker}
      sx={{
        margin: theme.spacing(1),
        minWidth: "11rem",
      }}
    >
      <Casino
        sx={{
          marginRight: theme.spacing(1),
        }}
      />
      Planning Poker
    </Fab>
  );
}
