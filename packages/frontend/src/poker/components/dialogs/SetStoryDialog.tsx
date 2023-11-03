import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DialogProps } from "../../../common/types/commonTypes";
import { TextInput } from "../../../common/components/TextInput";
import { useFullscreen } from "../../../retro/hooks/useFullscreen";
import { useValidatedTextInput } from "../../../common/hooks/useValidatedTextInput";
import { usePokerContext } from "../../context/PokerContext";
import { CallToActionButton } from "../../../common/components/buttons/CallToActionButton";

export function SetStoryDialog({ isOpen, close }: DialogProps) {
  const { handleSetUserStory, pokerState } = usePokerContext();
  const fullScreen = useFullscreen();
  const {
    value: storyTitle,
    setValue: setStoryTitle,
    isError: isStoryTitleError,
    setIsError: setIsStoryTitleError,
    handleChange: handleStoryTitleChange,
    isValid: isStoryTitleValid,
  } = useValidatedTextInput({
    minLength: 1,
    maxLength: 400,
    initialValue: pokerState.story.storyTitle,
  });
  const {
    value: storyUrl,
    setValue: setStoryUrl,
    handleChange: handleStoryUrlChange,
  } = useValidatedTextInput({ initialValue: pokerState.story.storyUrl });

  function closeDialog() {
    close();
    setStoryTitle(pokerState.story.storyTitle);
    setStoryUrl(pokerState.story.storyUrl ?? "");
    setIsStoryTitleError(false);
  }

  function handleSubmit() {
    if (!isStoryTitleValid) {
      setIsStoryTitleError(true);
      return;
    }

    const newStory = { storyTitle, storyUrl };
    handleSetUserStory(newStory);
    closeDialog();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      open={isOpen}
      onClose={closeDialog}
      aria-labelledby="set-story-poker-dialog-title"
    >
      <DialogTitle id="set-story-poker-dialog-title">User Story to discuss</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Provide the title of the user story and optionally an URL linking to it.
        </DialogContentText>
        <TextInput
          required
          autoFocus
          value={storyTitle}
          onChange={handleStoryTitleChange}
          onSubmit={handleSubmit}
          error={isStoryTitleError}
          id="story-title"
          label="Story Title"
        />
        <TextInput
          value={storyUrl}
          onChange={handleStoryUrlChange}
          onSubmit={handleSubmit}
          id="story-url"
          label="Story URL"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <CallToActionButton onClick={handleSubmit} disabled={!isStoryTitleValid}>
          Set Story
        </CallToActionButton>
      </DialogActions>
    </Dialog>
  );
}
