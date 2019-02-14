import React from "react";

const AppContext = React.createContext();

const initialState = {
  voteCount: 3
};

const reducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "increment":
      return { ...state, voteCount: state.voteCount + 1 };
    case "decrement":
      return { ...state, voteCount: state.voteCount - 1 };
    default:
      return { ...state };
  }
};

const AppContextProvider = props => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

const AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
