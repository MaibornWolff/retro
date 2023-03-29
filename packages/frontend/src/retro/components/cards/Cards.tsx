import React from "react";
import isEmpty from "lodash/isEmpty";

import { Card } from "./Card";
import { RetroColumn } from "../../types/retroTypes";
import { useUserContext } from "../../../common/context/UserContext";

interface ItemsProps {
  column: RetroColumn;
}

function _Cards({ column }: ItemsProps) {
  const { user } = useUserContext();
  if (isEmpty(column.cards)) return null;

  return (
    <>
      {column.cards.map((card) => {
        const isBlurredAndNotOwned = column.isBlurred && !card.owners.includes(user);
        return (
          <Card
            key={card.id}
            card={card}
            isBlurred={isBlurredAndNotOwned}
            columnIndex={column.index}
          />
        );
      })}
    </>
  );
}

export const Cards = React.memo(_Cards);
