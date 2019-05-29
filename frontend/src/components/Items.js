import React from "react";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import { Grid } from "@material-ui/core";

import Item from "./Item";
import { hasVotedFor } from "../utils/roleHandlers";

export default class Items extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (isEqual(nextProps.items, this.props.items)) {
      return false;
    }
    return true;
  }

  isVoted(cardId) {
    return hasVotedFor(cardId, this.props.boardId);
  }

  renderItem(items, boardId, openSnackbar) {
    return items.map((item, i) => {
      return (
        <Grid key={item.id} item>
          <Item
            item={item}
            index={i}
            boardId={boardId}
            openSnackbar={openSnackbar}
            isVoted={this.isVoted(item.id)}
          />
        </Grid>
      );
    });
  }

  render() {
    const { items, boardId, openSnackbar } = this.props;

    if (isEmpty(items)) return null;
    return (
      <Grid container direction="column">
        {this.renderItem(items, boardId, openSnackbar)}
      </Grid>
    );
  }
}
