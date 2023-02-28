import React from "react";
import { Button, useTheme } from "@mui/material";
import { usePokerContext } from "../context/PokerContext";
import { useUserContext } from "../../common/context/UserContext";

export default function PokerResultButton() {
  const theme = useTheme();
  const { user } = useUserContext();
  const { handleShowPokerResults } = usePokerContext();

  if (user.role !== "moderator") return null;

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
