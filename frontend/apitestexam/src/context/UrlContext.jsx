import React, { createContext, useReducer, useEffect } from "react";
import loggingMiddleware from "./loggingMiddleware";

// ---- Data and action types ----
export const UrlContext = createContext();

const initialState = JSON.parse(localStorage.getItem("shortUrls")) || [];

function urlReducer(state, action) {
  switch (action.type) {
    case "ADD_URLS":
      // action.payload: Array of new url objects
      return [...state, ...action.payload];
    case "ADD_CLICK":
      // action.payload: { shortCode, click }
      return state.map(entry =>
        entry.shortCode === action.payload.shortCode
          ? { ...entry, clicks: [...entry.clicks, action.payload.click] }
          : entry);
    case "CLEAN_EXPIRED":
      return state.filter(entry => new Date(entry.expiryAt) > new Date());
    default:
      return state;
  }
}

// ---- Context provider ----
export function UrlProvider({ children }) {
  const [state, dispatchRaw] = useReducer(urlReducer, initialState);

  // Plug-in mandatory logging middleware
  const dispatch = (action) => {
    loggingMiddleware(action);  // Must be your previously provided logging function!
    dispatchRaw(action);
  };

  useEffect(() => {
    localStorage.setItem("shortUrls", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    // Clean expired URLs when the app starts
    dispatch({ type: "CLEAN_EXPIRED" });
  }, []);

  return (
    <UrlContext.Provider value={{ urls: state, dispatch }}>
      {children}
    </UrlContext.Provider>
  );
}