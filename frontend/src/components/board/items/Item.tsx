import React, { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import { UserContext } from "../../../context/UserContext";
import { RetroCard } from "../../../types/common.types";
import { ROLE_MODERATOR } from "../../../utils/user.utils";
import { ItemContainer } from "../../styled-components";
import RetroItem from "./RetroItem";

type ItemProps = {
  item: RetroCard;
  index: number;
  isVoted: boolean;
};

function Item(props: ItemProps) {
  const { item, index, isVoted } = props;
  const { id, author, commentIds, content, points, isBlurred, isDiscussed } =
    item;
  const { userState } = useContext(UserContext);

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
