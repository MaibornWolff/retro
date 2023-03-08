import React from "react";
import { Button, useTheme } from "@mui/material";
import { useUserContext } from "../../../common/context/UserContext";
import { usePokerContext } from "../../context/PokerContext";
import { isModerator } from "../../../common/utils/participantsUtils";

export default function PokerResultButton() {
  const theme = useTheme();
  const { user } = useUserContext();
  const { handleShowPokerResults } = usePokerContext();

  if (!isModerator(user)) return null;

  function handleClick() {
    handleShowPokerResults();
  }

  return (
    <Button
      color="primary"
      variant="outlined"
      sx={{ margin: theme.spacing(1) }}
      onClick={handleClick}
    >
      Show Results
    </Button>
  );
}
