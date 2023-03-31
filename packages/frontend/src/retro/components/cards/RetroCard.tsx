import React, { useContext } from "react";
import {
  Avatar,
  Box,
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
import { HighlightCardButton } from "../buttons/HighlightCardButton";

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
  const authors = owners.map(({ name }) => name);
  const isSelectableText = !isBlurred || isModerator(user);
  const blurValue = isModerator(user) ? "blur(1px)" : "blur(5px)";
  const totalVotes = sumVotes(card);
  const isVoted = sumVotes(card) > 0;
  const voteBackgroundColor = isVoted ? theme.palette.secondary.main : theme.palette.primary.main;
  const voteColor = isVoted
    ? theme.palette.secondary.contrastText
    : theme.palette.primary.contrastText;
  const highlightedCardStyle =
    retroState.highlightedCardId === id
      ? { border: "1px solid red" }
      : { border: `1px solid ${getCardBorderColor(currentTheme, theme)}` };

  return (
    <Card
      elevation={5}
      sx={{
        ...highlightedCardStyle,
        filter: isBlurred ? blurValue : undefined,
        borderRadius: theme.spacing(2),
        my: 1,
      }}
    >
      <CardHeader
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
            sx={{
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
            <HighlightCardButton
              card={card}
              columnIndex={columnIndex}
              handleHighlightCard={handleHighlightCard}
              handleUnhighlightCard={handleUnhighlightCard}
            />
          )
        }
      />
      <Divider />
      <CardContent>
        <Typography whiteSpace="pre-line" variant="body2" component="span">
          <CardText isSelectable={isSelectableText} withHyperlinks={true} text={content} />
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          {isDiscussed ? <Chip label="Discussed" variant="outlined" size="small" /> : undefined}
        </Box>
        <RetroCardActions card={card} columnIndex={columnIndex} isBlurred={isBlurred} />
      </CardActions>
    </Card>
  );
}

export const RetroCard = React.memo(_RetroCard);
