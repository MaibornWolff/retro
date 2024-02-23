import { RetroPaletteMode } from "../../../mui.types";

const userNameKey = "userName";
const usernameStorePermissionKey = "userAllowsNameStorage";
const themeKey = "theme";

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

function setThemeStatus(theme: RetroPaletteMode) {
  localStorage.setItem(themeKey, theme);
}

function getThemePreference(): RetroPaletteMode | undefined {
  const value = localStorage.getItem(themeKey);
  if (value === null) {
    return undefined;
  } else {
    return value;
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
