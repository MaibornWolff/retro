import React from "react";
import { Typography } from "@mui/material";
import { useRetroContext } from "../context/RetroContext";

export default function RetroTitle() {
  const { retroState } = useRetroContext();

  return <Typography variant="h5">{retroState.title}</Typography>;
}
