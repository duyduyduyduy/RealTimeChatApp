import { createContext, useReducer } from "react";
export const ChatContext = createContext();
export const INITIAL_STATE = {
  state: {
    displayName: "",
    photoURL: "",
    combinedId: "",
  },
  isdefault: true,
};
export const contReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_CONTACTER_INFO":
      return {
        ...state,
        state: action.payload,
      };
    case "RESET_STATE":
      return {
        ...state,
        state: {
          displayName: "",
          photoURL: "",
          combinedId: "",
        },
      };
    case "CHANGE_DEFAULT_IMAGE":
      return {
        ...state,
        isdefault: false,
      };
    case "RESET_DEFAULT_IMAGE":
      return {
        ...state,
        isdefault: true,
      };
    default:
      return state;
  }
};
export const ChatContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contReducer, INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
