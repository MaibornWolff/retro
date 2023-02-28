import { Dictionary, groupBy } from "lodash";
import {
  ChartData,
  PokerParticipant,
  PokerParticipantByUserId,
  PokerUnit,
} from "../types/pokerTypes";

const tShirtSizeByInternalValue: Record<string, string> = {
  "0": "XS",
  "1": "S",
  "2": "M",
  "3": "L",
  "4": "XL",
  "5": "XXL",
};

export function getFibonacciMarks(maxRange: number) {
  const fibonacciNumbers = getFibonacciRange(maxRange);
  return fibonacciNumbers.map((num) => {
    return { value: num, label: String(num) };
  });
}

export function getTShirtSizesMarks() {
  return Object.entries(tShirtSizeByInternalValue).map(([key, value]) => {
    return { value: Number(key), label: value };
  });
}

export function generateChartData(participants: PokerParticipant[], pokerUnit: PokerUnit) {
  const groupedVotes = groupVotes(participants);
  return populateChartData(pokerUnit, groupedVotes);
}

export function resetAllVotes(participants: PokerParticipantByUserId): PokerParticipantByUserId {
  const newParticipants: PokerParticipantByUserId = {};
  Object.entries(participants).forEach(([userId, participant]) => {
    newParticipants[userId] = { ...participant, vote: -1, voted: false };
  });
  return newParticipants;
}

function populateChartData(pokerUnit: PokerUnit, groupedVotes: Dictionary<number[]>): ChartData[] {
  return Object.entries(groupedVotes).map(([key, votes]) => {
    return {
      name: pokerUnit.unitType === "tshirt" ? mapValueToTshirtSize(key) : key,
      value: votes.length,
    };
  });
}

function getFibonacciRange(maxRange: number) {
  let f1 = 0;
  let f2 = 1;
  let f3 = 1;
  const result = new Set([f1, f2]);

  while (f1 <= maxRange) {
    result.add(f1);
    if (f1 >= 0) {
      f1 = f2;
      f2 = f3;
      f3 = f1 + f2;
    }
  }

  return Array.from(result);
}

function groupVotes(participants: PokerParticipant[]) {
  const votes = participants
    .filter((participant) => participant.voted)
    .map((participant) => participant.vote);

  return groupBy(votes, Math.floor);
}

function mapValueToTshirtSize(internalValue: string | undefined) {
  if (!internalValue) return "";
  return tShirtSizeByInternalValue[internalValue] ?? "";
}
