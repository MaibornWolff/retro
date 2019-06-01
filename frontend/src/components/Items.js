import React, { useContext } from "react";
import isEmpty from "lodash/isEmpty";
import { Grid } from "@material-ui/core";

import Item from "./Item";
import { hasVotedFor } from "../utils/userUtils";
import { BoardContext } from "./context/BoardContext";

function Items(props) {
  const { items, openSnackbar } = props;
  const boardId = useContext(BoardContext);

  function isVoted(cardId) {
    return hasVotedFor(cardId, boardId);
  }

  function renderItem() {
    return items.map((item, i) => {
      return (
        <Grid key={item.id} item>
          <Item
            item={item}
            index={i}
            openSnackbar={openSnackbar}
            isVoted={isVoted(item.id)}
          />
        </Grid>
      );
    });
  }

  if (isEmpty(items)) return null;

  return (
    <Grid container direction="column">
      {renderItem()}
    </Grid>
  );
}

export default React.memo(Items);
