import React from "react";
import isEmpty from "lodash/isEmpty";

import Column from "./Column";

function Columns(props) {
  const { column, itemMap, index, openSnackbar } = props;

  function getItems() {
    let items;

    if (isEmpty(column)) {
      items = [];
    } else {
      items = column.itemIds.map(id => itemMap[id]);
    }

    return items;
  }

  return <Column column={column} items={getItems()} index={index} openSnackbar={openSnackbar} />;
}

export default Columns;
