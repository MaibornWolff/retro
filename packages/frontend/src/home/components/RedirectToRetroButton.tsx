import React from "react";
import { Fab } from "@mui/material";
import { People } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export function RedirectToRetroButton() {
  const { push } = useRouter();

  function navigateToRetro() {
    push(`/retro`);
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
