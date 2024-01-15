const userNameKey = "userName";
const usernameStorePermissionKey = "userAllowsNameStorage";

function setUserName(userName: string) {
  localStorage.setItem(userNameKey, userName);
}

function getUserName() {
  return localStorage.getItem(userNameKey) ?? "";
}

function removeUserName() {
  localStorage.removeItem(userNameKey);
}

function setNameStorePermission(permission: boolean) {
  localStorage.setItem(usernameStorePermissionKey, String(permission));
}

function getNameStorePermission(): boolean {
  const value = localStorage.getItem(usernameStorePermissionKey);
  return value === "true";
}

export const LocalStorage = {
  setUserName,
  getUserName,
  removeUserName,
  setNameStorePermission,
  getNameStorePermission,
};
