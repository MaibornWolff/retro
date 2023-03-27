import React from "react";
import { BlurOff, BlurOn } from "@mui/icons-material";

import { useRetroContext } from "../../context/RetroContext";
import { useUserContext } from "../../../common/context/UserContext";
import { isModerator } from "../../../common/utils/participantsUtils";
import { ActionButton } from "../../../common/components/buttons/ActionButton";

export function ToggleRetroBlurButton() {
  const { handleToggleRetroBlur, retroState } = useRetroContext();
  const { isBlurred } = retroState;
  const { user } = useUserContext();
  const buttonText = isBlurred ? "Unblur board" : "Blur board";
  const buttonIcon = isBlurred ? <BlurOff /> : <BlurOn />;

  function toggleRetroBlur() {
    if (!isModerator(user)) return;
    handleToggleRetroBlur();
  }

  if (!isModerator(user)) return null;

  return (
    <ActionButton
      aria-label={buttonText}
      onClick={toggleRetroBlur}
      label={buttonText}
      icon={buttonIcon}
    />
  );
}
