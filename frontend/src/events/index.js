import { onCreateBoard, onUpdateBoard } from "./board-events";
import { onCreateColumn, onDeleteColumn, onSortColumn } from "./column-events";
import {
  onCreateCard,
  onEditCard,
  onDeleteCard,
  onUpvoteCard
} from "./card-events";

export const onBoardEvents = component => {
  onCreateBoard(component);
  onUpdateBoard(component);
};

export const onColumnEvents = component => {
  onCreateColumn(component);
  onDeleteColumn(component);
  onSortColumn(component);
};

export const onCardEvents = component => {
  onCreateCard(component);
  onEditCard(component);
  onDeleteCard(component);
  onUpvoteCard(component);
};
