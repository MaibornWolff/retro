import React from "react";
import isEmpty from "lodash/isEmpty";
import { Grid } from "@material-ui/core";

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
    return (
      <Grid container direction="column">
        {items.map((item, i) => (
          <Grid key={item.id} item>
            <Item item={item} index={i} boardId={boardId} />
          </Grid>
        ))}
      </Grid>
    );
  }
}
