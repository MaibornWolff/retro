import React from "react";
import isEmpty from "lodash/isEmpty";

import Column from "./Column";

class Columns extends React.PureComponent {
  getItems(column, itemMap) {
    let items;

    if (isEmpty(column)) {
      items = [];
    } else {
      items = column.itemIds.map(id => itemMap[id]);
    }

    return items;
  }

  render() {
    const { column, itemMap, index, boardId, openSnackbar } = this.props;
    const items = this.getItems(column, itemMap);

    return (
      <Column
        column={column}
        items={items}
        index={index}
        boardId={boardId}
        openSnackbar={openSnackbar}
      />
    );
  }
}

export default Columns;
