import React from "react";

import BoardItem from "./BoardItem";

export default class InnerList extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { items } = this.props;
    if (nextProps.items === items) return false;
    return true;
  }

  render() {
    const { items } = this.props;
    return items.map((item, i) => (
      <BoardItem key={item.id} item={item} index={i} />
    ));
  }
}
