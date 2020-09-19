export const POKER_ROLE_MODERATOR = "moderator";
export const POKER_ROLE_PARTICIPANT = "participant";

export function getPokerUser(pokerId: string) {
  const user = sessionStorage.getItem(pokerId);

  if (user !== null) {
    return JSON.parse(user);
  }

  return null;
}

export function setPokerUser(
  propName: string,
  value: string | number | boolean,
  pokerId: string
) {
  const user = getPokerUser(pokerId);

  if (user !== null) {
    user[propName] = value;
    saveToSessionStorage(pokerId, JSON.stringify(user));
  }
}

export function createPokerUser(pokerId: string, userId: string, role: string) {
  saveToSessionStorage(
    pokerId,
    JSON.stringify({ id: userId, name: "", role, vote: -1, voted: false })
  );
}

export function getFibonacciMarks() {
  return [
    {
      value: 0,
      label: "0",
    },
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 8,
      label: "8",
    },
    {
      value: 13,
      label: "13",
    },
    {
      value: 21,
      label: "21",
    },
  ];
}

function saveToSessionStorage(pokerId: string, data: string) {
  sessionStorage.setItem(pokerId, data);
}
