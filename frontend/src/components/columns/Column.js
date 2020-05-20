import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Card } from "@material-ui/core";

import Items from "../items/Items";
import ColumnHeader from "./column-header/ColumnHeader";
import { ColumnContainerStyles, ItemsContainerStyles } from "../styled";
import { COLUMN_CONTAINER, COLUMN_ITEMS_CONTAINER } from "../../constants/testIds";

const ColumnContainer = styled(Card)`
  ${ColumnContainerStyles}
`;

const ItemsContainer = styled.div`
  ${ItemsContainerStyles};
`;

function Column(props) {
  const { column, items, index, openSnackbar } = props;

  return (
    <Draggable draggableId={column.id} index={index}>
      {(providedDraggable) => (
        <ColumnContainer
          {...providedDraggable.draggableProps}
          {...providedDraggable.dragHandleProps}
          ref={providedDraggable.innerRef}
          raised
          data-testid={COLUMN_CONTAINER + `__${column.columnTitle}`}
        >
          <ColumnHeader columnTitle={column.columnTitle} columnId={column.id} items={items} />

          <Droppable droppableId={column.id} type="item" isCombineEnabled={true}>
            {(providedDroppable, snapshot) => (
              <ItemsContainer
                ref={providedDroppable.innerRef}
                {...providedDroppable.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
                data-testid={COLUMN_ITEMS_CONTAINER + `__${column.columnTitle}`}
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
