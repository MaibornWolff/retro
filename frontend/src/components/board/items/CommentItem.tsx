import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, { Fragment, useContext } from "react";
import { DELETE_COMMENT } from "../../../constants/event.constants";
import { BoardContext } from "../../../context/BoardContext";
import { RetroComment } from "../../../types/common.types";

type CommentItemProps = {
  comment: RetroComment;
  onEdit: () => void;
  editable: boolean;
};

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    color: theme.palette.error.main,
  },
  commentContent: {
    whiteSpace: "pre-wrap",
  },
}));

export default function CommentItem(props: CommentItemProps) {
  const { boardId, socket } = useContext(BoardContext);

  const classes = useStyles();

  function deleteComment() {
    socket.emit(DELETE_COMMENT, boardId, props.comment.id);
  }

  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={<span>{props.comment.author}</span>}
        secondary={
          <span className={classes.commentContent}>
            {props.comment.content}
          </span>
        }
      />
      <ListItemSecondaryAction>
        {props.editable && (
          <Fragment>
            <IconButton
              edge="end"
              size="small"
              aria-label="edit"
              onClick={props.onEdit}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              edge="end"
              className={classes.deleteButton}
              size="small"
              aria-label="delete"
              onClick={deleteComment}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Fragment>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
}
