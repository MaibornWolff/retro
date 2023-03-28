import React, { useContext } from "react";
import { Highlight, HighlightOutlined } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";

import { ColorThemeContext } from "../../../common/context/ColorThemeContext";
import { RetroCard as RetroCardType } from "../../types/retroTypes";
import { useRetroContext } from "../../context/RetroContext";
import { useUserContext } from "../../../common/context/UserContext";
import { sumVotes } from "../../utils/retroUtils";
import { RetroCardActions } from "./RetroCardActions";
import { isModerator } from "../../../common/utils/participantsUtils";
import { CardText } from "../../../poker/components/cards/CardText";
import { TooltipIconButton } from "../../../common/components/buttons/TooltipIconButton";

interface RetroItemProps {
  card: RetroCardType;
  isBlurred: boolean;
  columnIndex: number;
}

const getCardBorderColor = (colorTheme: Theme, theme: Theme) => {
  if (colorTheme.palette.mode === "dark") {
    return theme.palette.background.default;
  } else {
    return "lightgrey";
  }
};

function _RetroCard({ card, isBlurred, columnIndex }: RetroItemProps) {
  const { isDiscussed, content, owners, id } = card;
  const { retroState, handleHighlightCard, handleUnhighlightCard } = useRetroContext();
  const { user } = useUserContext();
  const { currentTheme } = useContext(ColorThemeContext);
  const theme = useTheme();

  function toggleHighlight() {
    if (retroState.highlightedCardId === id) {
      handleUnhighlightCard({ cardIndex: card.index, columnIndex });
    } else {
      handleHighlightCard({ cardIndex: card.index, columnIndex });
    }
  }

  const highlightedCardStyle =
    retroState.highlightedCardId === id
      ? { border: "1px solid red" }
      : { border: `1px solid ${getCardBorderColor(currentTheme, theme)}` };

  const blurValue = isModerator(user) ? "blur(1px)" : "blur(5px)";
  const totalVotes = sumVotes(card);
  const isVoted = sumVotes(card) > 0;
  const authors = owners.map(({ name }) => name);
  const isSelectableText = !isBlurred || isModerator(user);
  const voteColor = isVoted
    ? theme.palette.secondary.contrastText
    : theme.palette.primary.contrastText;
  const voteBackgroundColor = isVoted ? theme.palette.secondary.main : theme.palette.primary.main;

  return (
    <div style={{ marginBottom: "1em" }}>
      <Card
        elevation={5}
        sx={{
          ...highlightedCardStyle,
          filter: isBlurred ? blurValue : undefined,
          borderRadius: "15px",
        }}
      >
        <CardHeader
          sx={{ padding: "8px" }}
          avatar={
            <Avatar
              sx={{ color: voteColor, backgroundColor: voteBackgroundColor }}
              aria-label="number of votes"
            >
              {totalVotes}
            </Avatar>
          }
          title={
            <Typography
              variant="body2"
              style={{
                userSelect: !isSelectableText ? "none" : "auto",
                maxWidth: "15vw",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {authors}
            </Typography>
          }
          action={
            isModerator(user) && (
              <div style={{ paddingTop: "0.5em", paddingRight: "0.5em" }}>
                <TooltipIconButton
                  tooltipText="Highlight Card"
                  aria-label="Highlight"
                  onClick={toggleHighlight}
                >
                  {retroState.highlightedCardId === id ? <Highlight /> : <HighlightOutlined />}
                </TooltipIconButton>
              </div>
            )
          }
        />
        <Divider />
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }} variant="body2" component="span">
            <CardText isSelectable={isSelectableText} withHyperlinks={true} text={content} />
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {isDiscussed ? <Chip label="Discussed" variant="outlined" size="small" /> : null}
          </div>
          <RetroCardActions card={card} columnIndex={columnIndex} isBlurred={isBlurred} />
        </CardActions>
      </Card>
    </div>
  );
}

export const RetroCard = React.memo(_RetroCard);
