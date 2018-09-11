import React from "react";

import BoardColumn from "./BoardColumn";

const ColumnContainer = (props) => {
  const { column, itemMap, index, boardItemsCount } = props;
  const items = column.itemIds.map(id => itemMap[id]);
  
  return (
    <BoardColumn
      column={column}
      items={items}
      index={index}
      boardItemsCount={boardItemsCount}
    />
  );
};

export default ColumnContainer;
