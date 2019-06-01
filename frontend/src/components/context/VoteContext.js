import React from "react";

export const VoteContext = React.createContext();

export const VoteContextProvider = props => {
  console.log(localStorage);

  return (
    <VoteContext.Provider value={""}>{props.children}</VoteContext.Provider>
  );
};
