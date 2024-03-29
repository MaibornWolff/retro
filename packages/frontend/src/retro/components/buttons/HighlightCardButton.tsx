import { Highlight, HighlightOutlined } from "@mui/icons-material";
import { TooltipIconButton } from "../../../common/components/buttons/TooltipIconButton";
import React from "react";
import { useRetroContext } from "../../context/RetroContext";
import { RetroCard } from "../../types/retroTypes";

interface CardPosition {
  columnIndex: number;
  cardIndex: number;
}

interface HighlightCardButtonProps {
  handleHighlightCard: (position: CardPosition) => void;
  handleUnhighlightCard: (position: CardPosition) => void;
  card: RetroCard;
  columnIndex: number;
}

export function HighlightCardButton({
  handleHighlightCard,
  handleUnhighlightCard,
  card,
  columnIndex,
}: HighlightCardButtonProps) {
  const { retroState } = useRetroContext();

  function toggleHighlight() {
    if (retroState.highlightedCardId === card.id) {
      handleUnhighlightCard({ cardIndex: card.index, columnIndex });
    } else {
      handleHighlightCard({ cardIndex: card.index, columnIndex });
    }
  }

  return (
    <TooltipIconButton
      tooltipText="Highlight Card"
      aria-label="Highlight"
      onClick={toggleHighlight}
    >
      {retroState.highlightedCardId === card.id ? <Highlight /> : <HighlightOutlined />}
    </TooltipIconButton>
  );
}
