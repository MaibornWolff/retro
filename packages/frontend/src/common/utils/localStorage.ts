const userNameKey = "userName";
const usernameStorePermissionKey = "userAllowsNameStorage";
const themePreference = "themePreference";

export enum ThemeStatus {
  not_set = "not_set",
  dark = "dark",
  light = "light",
}

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

function setThemeStatus(status: ThemeStatus) {
  localStorage.setItem(themePreference, status);
}

function getThemePreference(): ThemeStatus {
  const value = localStorage.getItem(themePreference);
  if (value === null) {
    return ThemeStatus.not_set;
  } else {
    return ThemeStatus[value as keyof typeof ThemeStatus];
  }
}

export const LocalStorage = {
  setUserName,
  getUserName,
  removeUserName,
  setNameStorePermission,
  getNameStorePermission,
  setThemePreference: setThemeStatus,
  getThemePreference,
};
