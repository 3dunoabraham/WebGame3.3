import { useReducer, createContext, useContext } from "react";

const reducer = (state:any, action:any) => {
  switch (action.type) {
    case "add":
      return state + 1;
    case "subtract":
      return state - 1;
    default:
      return state;
  }
};

const CounterContext = createContext(null);

export const CounterContextProvider = ({ children }:any) => (
  <CounterContext.Provider value={useReducer(reducer, 0)}>
    {children}
  </CounterContext.Provider>
);