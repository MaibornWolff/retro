import { Card } from "@material-ui/core";
import React, { useContext } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { UserContext } from "../../../context/UserContext";
import { RetroCard, RetroColumn } from "../../../types/common.types";
import { ROLE_MODERATOR } from "../../../utils/user.utils";
import {
  ColumnContainerStyles,
  ItemsContainerStyles
} from "../../styled-components";
import Items from "../items/Items";
import ColumnHeader from "./column-header/ColumnHeader";


const ColumnContainer = styled(Card)`
  ${ColumnContainerStyles}
`;

const ItemsContainer = styled.div`
  ${ItemsContainerStyles};
`;

type ColumnProps = {
  column: RetroColumn;
  items: RetroCard[];
  index: number;
};

function Column(props: ColumnProps) {
  const { column, items, index } = props;
  const { userState } = useContext(UserContext);

  return (
    <Draggable
      draggableId={column.id}
      index={index}
      isDragDisabled={userState.role !== ROLE_MODERATOR}
    >
      {(providedDraggable) => (
        <ColumnContainer
          {...providedDraggable.draggableProps}
          {...providedDraggable.dragHandleProps}
          ref={providedDraggable.innerRef}
          raised
        >
          <ColumnHeader
            columnTitle={column.columnTitle}
            columnId={column.id}
            items={items}
          />

          <Droppable
            droppableId={column.id}
            type="item"
            isCombineEnabled={true}
          >
            {(providedDroppable, snapshot) => (
              <ItemsContainer
                ref={providedDroppable.innerRef}
                {...providedDroppable.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <Items items={items} />
                {providedDroppable.placeholder}
              </ItemsContainer>
            )}
          </Droppable>
        </ColumnContainer>
      )}
    </Draggable>
  );
}

export default Column;
