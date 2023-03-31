import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./Context/AuthContext";
import { ImageContextProvider } from "./Context/BiggerContext";
import { ChatContextProvider } from "./Context/ChatContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ImageContextProvider>
    <ChatContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ChatContextProvider>
  </ImageContextProvider>
);
