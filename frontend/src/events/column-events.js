import _ from "lodash";
import produce from "immer";
import { SORT_COLUMN } from "./event-names";

/* eslint-disable no-param-reassign */
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
