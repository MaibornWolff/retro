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
