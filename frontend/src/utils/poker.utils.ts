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

function getFibonacciRange(low: number, high: number) {
  let f1 = 0,
    f2 = 1,
    f3 = 1;
  const result: number[] = [];

  result.push(f1);
  result.push(f2);

  while (f1 <= high) {
    result.push(f1);
    if (f1 >= low) {
      f1 = f2;
      f2 = f3;
      f3 = f1 + f2;
    }
  }

  return Array.from(new Set(result));
}

type Mark = { value: any; label: string };

export function getFibonacciMarks(low: number, high: number) {
  const marks: Mark[] = [];
  const fibonacciNumbers = getFibonacciRange(low, high);
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
      value: "XS",
      label: "XS",
    },
    {
      value: "S",
      label: "S",
    },
    {
      value: "M",
      label: "M",
    },
    {
      value: "L",
      label: "L",
    },
    {
      value: "XL",
      label: "XL",
    },
  ];
}

function saveToSessionStorage(pokerId: string, data: string) {
  sessionStorage.setItem(pokerId, data);
}
