import React from "react";
import { Grid, useTheme } from "@mui/material";
import PokerStoryButton from "./PokerStoryButton";
import PokerResultButton from "./PokerResultButton";
import PokerResetButton from "./PokerResetButton";
import SetupPokerButton from "../../common/components/SetupPokerButton";

export default function PokerActionButtons() {
  const theme = useTheme();

  return (
    <Grid item xs={12} sx={{ margin: theme.spacing(1) }}>
      <Grid container direction="row" sx={{ height: "20px" }}>
        <SetupPokerButton />
        <PokerStoryButton />
        <PokerResetButton />
        <PokerResultButton />
      </Grid>
    </Grid>
  );
}
