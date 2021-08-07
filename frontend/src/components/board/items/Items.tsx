import React, { useContext } from "react";
import isEmpty from "lodash/isEmpty";
import { Grid } from "@material-ui/core";

import Item from "./Item";
import { BoardContext } from "../../../context/BoardContext";
import { hasVotedFor } from "../../../utils/user.utils";
import { RetroCard } from "../../../types/common.types";

type ItemsProps = {
  items: RetroCard[];
};

function Items(props: ItemsProps) {
  const { items } = props;
  const { boardId } = useContext(BoardContext);

  function isVoted(cardId: string) {
    return hasVotedFor(cardId, boardId);
  }

  function renderItem() {
    return items.map((item, i) => {
      return (
        <Grid key={item.id} item style={{ width: "100%" }}>
          <Item item={item} index={i} isVoted={isVoted(item.id)} />
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
