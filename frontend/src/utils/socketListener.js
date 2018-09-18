import _ from "lodash";
import produce from "immer";
import {
  CREATE_CARD,
  CREATE_COLUMN,
  DELETE_COLUMN,
  BOARD_UPDATE,
  UPVOTE_CARD,
  EDIT_CARD,
  SORT_COLUMN,
  DELETE_CARD,
  CREATE_BOARD
} from "./constants";

/* eslint-disable no-param-reassign */
export const onCreateCard = component => {
  component.socket.on(CREATE_CARD, (card, columnId) => {
    component.setState(
      produce(draft => {
        const { items, columns } = draft;

        items[card.id] = card;
        columns[columnId].itemIds.push(card.id);
      })
    );
  });
};

export const onDeleteCard = component => {
  component.socket.on(DELETE_CARD, cardId => {
    component.setState(
      produce(draft => {
        const { items, columns } = draft;

        _.unset(items, cardId);
        _.forIn(columns, col => _.pull(col.itemIds, cardId));
      })
    );
  });
};

export const onEditCard = component => {
  component.socket.on(EDIT_CARD, (cardAuthor, cardContent, cardId) => {
    component.setState(
      produce(draft => {
        const card = draft.items[cardId];

        card.author = cardAuthor;
        card.content = cardContent;
      })
    );
  });
};

export const onUpvoteCard = component => {
  component.socket.on(UPVOTE_CARD, cardId => {
    component.setState(
      produce(draft => {
        draft.items[cardId].points += 1;
      })
    );
  });
};

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

export const onCreateBoard = component => {
  component.socket.on(CREATE_BOARD, newBoard => {
    component.setState({
      ...newBoard,
      boardEmpty: false
    });
  });
};

export const onUpdateBoard = component => {
  component.socket.on(BOARD_UPDATE, newBoard => {
    component.setState({ ...newBoard });
  });
};
