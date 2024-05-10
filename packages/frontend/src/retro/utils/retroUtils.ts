import { RetroCard, RetroColumn, VotesByUserId } from "../types/retroTypes";
import { sum } from "lodash";

export function find<T extends { id: string }>(list?: T[], id?: string) {
  if (id === undefined) return;
  return list?.find((item) => item.id === id);
}

export function replaceColumns(oldColumns: RetroColumn[], newColumns: RetroColumn[]) {
  if (newColumns.length === 0) return oldColumns;

  return oldColumns.map((column) => {
    const newColumn = newColumns.find((newColumn) => newColumn.id === column.id);
    if (newColumn) return newColumn;
    return column;
  });
}

export function sumVotes(votes: VotesByUserId): number {
  return sum(Object.values(votes));
}

export function insertCard(cards: RetroCard[], card: RetroCard, index: number): RetroCard[] {
  return updateIndices([...cards.slice(0, index), card, ...cards.slice(index)]);
}

export function remove<T extends { index: number }>(list: T[], index: number): T[] {
  return updateIndices([...list.slice(0, index), ...list.slice(index + 1)]);
}

export function move<T extends { index: number }>(
  list: T[],
  fromIndex: number,
  toIndex: number,
): T[] {
  const movedItem = list[fromIndex];
  if (!movedItem) return list;
  const copiedList = [...list];

  copiedList.splice(fromIndex, 1);
  copiedList.splice(toIndex, 0, movedItem);

  return updateIndices(copiedList);
}

export function replace<T extends { index: number }>(list: T[], index: number, value: T): T[] {
  return [...list.slice(0, index), value, ...list.slice(index + 1)];
}

export function insertCardIntoColumn(
  columns: RetroColumn[],
  card: RetroCard,
  columnIndex: number,
): RetroColumn[] {
  const column = columns[columnIndex];
  if (!column) return columns;
  const newCards = [...column.cards, card];
  const newColumn: RetroColumn = { ...column, cards: newCards };
  return replace(columns, columnIndex, newColumn);
}

export function removeCardFromColumn(
  columns: RetroColumn[],
  cardIndex: number,
  columnIndex: number,
): RetroColumn[] {
  const column = columns[columnIndex];
  if (!column) return columns;
  const cards = remove(column.cards, cardIndex);
  const newColumn: RetroColumn = { ...column, cards };
  return replace(columns, columnIndex, newColumn);
}

export function replaceCardInColumn(
  columns: RetroColumn[],
  cardIndex: number,
  columnIndex: number,
  card: RetroCard,
): RetroColumn[] {
  const column = columns[columnIndex];
  if (!column) return columns;
  const cards = replace(column.cards, cardIndex, card);
  const newColumn: RetroColumn = { ...column, cards };
  return replace(columns, columnIndex, newColumn);
}

export function replaceCardContent(
  columns: RetroColumn[],
  cardIndex: number,
  columnIndex: number,
  cardContent: string,
): RetroColumn[] {
  const column = columns[columnIndex];
  const card = column?.cards[cardIndex];
  if (!card) return columns;
  const updatedCard: RetroCard = { ...card, content: cardContent };
  const cards = replace(column.cards, cardIndex, updatedCard);
  const newColumn: RetroColumn = { ...column, cards };
  return replace(columns, columnIndex, newColumn);
}

function updateIndices<T extends { index: number }>(list: T[]) {
  return list.map((item, index) => {
    return { ...item, index };
  });
}
