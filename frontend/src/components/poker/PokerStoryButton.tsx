import React, { useState, useContext } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  TextField,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { PokerContext } from "../../context/PokerContext";
import { SET_POKER_STORY } from "../../constants/event.constants";
import { POKER_ROLE_MODERATOR } from "../../utils/poker.utils";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));

export default function PokerStoryButton() {
  const { pokerId, pokerState, socket } = useContext(PokerContext);
  const [open, setOpen] = useState(false);
  const [storyTitle, setStoryTitle] = useState("");
  const [storyUrl, setStoryUrl] = useState("");
  const classes = useStyles();
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));
  const isError = storyTitle.length > 400 || storyTitle.length === 0;

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setStoryTitle(event.target.value);
  }

  function handleUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
    setStoryUrl(event.target.value);
  }

  function closeDialog() {
    setStoryTitle("");
    setStoryUrl("");
    setOpen(false);
  }

  function handleSubmit() {
    const newStory = { storyTitle, storyUrl };
    socket.emit(SET_POKER_STORY, newStory, pokerId);
    closeDialog();
  }

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        className={classes.root}
        onClick={() => setOpen(true)}
        disabled={pokerState.role !== POKER_ROLE_MODERATOR}
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
        <DialogTitle id="set-story-poker-dialog-title">
          User Story to Discuss
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provide the title of the user story and optionally an URL linking to
            it.
          </DialogContentText>
          <TextField
            required
            autoFocus
            fullWidth
            value={storyTitle}
            onChange={handleTitleChange}
            error={isError}
            id="story-title"
            label="Story Title"
            type="text"
            autoComplete="off"
          />
          <TextField
            fullWidth
            value={storyUrl}
            onChange={handleUrlChange}
            id="story-url"
            label="Story URL"
            type="text"
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit} disabled={isError}>
            Set Story
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
