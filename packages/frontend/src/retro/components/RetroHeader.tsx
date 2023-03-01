import React from "react";
import { Grid, Typography, useTheme } from "@mui/material";
import { useRetroContext } from "../context/RetroContext";

export default function RetroTitle() {
  const theme = useTheme();
  const { retroState } = useRetroContext();

  return (
    <Grid item xs={12} sx={{ margin: theme.spacing(2) }}>
      <Typography variant="h5">{retroState.title}</Typography>
    </Grid>
  );
}
