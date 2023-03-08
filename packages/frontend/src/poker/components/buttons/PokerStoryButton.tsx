import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from "@mui/material";
import { usePokerContext } from "../../context/PokerContext";
import { useUserContext } from "../../../common/context/UserContext";
import { useValidatedTextInput } from "../../../common/hooks/useValidatedTextInput";
import { useFullscreen } from "../../../retro/hooks/useFullscreen";
import TextInput from "../../../common/components/TextInput";
import { isModerator } from "../../../common/utils/participantsUtils";

export default function PokerStoryButton() {
  const { handleSetUserStory } = usePokerContext();
  const { user } = useUserContext();
  const [open, setOpen] = useState(false);
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
  const fullScreen = useFullscreen();
  const theme = useTheme();

  function closeDialog() {
    setStoryTitle("");
    setIsStoryTitleError(false);
    setStoryUrl("");
    setOpen(false);
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

  if (!isModerator(user)) return null;

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        sx={{ margin: theme.spacing(1) }}
        onClick={() => {
          setOpen(true);
        }}
      >
        Set User Story
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        aria-labelledby="set-story-poker-dialog-title"
      >
        <DialogTitle id="set-story-poker-dialog-title">User Story to Discuss</DialogTitle>
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
          <Button color="primary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit} disabled={!isStoryTitleValid}>
            Set Story
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
