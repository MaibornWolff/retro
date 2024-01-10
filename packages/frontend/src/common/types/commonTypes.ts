export interface BaseAction {
  type: string;
}

export interface User {
  id: string;
  isModerator: boolean;
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
