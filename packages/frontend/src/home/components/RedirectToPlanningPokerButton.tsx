import React from "react";
import { useNavigate } from "react-router-dom";
import { Fab } from "@mui/material";
import { Casino } from "@mui/icons-material";

export function RedirectToPlanningPokerButton() {
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
        m: 1,
        minWidth: "11rem",
      }}
    >
      <Casino sx={{ mr: 1 }} />
      Planning Poker
    </Fab>
  );
}
