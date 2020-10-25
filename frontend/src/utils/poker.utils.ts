export const POKER_ROLE_MODERATOR = "moderator";
export const POKER_ROLE_PARTICIPANT = "participant";

export type Mark = { value: any; label: string };

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

export function getFibonacciMarks(maxRange: number) {
  const marks: Mark[] = [];
  const fibonacciNumbers = getFibonacciRange(maxRange);
  fibonacciNumbers.forEach((num) =>
    marks.push({ value: num, label: String(num) })
  );
  return marks;
}

export function getPokerUnitDisplayName(unitType: string): string {
  const dict: { [key: string]: string } = {
    fibonacci: "Fibonacci",
    tshirt: "T-Shirt Size",
    naturalnumbers: "Natural Numbers",
  };

  return dict[unitType];
}

export function getTShirtSizesMarks() {
  return [
    {
      value: 0,
      label: "XS",
    },
    {
      value: 1,
      label: "S",
    },
    {
      value: 2,
      label: "M",
    },
    {
      value: 3,
      label: "L",
    },
    {
      value: 4,
      label: "XL",
    },
    {
      value: 5,
      label: "XXL",
    },
  ];
}

function getFibonacciRange(maxRange: number) {
  let f1 = 0,
    f2 = 1,
    f3 = 1;
  const result: number[] = [];

  result.push(f1);
  result.push(f2);

  while (f1 <= maxRange) {
    result.push(f1);
    if (f1 >= 0) {
      f1 = f2;
      f2 = f3;
      f3 = f1 + f2;
    }
  }

  return Array.from(new Set(result));
}

function saveToSessionStorage(pokerId: string, data: string) {
  sessionStorage.setItem(pokerId, data);
}
