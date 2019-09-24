import React, { useReducer } from "react";

import { reducer } from "../reducers/dialogsReducer";
import {
  OPEN_DELETE_ITEM_DIALOG,
  CLOSE_DELETE_ITEM_DIALOG,
  OPEN_DELETE_COLUMN_DIALOG,
  CLOSE_DELETE_COLUMN_DIALOG,
  OPEN_EDIT_ITEM_DIALOG,
  CLOSE_EDIT_ITEM_DIALOG
} from "../actionTypes/dialogTypes";

const initialState = {
  itemId: null,
  columnId: null,
  itemAuthor: "",
  itemContent: "",
  isDeleteItemDialogOpen: false,
  isDeleteColumnDialogOpen: false,
  isEditItemDialogOpen: false
};

export const DialogsContext = React.createContext();

export const DialogsContextProvider = props => {
  const [dialogsState, dispatch] = useReducer(reducer, initialState);

  const openDeleteItemDialog = itemId => {
    dispatch({ type: OPEN_DELETE_ITEM_DIALOG, payload: { itemId } });
  };

  const closeDeleteItemDialog = () => {
    dispatch({ type: CLOSE_DELETE_ITEM_DIALOG });
  };

  const openDeleteColumnDialog = columnId => {
    dispatch({ type: OPEN_DELETE_COLUMN_DIALOG, payload: { columnId } });
  };

  const closeDeleteColumnDialog = () => {
    dispatch({ type: CLOSE_DELETE_COLUMN_DIALOG });
  };

  const openEditItemDialog = (itemId, itemAuthor, itemContent) => {
    dispatch({
      type: OPEN_EDIT_ITEM_DIALOG,
      payload: { itemId, itemAuthor, itemContent }
    });
  };

  const closeEditItemDialog = () => {
    dispatch({ type: CLOSE_EDIT_ITEM_DIALOG });
  };

  const value = {
    dialogsState,
    openDeleteItemDialog,
    closeDeleteItemDialog,
    openDeleteColumnDialog,
    closeDeleteColumnDialog,
    openEditItemDialog,
    closeEditItemDialog
  };

  return (
    <DialogsContext.Provider value={value}>
      {props.children}
    </DialogsContext.Provider>
  );
};
