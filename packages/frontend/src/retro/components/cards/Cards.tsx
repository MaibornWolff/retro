import React from "react";
import isEmpty from "lodash/isEmpty";
import { Grid } from "@mui/material";

import Card from "./Card";
import { RetroColumn } from "../../types/retroTypes";

interface ItemsProps {
  column: RetroColumn;
}

function Cards({ column }: ItemsProps) {
  if (isEmpty(column.cards)) return null;

  function renderItem() {
    return column.cards.map((card) => {
      return (
        <Grid key={card.id} item style={{ width: "100%" }}>
          <Card card={card} isBlurred={column.isBlurred} columnIndex={column.index} />
        </Grid>
      );
    });
  }

  return (
    <Grid container direction="column">
      {renderItem()}
    </Grid>
  );
}

export default React.memo(Cards);
