import React from "react";

import Column from "./Column";

const Columns = (props) => {
  const { column, itemMap, index, itemsCount } = props;
  const items = column.itemIds.map(id => itemMap[id]);

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
