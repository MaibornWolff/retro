export type UserByUserId = Record<string, User>;

export interface ApplicationState {
  waitingList: UserByUserId;
  participants: UserByUserId;
  isAutoAcceptEnabled: boolean;
}

export interface BaseAction {
  type: string;
}

export type UserRole = "moderator" | "participant";

export interface User {
  id: string;
  role: UserRole;
  name: string;
}

export interface DialogProps {
  isOpen: boolean;
  close: () => void;
}

export interface ErrorState {
  type: ErrorType;
}

export type ErrorType = "KICKED" | "DISCONNECTED" | "REJECTED" | "ROOM_NOT_FOUND";
