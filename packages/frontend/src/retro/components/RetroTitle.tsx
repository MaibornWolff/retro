import React from "react";
import { Typography } from "@mui/material";
import { useRetroContext } from "../context/RetroContext";

export function RetroTitle() {
  const { retroState } = useRetroContext();

  return <Typography variant="h4">{retroState.title}</Typography>;
}
