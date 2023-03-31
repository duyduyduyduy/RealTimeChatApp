import { createContext, useReducer } from "react";
export const ImageContext = createContext();
export const INITIAL_STATE = {
  isBigger: false,
  photoURL: "",
};
export const contReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_BIG_IMAGE":
      return {
        ...state,
        isBigger: true,
        photoURL: action.payload,
      };
    case "CLOSE_BIG_IMAGE":
      return {
        ...state,
        isBigger: false,
      };
    default:
      return state;
  }
};
export const ImageContextProvider = ({ children }) => {
  const [stateImage, dispatch] = useReducer(contReducer, INITIAL_STATE);
  return (
    <ImageContext.Provider value={{ stateImage, dispatch }}>
      {children}
    </ImageContext.Provider>
  );
};
