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
import { CardAuthors, CardContainer, CardText } from "../../../common/styled-components";

import { ColorThemeContext } from "../../../common/context/ColorThemeContext";
import { RetroCard as RetroCardType } from "../../types/retroTypes";
import { useRetroContext } from "../../context/RetroContext";
import { useUserContext } from "../../../common/context/UserContext";
import { sumVotes } from "../../utils/retroUtils";
import RetroCardActions from "./RetroCardActions";
import TooltipIconButton from "../../../common/TooltipIconButton";
import { isModerator } from "../../../common/utils/participantsUtils";

interface RetroItemProps {
  card: RetroCardType;
  isBlurred: boolean;
  columnIndex: number;
}

const getCardBorderColor = (colorTheme: Theme, theme: Theme) => {
  if (colorTheme.palette.mode === "dark") {
    return theme.palette.secondary.light;
  } else {
    return "lightgrey";
  }
};

function RetroCard({ card, isBlurred, columnIndex }: RetroItemProps) {
  const { isDiscussed, content, owners, id } = card;
  const { retroState, handleHighlightCard, handleUnhighlightCard } = useRetroContext();
  const { user } = useUserContext();
  const { currentTheme } = useContext(ColorThemeContext);
  const theme = useTheme();
  const contentWithLinks = createContentWithLinks(content);

  function createContentWithLinks(content: string) {
    // Regex for matching every kind of URLs
    const urls = /(?:\w+:\/\/[\w.]+|[\w.]+\.\w+).*/.exec(content);

    urls?.forEach((url: string) => {
      const editedUrl = !url.includes("//") ? "https://" + url : url;
      content = content.replace(
        url,
        `<a href="${editedUrl}" target="_blank" style={{    color: theme.palette.primary.main,
    borderBottom: "dashed 1px",
    borderColor: theme.palette.primary.main,
    textDecoration: "none"}}>${url}</a>`
      );
    });

    return content;
  }

  function toggleHighlight() {
    if (retroState.highlightedCardId === id) {
      handleUnhighlightCard({ cardIndex: card.index, columnIndex });
    } else {
      handleHighlightCard({ cardIndex: card.index, columnIndex });
    }
  }

  const highlightedCardStyle =
    retroState.highlightedCardId === id
      ? { border: "4px solid red" }
      : { border: `1px solid ${getCardBorderColor(currentTheme, theme)}` };

  const blurValue = isModerator(user) ? "blur(1px)" : "blur(5px)";
  const totalVotes = sumVotes(card);
  const isVoted = sumVotes(card) > 0;
  const authors = owners.map(({ name }) => name);
  const isSelectableText = !isBlurred || isModerator(user);
  const voteColor = isVoted
    ? theme.palette.primary.contrastText
    : theme.palette.secondary.contrastText;
  const voteBackgroundColor = isVoted ? theme.palette.primary.dark : theme.palette.secondary.dark;

  return (
    <CardContainer>
      <Card
        elevation={20}
        sx={{
          ...highlightedCardStyle,
          filter: isBlurred ? blurValue : undefined,
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
            <Typography variant="body2" component={"span"}>
              <CardAuthors style={{ userSelect: !isSelectableText ? "none" : "auto" }}>
                {authors}
              </CardAuthors>
            </Typography>
          }
          action={
            isModerator(user) && (
              <div style={{ paddingTop: "0.5em", paddingRight: "0.5em" }}>
                <TooltipIconButton
                  tooltipText="Highlight Card"
                  aria-label="Highlight"
                  color="inherit"
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
          <Typography
            sx={{ whiteSpace: "pre-line" }}
            variant="body2"
            color="textSecondary"
            component={"span"}
          >
            <CardText
              style={{ userSelect: isSelectableText ? "auto" : "none" }}
              dangerouslySetInnerHTML={{ __html: contentWithLinks }}
            />
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {isDiscussed ? <Chip label={"Discussed"} variant="outlined" size={"small"} /> : null}
          </div>
          <RetroCardActions card={card} columnIndex={columnIndex} isBlurred={isBlurred} />
        </CardActions>
      </Card>
    </CardContainer>
  );
}

export default React.memo(RetroCard);
