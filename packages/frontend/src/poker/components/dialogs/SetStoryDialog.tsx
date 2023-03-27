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

export function SetStoryDialog({ isOpen, close }: DialogProps) {
  const { handleSetUserStory } = usePokerContext();
  const fullScreen = useFullscreen();
  const {
    value: storyTitle,
    setValue: setStoryTitle,
    isError: isStoryTitleError,
    setIsError: setIsStoryTitleError,
    handleChange: handleStoryTitleChange,
    isValid: isStoryTitleValid,
  } = useValidatedTextInput({ minLength: 1, maxLength: 400 });
  const {
    value: storyUrl,
    setValue: setStoryUrl,
    handleChange: handleStoryUrlChange,
  } = useValidatedTextInput();

  function closeDialog() {
    setStoryTitle("");
    setIsStoryTitleError(false);
    setStoryUrl("");
    close();
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
      <DialogTitle id="set-story-poker-dialog-title">User Story to Discuss</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Provide the title of the user story and optionally an URL linking to it.
        </DialogContentText>
        <TextInput
          aria-label="Story Title"
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
          aria-label="Story URL"
          value={storyUrl}
          onChange={handleStoryUrlChange}
          onSubmit={handleSubmit}
          id="story-url"
          label="Story URL"
        />
      </DialogContent>
      <DialogActions>
        <Button aria-label="Cancel" color="primary" onClick={closeDialog}>
          Cancel
        </Button>
        <Button
          aria-label="Set Story"
          color="primary"
          onClick={handleSubmit}
          disabled={!isStoryTitleValid}
        >
          Set Story
        </Button>
      </DialogActions>
    </Dialog>
  );
}
