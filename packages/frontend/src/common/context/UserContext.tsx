import React, { Dispatch, SetStateAction, useContext, useState } from "react";
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
}

export const UserContext = React.createContext<UserContextValues>(undefined!);

export default function UserContextProvider(props: UserContextProviderProps) {
  const [user, setUser] = useState(initialUserState);

  const value: UserContextValues = {
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
}

export function useUserContext() {
  return useContext(UserContext);
}
