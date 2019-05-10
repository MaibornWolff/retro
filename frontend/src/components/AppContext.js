import React, { useReducer } from "react";

const AppContext = React.createContext();

const initialState = { maxVoteCount: 3 };

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { ...state, maxVoteCount: state.maxVoteCount + 1 };
    case "decrement":
      return { ...state, maxVoteCount: state.maxVoteCount - 1 };
    case "reset":
      return initialState;
    default:
      return { ...state };
  }
};

const AppContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

const AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
