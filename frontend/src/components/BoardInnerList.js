import React from "react";

import BoardColumn from "./BoardColumn";

export default class BoardInnerList extends React.PureComponent {
  render() {
    const { column, itemMap, index, boardItemsCount } = this.props;
    const items = column.itemIds.map(id => itemMap[id]);
    return (
      <BoardColumn
        column={column}
        items={items}
        index={index}
        boardItemsCount={boardItemsCount}
      />
    );
  }
}
