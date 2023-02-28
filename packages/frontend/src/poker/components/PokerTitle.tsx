import React from "react";
import { Grid, Link, Typography, useTheme } from "@mui/material";
import { usePokerContext } from "../context/PokerContext";

export default function PokerTitle() {
  const { storyTitle, storyUrl } = usePokerContext().pokerState.story;
  const theme = useTheme();

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <Typography variant="h4" sx={{ padding: theme.spacing(2) }}>
        {storyUrl ? (
          <Link href={storyUrl} target="_blank" rel="nofollow noreferrer">
            {storyTitle}
          </Link>
        ) : (
          storyTitle
        )}
      </Typography>
    </Grid>
  );
}
