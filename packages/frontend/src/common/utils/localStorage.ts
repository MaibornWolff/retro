const userNameKey = "userName";

function setUserName(userName: string) {
  localStorage.setItem(userNameKey, userName);
}

function getUserName() {
  return localStorage.getItem(userNameKey) ?? "";
}

export const LocalStorage = { setUserName, getUserName };
