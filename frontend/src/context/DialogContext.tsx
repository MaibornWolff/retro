import React, { useReducer } from "react";
import {
  CLOSE_CREATE_ITEM_DIALOG,
  CLOSE_DELETE_COLUMN_DIALOG,
  CLOSE_DELETE_ITEM_DIALOG,
  CLOSE_EDIT_COLUMN_DIALOG,
  CLOSE_EDIT_ITEM_DIALOG,
  CLOSE_RETRO_ITEM_DETAIL_DIALOG,
  OPEN_CREATE_ITEM_DIALOG,
  OPEN_DELETE_COLUMN_DIALOG,
  OPEN_DELETE_ITEM_DIALOG,
  OPEN_EDIT_COLUMN_DIALOG,
  OPEN_EDIT_ITEM_DIALOG,
  OPEN_RETRO_ITEM_DETAIL_DIALOG,
} from "../actions/dialog.actions";
import { reducer } from "../reducers/dialog.reducer";
import { DialogContextValues } from "../types/context.types";

const initialState = {
  itemId: null,
  columnId: null,
  itemAuthor: "",
  itemContent: "",
  columnTitle: "",
  comments: null,
  author: "",
  isDeleteItemDialogOpen: false,
  isDeleteColumnDialogOpen: false,
  isEditItemDialogOpen: false,
  isEditColumnDialogOpen: false,
  isCreateItemDialogOpen: false,
  isRetroItemDetailDialogOpen: false,
};

type DialogContextProviderProps = {
  children?: React.ReactNode;
};

export const DialogsContext = React.createContext<DialogContextValues>(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  undefined!
);

export default function DialogContextProvider(
  props: DialogContextProviderProps
) {
  const [dialogsState, dispatch] = useReducer(reducer, initialState);

  function openDeleteItemDialog(itemId: string) {
    dispatch({ type: OPEN_DELETE_ITEM_DIALOG, payload: { itemId } });
  }

  function closeDeleteItemDialog() {
    dispatch({ type: CLOSE_DELETE_ITEM_DIALOG });
  }

  function openDeleteColumnDialog(columnId: string) {
    dispatch({ type: OPEN_DELETE_COLUMN_DIALOG, payload: { columnId } });
  }

  function closeDeleteColumnDialog() {
    dispatch({ type: CLOSE_DELETE_COLUMN_DIALOG });
  }

  function openEditItemDialog(
    itemId: string,
    itemAuthor: string,
    itemContent: string
  ) {
    dispatch({
      type: OPEN_EDIT_ITEM_DIALOG,
      payload: { itemId, itemAuthor, itemContent },
    });
  }

  function closeEditItemDialog() {
    dispatch({ type: CLOSE_EDIT_ITEM_DIALOG });
  }

  function openEditColumnDialog(columnId: string, columnTitle: string) {
    dispatch({
      type: OPEN_EDIT_COLUMN_DIALOG,
      payload: { columnId, columnTitle },
    });
  }

  function closeEditColumnDialog() {
    dispatch({ type: CLOSE_EDIT_COLUMN_DIALOG });
  }

  function openCreateItemDialog(columnId: string, itemAuthor: string) {
    dispatch({
      type: OPEN_CREATE_ITEM_DIALOG,
      payload: { columnId, itemAuthor },
    });
  }

  function closeCreateItemDialog() {
    dispatch({ type: CLOSE_CREATE_ITEM_DIALOG });
  }

  function openRetroItemDetailDialog(
    itemId: string,
    author: string,
    itemAuthor: string,
    itemContent: string
  ) {
    dispatch({
      type: OPEN_RETRO_ITEM_DETAIL_DIALOG,
      payload: { itemId, author, itemAuthor, itemContent },
    });
  }

  function closeRetroItemDetailDialog() {
    dispatch({ type: CLOSE_RETRO_ITEM_DETAIL_DIALOG });
  }

  const value = {
    dialogsState,
    openDeleteItemDialog,
    openDeleteColumnDialog,
    openEditItemDialog,
    openEditColumnDialog,
    openCreateItemDialog,
    closeDeleteItemDialog,
    closeDeleteColumnDialog,
    closeEditItemDialog,
    closeEditColumnDialog,
    closeCreateItemDialog,
    openRetroItemDetailDialog,
    closeRetroItemDetailDialog,
  };

  return (
    <DialogsContext.Provider value={value}>
      {props.children}
    </DialogsContext.Provider>
  );
}
