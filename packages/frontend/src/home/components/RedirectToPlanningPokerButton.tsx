import React from "react";
import { Fab } from "@mui/material";
import { Casino } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export function RedirectToPlanningPokerButton() {
  const { push } = useRouter();

  function navigateToPlanningPoker() {
    push(`/poker`);
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
