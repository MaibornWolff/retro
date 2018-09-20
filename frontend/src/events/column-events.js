import _ from "lodash";
import produce from "immer";
import { CREATE_COLUMN, DELETE_COLUMN, SORT_COLUMN } from "./event-names";

/* eslint-disable no-param-reassign */
export const onCreateColumn = component => {
  component.socket.on(CREATE_COLUMN, column => {
    component.setState(
      produce(draft => {
        const { columns, columnOrder } = draft;

        columns[column.id] = column;
        columnOrder.push(column.id);
        draft.boardEmpty = false;
      })
    );
  });
};

export const onDeleteColumn = component => {
  component.socket.on(DELETE_COLUMN, columnId => {
    component.setState(
      produce(draft => {
        const { columns, items, columnOrder } = draft;
        const itemsToRemove = columns[columnId].itemIds;

        itemsToRemove.forEach(itemId => _.unset(items, itemId));
        _.pull(columnOrder, columnId);
        _.unset(columns, columnId);
      })
    );
  });
};

export const onSortColumn = component => {
  component.socket.on(SORT_COLUMN, (colId, colItems) => {
    const sortedItemIds = [];

    component.setState(
      produce(draft => {
        const sortedItems = _.orderBy(colItems, "points", "desc");

        sortedItems.forEach(item => sortedItemIds.push(item.id));
        draft.columns[colId].itemIds = sortedItemIds;
      })
    );
  });
};
