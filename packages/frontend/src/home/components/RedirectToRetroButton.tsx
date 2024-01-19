import React from "react";
import { Fab } from "@mui/material";
import { People } from "@mui/icons-material";
import Link from "next/link";

export function RedirectToRetroButton() {
  return (
    <Link href="/retro">
      <Fab
        size="large"
        variant="extended"
        sx={{
          m: 1,
          minWidth: "11rem",
        }}
      >
        <People sx={{ mr: 1 }} />
        Retrospective
      </Fab>
    </Link>
  );
}
