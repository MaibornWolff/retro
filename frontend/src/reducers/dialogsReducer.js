import {
  OPEN_DELETE_ITEM_DIALOG,
  CLOSE_DELETE_ITEM_DIALOG,
  OPEN_DELETE_COLUMN_DIALOG,
  CLOSE_DELETE_COLUMN_DIALOG
} from "../actionTypes/dialogTypes";

export const reducer = (state, action) => {
  switch (action.type) {
    case OPEN_DELETE_ITEM_DIALOG:
      return {
        ...state,
        itemId: action.payload.itemId,
        isDeleteItemDialogOpen: true
      };
    case CLOSE_DELETE_ITEM_DIALOG:
      return {
        ...state,
        itemId: null,
        isDeleteItemDialogOpen: false
      };
    case OPEN_DELETE_COLUMN_DIALOG:
      return {
        ...state,
        columnId: action.payload.columnId,
        isDeleteColumnDialogOpen: true
      };
    case CLOSE_DELETE_COLUMN_DIALOG:
      return {
        ...state,
        columnId: null,
        isDeleteColumnDialogOpen: false
      };
    default:
      return state;
  }
};
