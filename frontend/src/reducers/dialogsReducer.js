import {
  OPEN_DELETE_ITEM_DIALOG,
  CLOSE_DELETE_ITEM_DIALOG,
  OPEN_DELETE_COLUMN_DIALOG,
  CLOSE_DELETE_COLUMN_DIALOG,
  OPEN_EDIT_ITEM_DIALOG,
  CLOSE_EDIT_ITEM_DIALOG,
  OPEN_EDIT_COLUMN_DIALOG,
  CLOSE_EDIT_COLUMN_DIALOG,
  OPEN_CREATE_ITEM_DIALOG,
  CLOSE_CREATE_ITEM_DIALOG
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
    case OPEN_EDIT_ITEM_DIALOG:
      return {
        ...state,
        itemId: action.payload.itemId,
        itemAuthor: action.payload.itemAuthor,
        itemContent: action.payload.itemContent,
        isEditItemDialogOpen: true
      };
    case CLOSE_EDIT_ITEM_DIALOG:
      return {
        ...state,
        itemId: null,
        itemAuthor: "",
        itemContent: "",
        isEditItemDialogOpen: false
      };
    case OPEN_EDIT_COLUMN_DIALOG:
      return {
        ...state,
        columnId: action.payload.columnId,
        columnTitle: action.payload.columnTitle,
        isEditColumnDialogOpen: true
      };
    case CLOSE_EDIT_COLUMN_DIALOG:
      return {
        ...state,
        columnId: null,
        columnTitle: "",
        isEditColumnDialogOpen: false
      };
    case OPEN_CREATE_ITEM_DIALOG:
      return {
        ...state,
        columnId: action.payload.columnId,
        itemAuthor: action.payload.itemAuthor,
        isCreateItemDialogOpen: true
      };
    case CLOSE_CREATE_ITEM_DIALOG:
      return {
        ...state,
        columnId: null,
        itemAuthor: "",
        isCreateItemDialogOpen: false
      };
    default:
      return state;
  }
};
