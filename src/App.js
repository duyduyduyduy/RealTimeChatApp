import React from "react";
import { useContext } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Home from "./Home/Home";
import { AuthContext } from "./Context/AuthContext";
function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ user, redirectPath = "/Login", children }) => {
    if (!user) {
      return <Navigate to={redirectPath} />;
    }
    return children;
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={currentUser}>
                <Home />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
