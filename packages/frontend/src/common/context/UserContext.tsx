import React, { Dispatch, SetStateAction, useCallback, useContext, useState } from "react";
import { User } from "../types/commonTypes";

interface UserContextProviderProps {
  children?: React.ReactNode;
}

export const initialUserState: User = {
  id: "",
  role: "participant",
  name: "",
};

export interface UserContextValues {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  resetUser: () => void;
}

export const UserContext = React.createContext<UserContextValues>(undefined!);

export function UserContextProvider(props: UserContextProviderProps) {
  const [user, setUser] = useState(initialUserState);

  const resetUser = useCallback(() => {
    setUser(initialUserState);
  }, []);

  const value: UserContextValues = {
    user,
    setUser,
    resetUser,
  };

  return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
}

export function useUserContext() {
  return useContext(UserContext);
}
