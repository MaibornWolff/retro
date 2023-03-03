import React from "react";
import { BlurOff, BlurOn } from "@mui/icons-material";
import { Button } from "@mui/material";

import { useRetroContext } from "../../context/RetroContext";
import { useUserContext } from "../../../common/context/UserContext";

export default function ToggleRetroBlurButton() {
  const { handleToggleRetroBlur, retroState } = useRetroContext();
  const { isBlurred } = retroState;
  const { user } = useUserContext();
  const buttonText = isBlurred ? "Unblur Board" : "Blur Board";
  const buttonIcon = isBlurred ? <BlurOff /> : <BlurOn />;

  function toggleRetroBlur() {
    if (user.role !== "moderator") return;
    handleToggleRetroBlur();
  }

  if (user.role !== "moderator") return null;

  return (
    <Button
      variant="outlined"
      aria-label="Toggle Blur"
      onClick={toggleRetroBlur}
      startIcon={buttonIcon}
      fullWidth
    >
      {buttonText}
    </Button>
  );
}
