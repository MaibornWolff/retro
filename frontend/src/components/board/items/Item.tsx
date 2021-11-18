import { isEmpty } from "lodash";
import React, { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import { UserContext } from "../../../context/UserContext";
import { RetroCard, RetroComment } from "../../../types/common.types";
import { ROLE_MODERATOR } from "../../../utils/user.utils";
import { ItemContainer } from "../../styled-components";
import RetroItem from "./RetroItem";

type ItemProps = {
  item: RetroCard;
  commentMap: {
    [key: string]: RetroComment;
  };
  index: number;
  isVoted: boolean;
};

function Item(props: ItemProps) {
  const { item, index, isVoted, commentMap } = props;
  const { id, author, commentIds, content, points, isBlurred, isDiscussed } =
    item;
  const { userState } = useContext(UserContext);

  function getComments() {
    let comments: RetroComment[];

    if (isEmpty(commentIds)) {
      comments = [];
    } else {
      comments = commentIds?.map((id: string) => commentMap[id]);
    }

    return comments;
  }

  return (
    <Draggable
      draggableId={id}
      index={index}
      isDragDisabled={
        userState.name !== author && userState.role !== ROLE_MODERATOR
      }
    >
      {(provided) => (
        <ItemContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <RetroItem
            id={id}
            author={author}
            comments={getComments()}
            content={content}
            points={points}
            isBlurred={isBlurred}
            isVoted={isVoted}
            isDiscussed={isDiscussed}
          />
        </ItemContainer>
      )}
    </Draggable>
  );
}

export default Item;
