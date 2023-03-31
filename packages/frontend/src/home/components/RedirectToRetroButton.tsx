import React from "react";
import { useNavigate } from "react-router-dom";
import { Fab } from "@mui/material";
import { People } from "@mui/icons-material";

export function RedirectToRetroButton() {
  const navigate = useNavigate();

  function navigateToRetro() {
    navigate(`/retro`);
  }

  return (
    <Fab
      size="large"
      variant="extended"
      onClick={navigateToRetro}
      sx={{
        m: 1,
        minWidth: "11rem",
      }}
    >
      <People sx={{ mr: 1 }} />
      Retrospective
    </Fab>
  );
}
