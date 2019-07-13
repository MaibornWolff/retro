import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Items from "./Items";
import ColumnHeader from "./ColumnHeader";
import { ColumnContainer, ItemsContainerStyles } from "./styled";

const ItemsContainer = styled.div`
  ${ItemsContainerStyles};
`;

function Column(props) {
  const { column, items, index, openSnackbar } = props;

  return (
    <Draggable draggableId={column.id} index={index}>
      {providedDraggable => (
        <ColumnContainer
          {...providedDraggable.draggableProps}
          {...providedDraggable.dragHandleProps}
          ref={providedDraggable.innerRef}
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
                <Items items={items} openSnackbar={openSnackbar} />
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
