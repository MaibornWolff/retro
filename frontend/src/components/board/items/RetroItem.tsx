import React, {
  Fragment,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import HighlightIcon from "@material-ui/icons/Highlight";
import HighlightOutlinedIcon from "@material-ui/icons/HighlightOutlined";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Badge,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CommentIcon from "@material-ui/icons/Comment";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  FOCUS_CARD,
  REMOVE_FOCUS_CARD,
  VOTE_CARD,
} from "../../../constants/event.constants";
import { BoardContext } from "../../../context/BoardContext";
import { ColorThemeContext } from "../../../context/ColorThemeContext";
import { DialogsContext } from "../../../context/DialogContext";
import { UserContext } from "../../../context/UserContext";
import { ROLE_MODERATOR } from "../../../utils/user.utils";
import { CardAuthor, CardContainer, CardText } from "../../styled-components";
import BlurredItem from "./BlurredItem";
import DeleteItemButton from "./DeleteItemButton";
import EditItemButton from "./EditItemButton";
import MarkAsDiscussedButton from "./MarkAsDiscussedButton";
import UpvoteItemButton from "./UpvoteItemButton";

type RetroItemProps = {
  id: string;
  author: string;
  content: string;
  points: number;
  isBlurred: boolean;
  isVoted: boolean;
  isDiscussed: boolean;
};

const getCardBorderColor = (colorTheme: Theme, theme: Theme) => {
  if (colorTheme.palette.type === "dark") {
    return theme.palette.secondary.light;
  } else {
    return "lightgrey";
  }
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.dark,
  },
  avatarVoted: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.dark,
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
  card: (colorTheme: Theme) => ({
    border: `1px solid ${getCardBorderColor(colorTheme, theme)}`,
  }),
  cardHeader: {
    padding: "8px",
  },
  cardHeaderAction: {
    paddingTop: "0.5em",
    paddingRight: "0.5em",
  },
  cardFocused: {
    border: "4px solid red",
  },
  contentBody: {
    whiteSpace: "pre-line",
  },
  downVoteButton: {
    marginTop: theme.spacing(1),
  },
  likeButton: {
    marginLeft: "auto",
  },
  cardLink: {
    color: theme.palette.primary.main,
    borderBottom: "dashed 1px",
    borderColor: theme.palette.primary.main,
    textDecoration: "none",
  },
  discussedLabel: {
    marginLeft: theme.spacing(1),
  },
}));

function RetroItem(props: RetroItemProps) {
  const {
    id,
    author,
    content,
    points,
    isBlurred,
    isVoted,
    isDiscussed,
  } = props;
  const [blurStatus, setBlurStatus] = useState(isBlurred);
  const { boardId, boardState, socket } = useContext(BoardContext);
  const { userState, downvoteCard } = useContext(UserContext);
  const { openRetroItemDetailDialog } = useContext(DialogsContext);
  const { currentTheme } = useContext(ColorThemeContext);
  const classes = useStyles(currentTheme);
  const contentWithLinks = createContentWithLinks(content);

  function createContentWithLinks(content: string) {
    // Regex for matching every kind of URLs
    const urls = /(?:\w+:\/\/[\w.]+|[\w.]+\.\w+).*/.exec(content);

    urls?.forEach((url: string) => {
      const editedUrl = url.indexOf("//") == -1 ? "https://" + url : url;
      content = content.replace(
        url,
        `<a href="${editedUrl}" target="_blank" class="${classes.cardLink}">${url}</a>`
      );
    });

    return content;
  }

  function downVote() {
    const votesLeft = userState.votesLeft;
    socket.emit(VOTE_CARD, id, boardId, false);
    downvoteCard(boardId, id, votesLeft);
  }

  function openDetail() {
    openRetroItemDetailDialog(id, userState.name, author);
  }
        
  function toggleFocus() {
    if (boardState.focusedCard === id) {
      socket.emit(REMOVE_FOCUS_CARD);
    } else {
      socket.emit(FOCUS_CARD, id);
    }
  }

  const getIsBlurred = useCallback(() => {
    setBlurStatus(author === userState.name ? false : isBlurred);
  }, [author, isBlurred, userState.name]);

  useEffect(() => {
    getIsBlurred();
  }, [getIsBlurred]);

  return (
    <Fragment>
      {blurStatus ? (
        <BlurredItem />
      ) : (
        <CardContainer>
          <Card
            elevation={20}
            className={
              boardState.focusedCard === id ? classes.cardFocused : classes.card
            }
          >
            <CardHeader
              className={classes.cardHeader}
              avatar={
                <Avatar
                  className={isVoted ? classes.avatarVoted : classes.avatar}
                  aria-label="number of votes"
                >
                  {points}
                </Avatar>
              }
              title={
                <Typography variant="body2" component={"span"}>
                  <CardAuthor>{author}</CardAuthor>
                </Typography>
              }
              action={
                userState.role === ROLE_MODERATOR && (
                  <div className={classes.cardHeaderAction}>
                    <Tooltip title="Higlight card">
                      <IconButton
                        aria-label="Highlight"
                        color="inherit"
                        onClick={toggleFocus}
                      >
                        {boardState.focusedCard === id ? (
                          <HighlightIcon />
                        ) : (
                          <HighlightOutlinedIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                  </div>
                )
              }
            />
            <Divider />
            <CardContent>
              <Typography
                className={classes.contentBody}
                variant="body2"
                color="textSecondary"
                component={"span"}
              >
                <CardText
                  dangerouslySetInnerHTML={{ __html: contentWithLinks }}
                />
              </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.actions}>
              <div>
                <IconButton size="small" color="inherit" onClick={openDetail}>
                  <Badge
                    badgeContent={boardState.comments[id]?.length}
                    color="primary"
                  >
                    <CommentIcon fontSize="small" />
                  </Badge>
                </IconButton>
                {isDiscussed ? (
                  <Chip
                    label={"Discussed"}
                    variant="outlined"
                    size={"small"}
                    className={classes.discussedLabel}
                  />
                ) : null}
              </div>
              <div>
                <UpvoteItemButton id={id} />
                {isVoted ? (
                  <IconButton
                    className={classes.downVoteButton}
                    size="small"
                    color="inherit"
                    onClick={downVote}
                  >
                    <ThumbDownIcon fontSize="small" />
                  </IconButton>
                ) : null}
                <EditItemButton id={id} author={author} content={content} />
                <MarkAsDiscussedButton id={id} />
                <DeleteItemButton id={id} />
              </div>
            </CardActions>
          </Card>
        </CardContainer>
      )}
    </Fragment>
  );
}

export default React.memo(RetroItem);
