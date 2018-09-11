import React from "react";

import Item from "./Item";

export default class Items extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { items } = this.props;
    if (nextProps.items === items) return false;
    return true;
  }

  render() {
    const { items } = this.props;
    return items.map((item, i) => (
      <Item key={item.id} item={item} index={i} />
    ));
  }
}
