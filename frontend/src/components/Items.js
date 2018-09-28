import React from "react";
import isEmpty from "lodash/isEmpty";

import Item from "./Item";

export default class Items extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { items } = this.props;
    if (nextProps.items === items) return false;
    return true;
  }

  render() {
    const { items, boardId } = this.props;

    if (isEmpty(items)) return null;
    return items.map((item, i) => (
      <Item key={item.id} item={item} index={i} boardId={boardId} />
    ));
  }
}
