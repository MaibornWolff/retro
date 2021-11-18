import {
  CardContent,
  Collapse,
  Divider,
  List,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import CommentItem from "./CommentItem";
import EditableCommentItem from "./EditableCommentItem";

const useStyles = makeStyles(() => ({
  commentDivider: {
    margin: "0px -16px 16px -16px",
  },
}));

export default function ExpandableComments(props: any) {
  const [editCommentIndex, setEditCommentIndex] = useState(-1);
  const classes = useStyles();

  function editComment(commentIndex: number) {
    setEditCommentIndex(commentIndex);
  }

  return (
    <Collapse in={props.isExpanded} unmountOnExit>
      <CardContent>
        <Divider className={classes.commentDivider} />
        <List>
          <EditableCommentItem
            comment={{ author: "", content: "" }}
            cardId={props.cardId}
            isCreating
          />
          {props.comments.length > 0 && <Divider />}
          {props.comments.map((comment: any, index: number) => {
            return (
              <div key={index}>
                {editCommentIndex != index ? (
                  <CommentItem
                    comment={comment}
                    onEdit={() => editComment(index)}
                  />
                ) : (
                  <EditableCommentItem
                    comment={comment}
                    onClose={() => editComment(-1)}
                  />
                )}
                {index != props.comments.length - 1 && <Divider />}
              </div>
            );
          })}
        </List>
      </CardContent>
    </Collapse>
  );
}
