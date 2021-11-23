import {
  CONTINUE_DISCUSSION_VOTE_ABSTAIN,
  CONTINUE_DISCUSSION_VOTE_NO,
  CONTINUE_DISCUSSION_VOTE_YES,
  REMOVE_FOCUSED_CARD,
  SET_CONTINUE_DISCUSSION,
  SET_FOCUSED_CARD,
  SHOW_REACTION,
  UPDATE_COMMENTS,
} from "../actions/board.actions";
import { RetroCommentMap } from "../types/common.types";
import { BoardAction, BoardState } from "../types/context.types";

export const reducer = (state: BoardState, action: BoardAction): BoardState => {
  switch (action.type) {
    case UPDATE_COMMENTS:
      return {
        ...state,
        comments: action.payload?.comments as RetroCommentMap,
      };
    case SHOW_REACTION:
      return {
        ...state,
        shownReactions: state.shownReactions.concat(
          action.payload?.reactionId as string
        ),
      };
    case SET_FOCUSED_CARD:
      return {
        ...state,
        focusedCard: action.payload?.focusedCard as string,
      };
    case REMOVE_FOCUSED_CARD:
      return {
        ...state,
        focusedCard: "",
      };
    case SET_CONTINUE_DISCUSSION:
      return {
        ...state,
        showContinueDiscussion: action.payload?.isToggled as boolean,
        continueDiscussionVotes: {
          ...state.continueDiscussionVotes,
          yes: 0,
          no: 0,
          abstain: 0,
        },
      };
    case CONTINUE_DISCUSSION_VOTE_YES:
      return {
        ...state,
        continueDiscussionVotes: {
          ...state.continueDiscussionVotes,
          yes: (state.continueDiscussionVotes.yes += 1),
        },
      };
    case CONTINUE_DISCUSSION_VOTE_NO:
      return {
        ...state,
        continueDiscussionVotes: {
          ...state.continueDiscussionVotes,
          no: (state.continueDiscussionVotes.no += 1),
        },
      };
    case CONTINUE_DISCUSSION_VOTE_ABSTAIN:
      return {
        ...state,
        continueDiscussionVotes: {
          ...state.continueDiscussionVotes,
          abstain: (state.continueDiscussionVotes.abstain += 1),
        },
      };
    default:
      return state;
  }
};
