import isEmpty from "lodash/isEmpty";
import React from "react";
import { RetroCard, RetroColumn } from "../../../types/common.types";
import Column from "./Column";

type ColumnsProps = {
  column: RetroColumn;
  itemMap: {
    [key: string]: RetroCard;
  };
  index: number;
};

function Columns(props: ColumnsProps) {
  const { column, itemMap, index } = props;

  function getItems() {
    let items: RetroCard[];

    if (isEmpty(column)) {
      items = [];
    } else {
      items = column.itemIds.map((id) => itemMap[id]);
    }

    return items;
  }

  return <Column column={column} items={getItems()} index={index} />;
}

export default Columns;
