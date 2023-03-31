import React, { useContext } from "react";
import Chat from "../Chat/Chat";
import { ChatContext } from "../Context/ChatContext";
import SideBar from "../SideBar/SideBar";
import "./Home.css";
export default function Home() {
  const { state } = useContext(ChatContext);
  return (
    <div className="HomeContainer">
      <div className="HomeMainSize">
        <SideBar />
        {state.isdefault === true ? (
          <div className="DefaultImage">
            <img
              alt="fjskljfklsdjl"
              className="DefaultImage"
              src="https://img.freepik.com/free-vector/bubble-chat-messenger-application-flat-style_23-2147804304.jpg?w=740&t=st=1679663021~exp=1679663621~hmac=9a6ce5b3377e0942818960446318eb7beff95103ffeb81adce37115027c2f747"
            />
          </div>
        ) : (
          <Chat />
        )}
      </div>
    </div>
  );
}
