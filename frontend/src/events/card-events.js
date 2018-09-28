import _ from "lodash";
import produce from "immer";
import {
  EDIT_CARD,
  DELETE_CARD,
  UPVOTE_CARD
} from "./event-names";

/* eslint-disable no-param-reassign */
export const onEditCard = component => {
  component.socket.on(EDIT_CARD, (cardAuthor, cardContent, cardId) => {
    component.setState(
      produce(draft => {
        const card = draft.items[cardId];

        card.author = cardAuthor;
        card.content = cardContent;
      })
    );
  });
};

export const onDeleteCard = component => {
  component.socket.on(DELETE_CARD, cardId => {
    component.setState(
      produce(draft => {
        const { items, columns } = draft;

        _.unset(items, cardId);
        _.forIn(columns, col => _.pull(col.itemIds, cardId));
      })
    );
  });
};

export const onUpvoteCard = component => {
  component.socket.on(UPVOTE_CARD, cardId => {
    component.setState(
      produce(draft => {
        draft.items[cardId].points += 1;
      })
    );
  });
};
