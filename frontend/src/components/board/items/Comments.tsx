import { Divider, List } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { RetroComment } from "../../../types/common.types";
import { ROLE_MODERATOR } from "../../../utils/user.utils";
import CommentItem from "./CommentItem";
import EditableCommentItem from "./EditableCommentItem";

type CommentProps = {
  cardId: string;
  comments: RetroComment[];
};

export default function Comments(props: CommentProps) {
  const [editCommentIndex, setEditCommentIndex] = useState(-1);
  const { userState } = useContext(UserContext);

  function editComment(commentIndex: number) {
    setEditCommentIndex(commentIndex);
  }

  return (
    <List>
      <EditableCommentItem
        comment={{ id: "", author: "", content: "" }}
        cardId={props.cardId}
        isCreating
      />
      {props.comments.length > 0 && <Divider />}
      {props.comments.map((comment, index: number) => {
        return (
          <div key={index}>
            {editCommentIndex != index ? (
              <CommentItem
                comment={comment}
                editable={
                  userState.role === ROLE_MODERATOR ||
                  userState.writtenComments.includes(comment.id)
                }
                onEdit={() => editComment(index)}
              />
            ) : (
              <EditableCommentItem
                isCreating={false}
                comment={comment}
                onClose={() => editComment(-1)}
              />
            )}
            {index != props.comments.length - 1 && <Divider />}
          </div>
        );
      })}
    </List>
  );
}
