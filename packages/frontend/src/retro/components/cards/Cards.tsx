import React from "react";
import isEmpty from "lodash/isEmpty";
import { Grid } from "@mui/material";

import { Card } from "./Card";
import { RetroColumn } from "../../types/retroTypes";
import { useUserContext } from "../../../common/context/UserContext";

interface ItemsProps {
  column: RetroColumn;
}

function _Cards({ column }: ItemsProps) {
  const { user } = useUserContext();
  if (isEmpty(column.cards)) return null;
  function renderItem() {
    return column.cards.map((card) => {
      const isBlurredAndNotOwned = column.isBlurred && !card.owners.includes(user);
      return (
        <Grid key={card.id} item style={{ width: "100%" }}>
          <Card card={card} isBlurred={isBlurredAndNotOwned} columnIndex={column.index} />
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

export const Cards = React.memo(_Cards);
