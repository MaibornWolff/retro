import React from "react";
import { Fab } from "@mui/material";
import { Casino } from "@mui/icons-material";
import Link from "next/link";

export function RedirectToPlanningPokerButton() {
  return (
    <Link href="/poker">
      <Fab
        size="large"
        variant="extended"
        sx={{
          m: 1,
          minWidth: "11rem",
        }}
      >
        <Casino sx={{ mr: 1 }} />
        Planning Poker
      </Fab>
    </Link>
  );
}
