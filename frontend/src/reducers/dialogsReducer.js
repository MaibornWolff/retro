import {
  OPEN_DELETE_ITEM_DIALOG,
  CLOSE_DELETE_ITEM_DIALOG
} from "../actionTypes/dialogTypes";

export const reducer = (state, action) => {
  switch (action.type) {
    case OPEN_DELETE_ITEM_DIALOG:
      return {
        ...state,
        itemId: action.payload.itemId,
        openDeleteDialog: true
      };
    case CLOSE_DELETE_ITEM_DIALOG:
      return {
        ...state,
        itemId: null,
        openDeleteDialog: false
      };
    default:
      return state;
  }
};
