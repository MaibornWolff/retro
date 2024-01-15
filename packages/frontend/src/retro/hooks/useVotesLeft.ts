import { useRetroContext } from "../context/RetroContext";
import { sum } from "lodash";
import { useUserContext } from "../../common/context/UserContext";

export function useVotesLeft() {
  const { retroState } = useRetroContext();
  const { user } = useUserContext();

  const votes = retroState.columns.flatMap((column) =>
    column.cards.map((card) => card.votes[user.id] ?? 0),
  );

  return Math.max(retroState.maxVoteCount - sum(votes), 0);
}
