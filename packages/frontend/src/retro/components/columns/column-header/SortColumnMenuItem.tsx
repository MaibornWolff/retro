import React from "react";
import { Sort } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { RetroColumn } from "../../../types/retroTypes";
import { useRetroContext } from "../../../context/RetroContext";

interface SortColumnMenuItemProps {
  column: RetroColumn;
}

const SortColumnMenuItem = React.forwardRef(({ column }: SortColumnMenuItemProps, ref: any) => {
  const { handleSortCardsByVotesDescending } = useRetroContext();
  function sortByVotesDescending() {
    handleSortCardsByVotesDescending(column.index);
  }

  return (
    <>
      <MenuItem ref={ref} onClick={sortByVotesDescending}>
        <ListItemIcon>
          <Sort fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Sort Column" />
      </MenuItem>
    </>
  );
});

export default SortColumnMenuItem;
