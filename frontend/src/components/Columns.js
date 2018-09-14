import React from "react";
import isEmpty from "lodash/isEmpty";

import Column from "./Column";

const Columns = (props) => {
  const { column, itemMap, index, itemsCount } = props;

  let items;
  if (isEmpty(column)) {
    items = [];
  } else {
    items = column.itemIds.map(id => itemMap[id]);
  }

  return (
    <Column
      column={column}
      items={items}
      index={index}
      itemsCount={itemsCount}
    />
  );
};

export default Columns;
