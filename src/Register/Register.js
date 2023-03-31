import React, { useState } from "react";
import "./Register.css";
import "../Loader/Loader.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../Firebase/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
export default function Register() {
  const [passwordNotMatch, setpasswordNotMatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const handleOnClickSinUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (e.target[2].value === e.target[3].value) {
      try {
        const res = await createUserWithEmailAndPassword(
          auth,
          e.target[1].value,
          e.target[2].value
        );
        const storageRef = ref(storage, `${e.target[1].value}`);
        await uploadBytesResumable(storageRef, e.target[4].files[0]).then(
          () => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
              try {
                await setDoc(doc(db, "user", res.user.uid), {
                  downloadURL: downloadURL,
                  displayName: e.target[0].value,
                  email: e.target[1].value,
                });
              } catch (error) {
                console.log("Error: ", error);
              }
              setIsLoading(false);
              nav("/");
            });
          }
        );
        await setDoc(doc(db, "userChats", res.user.uid), {});
      } catch (error) {
        console.log("Error:", error);
      }
      setpasswordNotMatch(false);
    } else {
      setpasswordNotMatch(true);
    }
  };
  return (
    <div className="Logincontainer">
      {isLoading && (
        <div className="LoaderFilmInfoContainer">
          <div className="FilmInfoLoader"></div>
        </div>
      )}
      <form className="LoginMainSize" onSubmit={handleOnClickSinUp}>
        <h2 className="titleLogin">SIGN UP</h2>
        <input placeholder="Enter your full name" />
        <input placeholder="Enter your email" />
        <input placeholder="Enter your password" type={"password"} />
        <input placeholder="Confirm your password" type={"password"} />
        <input type="file" id="file" style={{ display: "none" }} />
        {passwordNotMatch && (
          <p className="passwordnotmatch">* Confirmed password doesn't match</p>
        )}
        <label htmlFor="file" className="addAvatar">
          <img
            alt="Hello"
            style={{ width: "30px" }}
            src="https://raw.githubusercontent.com/safak/youtube2022/react-chat/src/img/addAvatar.png"
          />
          <span>Add an avatar</span>
        </label>
        <button>SIGN UP</button>
      </form>
    </div>
  );
}
