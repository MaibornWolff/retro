import { RetroCard, RetroColumn, VotesByUserId } from "../types/retroTypes";
import { DropResult } from "react-beautiful-dnd";
import { find, remove, replace, replaceColumns } from "../utils/retroUtils";
import { useState } from "react";
import { useRetroContext } from "../context/RetroContext";
import { User } from "../../common/types/commonTypes";
import { uniqBy } from "lodash";

interface UseMergeCardsOptions {
  mergeResult?: DropResult;
}

export function useMergeCards({ mergeResult }: UseMergeCardsOptions) {
  const [isMergeDialogOpen, setMergeDialog] = useState(false);
  const { retroState, handleSetRetroState } = useRetroContext();
  const { columns } = retroState;

  function handleMergeCards() {
    if (!mergeResult) return;
    const { toColumn, fromColumn, draggedCard, draggedOnCard, mergedCard } =
      extractMergeInfo(mergeResult);
    if (!draggedCard || !draggedOnCard || !fromColumn || !toColumn || !mergedCard) return;

    const columns = getNewColumns({ fromColumn, toColumn, draggedCard, draggedOnCard, mergedCard });

    handleSetRetroState({
      ...retroState,
      columns,
      highlightedCardId: getMergedHighlightedCard(draggedCard, draggedOnCard),
    });
  }

  function getMergedHighlightedCard(draggedCard: RetroCard, draggedOnCard: RetroCard) {
    return draggedCard.id === retroState.highlightedCardId
      ? draggedOnCard.id
      : retroState.highlightedCardId;
  }

  function openMergeDialog() {
    setMergeDialog(true);
  }

  function closeMergeDialog() {
    setMergeDialog(false);
  }

  function mergeOwners(owners1: User[], owners2: User[]) {
    const mergedOwners = [...owners1, ...owners2];
    return uniqBy(mergedOwners, (owner) => owner.id);
  }

  function mergeCards(card1?: RetroCard, card2?: RetroCard): RetroCard | undefined {
    if (!card1 || !card2) return;
    return {
      ...card1,
      content: `${card1.content}\n===\n${card2.content}`,
      votes: mergeVotes(card1.votes, card2.votes),
      isDiscussed: card1.isDiscussed || card2.isDiscussed,
      owners: mergeOwners(card1.owners, card2.owners),
    };
  }

  function mergeVotes(votes1: VotesByUserId, votes2: VotesByUserId) {
    const mergedVotes = { ...votes1 };
    Object.entries(votes2).forEach(([userId, votes]) => {
      mergedVotes[userId] = (votes1[userId] ?? 0) + (votes ?? 0);
    });
    return mergedVotes;
  }

  function extractMergeInfo(dragResult: DropResult) {
    const { combine, source } = dragResult;

    const fromColumn = find(columns, source?.droppableId);
    const toColumn = find(columns, combine?.droppableId);
    const draggedCard = fromColumn?.cards[source.index];
    const draggedOnCard = find(toColumn?.cards, combine?.draggableId);
    const mergedCard = mergeCards(draggedOnCard, draggedCard);

    return {
      fromColumn,
      toColumn,
      draggedCard,
      draggedOnCard,
      mergedCard,
    };
  }

  function getNewColumnsAfterMerge({
    fromColumn,
    toColumn,
    draggedOnCard,
    draggedCard,
    mergedCard,
  }: {
    fromColumn: RetroColumn;
    toColumn: RetroColumn;
    draggedOnCard: RetroCard;
    draggedCard: RetroCard;
    mergedCard: RetroCard;
  }) {
    const newFromColumn: RetroColumn = {
      ...fromColumn,
      cards: remove(fromColumn.cards, draggedCard.index),
    };

    const newToColumn: RetroColumn = {
      ...toColumn,
      cards: replace(toColumn.cards, draggedOnCard.index, mergedCard),
    };

    return [newFromColumn, newToColumn];
  }

  function getNewColumnAfterMerge({
    column,
    draggedOnCard,
    draggedCard,
    mergedCard,
  }: {
    column: RetroColumn;
    draggedOnCard: RetroCard;
    draggedCard: RetroCard;
    mergedCard: RetroCard;
  }) {
    const cardsWithMergedCard = replace(column.cards, draggedOnCard.index, mergedCard);
    return {
      ...column,
      cards: remove(cardsWithMergedCard, draggedCard.index),
    };
  }

  function getNewColumns({
    fromColumn,
    toColumn,
    draggedOnCard,
    draggedCard,
    mergedCard,
  }: {
    fromColumn: RetroColumn;
    toColumn: RetroColumn;
    draggedOnCard: RetroCard;
    draggedCard: RetroCard;
    mergedCard: RetroCard;
  }) {
    if (fromColumn.id === toColumn.id) {
      const newColumn = getNewColumnAfterMerge({
        column: fromColumn,
        draggedCard,
        draggedOnCard,
        mergedCard,
      });
      return replace(retroState.columns, fromColumn.index, newColumn);
    } else {
      const newColumns = getNewColumnsAfterMerge({
        fromColumn,
        toColumn,
        draggedCard,
        draggedOnCard,
        mergedCard,
      });
      return replaceColumns(retroState.columns, newColumns);
    }
  }

  return { openMergeDialog, closeMergeDialog, isMergeDialogOpen, handleMergeCards };
}
