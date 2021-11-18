import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  TextField,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import SendIcon from "@material-ui/icons/Send";
import { nanoid } from "nanoid";
import React, { useContext, useState } from "react";
import { COMMENT_CARD, EDIT_COMMENT } from "../../../constants/event.constants";
import { BoardContext } from "../../../context/BoardContext";

const useStyles = makeStyles(() => ({
  //Styles to match the Text
  authorField: {
    width: "75%",
    fontSize: "1rem",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    lineHeight: "1.5",
    letterSpacing: "0.00938em",
  },
  contentField: {
    width: "75%",
    fontSize: "0.875rem",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    lineHeight: "1.43",
    letterSpacing: "0.01071em",
  },
  fullWidth: {
    width: "100%",
  },
}));

export default function EditableCommentItem(props: any) {
  const { boardId, socket } = useContext(BoardContext);
  const [authorInput, setAuthorInput] = useState(props.comment?.author);
  const [contentInput, setContentInput] = useState(props.comment?.content);
  const classes = useStyles();
  //To differentiate between edit Mode and create Mode
  const isCreating = props.isCreating;

  function onAuthorChange(e: any) {
    setAuthorInput(e.target.value);
  }

  function onContentChange(e: any) {
    setContentInput(e.target.value);
  }
  function handleSubmit(e: any) {
    e.preventDefault();
    if (isCreating) {
      const comment = {
        id: nanoid(),
        author: authorInput,
        content: contentInput,
      };
      socket.emit(COMMENT_CARD, boardId, props.cardId, comment);
      setContentInput("");
    } else {
      const comment = {
        id: props.comment.id,
        author: authorInput,
        content: contentInput,
      };
      socket.emit(EDIT_COMMENT, boardId, comment);
      props.onClose();
    }
  }

  return (
    <ListItem alignItems="flex-start">
      <form className={classes.fullWidth} onSubmit={handleSubmit}>
        <ListItemText
          primary={
            <TextField
              id="author"
              className={classes.fullWidth}
              label={isCreating && "Author"}
              margin="dense"
              value={authorInput}
              onChange={onAuthorChange}
              required
              InputProps={{ className: classes.authorField }}
            />
          }
          secondary={
            <TextField
              id="content"
              className={classes.fullWidth}
              label={isCreating && "Content"}
              margin="dense"
              value={contentInput}
              onChange={onContentChange}
              required
              InputProps={{ className: classes.contentField }}
              multiline
            />
          }
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" size="small" aria-label="save" type="submit">
            {isCreating ? (
              <SendIcon fontSize="small" />
            ) : (
              <SaveIcon fontSize="small" />
            )}
          </IconButton>
          {!isCreating && (
            <IconButton
              edge="end"
              size="small"
              aria-label="cancel"
              onClick={props.onClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </form>
    </ListItem>
  );
}
