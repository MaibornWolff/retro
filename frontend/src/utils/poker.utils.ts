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

export function createPokerUser(pokerId: string, name: string) {
  saveToSessionStorage(
    pokerId,
    JSON.stringify({ name, vote: -1, voted: false })
  );
}

function saveToSessionStorage(pokerId: string, data: string) {
  sessionStorage.setItem(pokerId, data);
}
