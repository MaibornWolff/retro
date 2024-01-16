import React, { Ref } from "react";
import { Sort } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { RetroColumn } from "../../../types/retroTypes";
import { useRetroContext } from "../../../context/RetroContext";

interface SortColumnMenuItemProps {
  column: RetroColumn;
}

export const SortColumnMenuItem = React.forwardRef(
  ({ column }: SortColumnMenuItemProps, ref: Ref<HTMLLIElement>) => {
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
  },
);
