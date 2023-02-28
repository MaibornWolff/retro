import React from "react";
import { useNavigate } from "react-router-dom";
import { Fab, useTheme } from "@mui/material";
import { People } from "@mui/icons-material";

export default function RedirectToRetroButton() {
  const theme = useTheme();
  const navigate = useNavigate();

  function navigateToRetro() {
    navigate(`/retro`);
  }

  return (
    <Fab
      size="large"
      variant="extended"
      color="primary"
      onClick={navigateToRetro}
      sx={{
        margin: theme.spacing(1),
        minWidth: "11rem",
      }}
    >
      <People
        sx={{
          marginRight: theme.spacing(1),
        }}
      />
      Retrospective
    </Fab>
  );
}
