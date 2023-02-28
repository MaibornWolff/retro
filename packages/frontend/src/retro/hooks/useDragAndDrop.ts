import { useRef } from "react";
import { DraggableLocation, DropResult } from "react-beautiful-dnd";
import { find, insertCard, move, remove, replaceColumns } from "../utils/retroUtils";
import { RetroColumn, RetroState } from "../types/retroTypes";
import { useMergeCards } from "./useMergeCards";
import { useRetroContext } from "../context/RetroContext";

export function useDragAndDrop() {
  const mergeResult = useRef<DropResult>();

  const { retroState, handleSetRetroState } = useRetroContext();
  const { columns } = retroState;
  const { openMergeDialog, closeMergeDialog, isMergeDialogOpen, handleMergeCards } = useMergeCards({
    mergeResult: mergeResult.current,
  });

  function onDragEnd(dragResult: DropResult) {
    const { source, destination, type, combine } = dragResult;

    if (combine) {
      mergeResult.current = dragResult;
      openMergeDialog();
      return;
    }
    if (!destination || isSamePosition(source, destination)) return;
    if (type === "column") {
      handleColumnDrag(dragResult);
      return;
    }

    if (source.droppableId === destination.droppableId) {
      handleInsideColumnDrag(dragResult);
      return;
    }

    handleNormalDrag(dragResult);
  }

  function handleNormalDrag(dragResult: DropResult) {
    const { source, destination } = dragResult;
    if (!destination) return;

    const fromColumn = find(columns, source.droppableId);
    const toColumn = find(columns, destination.droppableId);
    if (!fromColumn || !toColumn) return;

    const movedCard = fromColumn.cards[source.index];
    if (!movedCard) return;

    const newFromColumn: RetroColumn = {
      ...fromColumn,
      cards: remove(fromColumn.cards, source.index),
    };

    const newToCards = insertCard(toColumn.cards, movedCard, destination.index);
    const newToColumn: RetroColumn = {
      ...toColumn,
      cards: newToCards,
    };

    const newRetro: RetroState = {
      ...retroState,
      columns: replaceColumns(retroState.columns, [newFromColumn, newToColumn]),
    };

    handleSetRetroState(newRetro);
  }

  function handleInsideColumnDrag(dragResult: DropResult) {
    const { source, destination } = dragResult;
    if (!destination) return;

    const startColumn = find(columns, source.droppableId);
    if (!startColumn) return;
    const newCards = move(startColumn.cards, source.index, destination.index);

    const newColumn: RetroColumn = { ...startColumn, cards: newCards };
    const newRetro: RetroState = {
      ...retroState,
      columns: replaceColumns(retroState.columns, [newColumn]),
    };

    handleSetRetroState(newRetro);
  }

  function handleColumnDrag(dragResult: DropResult) {
    const { source, destination } = dragResult;
    if (!destination) return;

    const newRetro: RetroState = {
      ...retroState,
      columns: move(retroState.columns, source.index, destination.index),
    };

    handleSetRetroState(newRetro);
  }

  const isSamePosition = (source: DraggableLocation, destination: DraggableLocation) => {
    return destination.droppableId === source.droppableId && destination.index === source.index;
  };

  return {
    isMergeDialogOpen,
    openMergeDialog,
    closeMergeDialog,
    handleMergeCards,
    onDragEnd,
  };
}
