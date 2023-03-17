import React from "react";
import { BlurOff, BlurOn } from "@mui/icons-material";
import { Button } from "@mui/material";

import { useRetroContext } from "../../context/RetroContext";
import { useUserContext } from "../../../common/context/UserContext";
import { isModerator } from "../../../common/utils/participantsUtils";

export function ToggleRetroBlurButton() {
  const { handleToggleRetroBlur, retroState } = useRetroContext();
  const { isBlurred } = retroState;
  const { user } = useUserContext();
  const buttonText = isBlurred ? "Unblur Board" : "Blur Board";
  const buttonIcon = isBlurred ? <BlurOff /> : <BlurOn />;

  function toggleRetroBlur() {
    if (!isModerator(user)) return;
    handleToggleRetroBlur();
  }

  if (!isModerator(user)) return null;

  return (
    <Button
      variant="outlined"
      aria-label={buttonText}
      onClick={toggleRetroBlur}
      startIcon={buttonIcon}
      sx={{ width: "100%" }}
    >
      {buttonText}
    </Button>
  );
}
