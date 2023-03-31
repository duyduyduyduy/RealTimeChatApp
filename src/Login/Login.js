import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../Firebase/Firebase";
import Cookies from "js-cookie";
import "./Login.css";
export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  const nav = useNavigate();
  const handleOnSubmitLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let res = await signInWithEmailAndPassword(
        auth,
        e.target[0].value,
        e.target[1].value
      );
      if (res.user) {
        Cookies.set("Email", res.user.email);
        Cookies.set("Password", e.target[1].value);
        Cookies.set("ID", res.user.uid);
        nav("/");
      }
      setIsLoading(false);
      setErr(false);
    } catch (error) {
      setErr(true);
      setIsLoading(false);
    }
  };
  return (
    <form className="Logincontainer" onSubmit={handleOnSubmitLogin}>
      {isLoading && (
        <div className="LoaderFilmInfoContainer">
          <div className="FilmInfoLoader"></div>
        </div>
      )}
      <div className="LoginMainSize">
        <h2 className="titleLogin">LOGIN</h2>
        <input placeholder="Enter your email" />
        <input placeholder="Enter your password" type={"password"} />
        {err && <p style={{ color: "red" }}>* Something went wrong!</p>}
        <p className="forgetPass">Forget password ?</p>
        <button>LOGIN</button>
        <p className="CreateAccount">
          Don't have an account?{" "}
          <span
            style={{
              color: "#189AB4",
              fontWeight: "bolder",
              cursor: "pointer",
            }}
            onClick={() => nav("/Register")}
          >
            Create a new account
          </span>
        </p>
      </div>
    </form>
  );
}
