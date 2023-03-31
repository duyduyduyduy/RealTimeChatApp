import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import { db } from "../Firebase/Firebase";
import "./UserShortCut.css";
export default function UserShortCut() {
  const { state, dispatch } = useContext(ChatContext);
  const [lsUser, setLsUser] = useState([]);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const getData = async () => {
      const userRef = doc(db, "userChats", currentUser?.uid);
      const docSnap = await getDoc(userRef);
      setLsUser(Object.entries(docSnap.data()));
    };
    currentUser.uid && getData();
  }, []);
  useEffect(() => {
    const getRealTime = () => {
      onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        doc.exists() && setLsUser(Object.entries(doc.data()));
      });
    };
    state.state.combinedId && getRealTime();
  }, [state.state.combinedId]);
  const handleOnClickUserInShortCut = (data) => {
    dispatch({
      type: "UPDATE_CONTACTER_INFO",
      payload: {
        displayName: data[1].displayName,
        photoURL: data[1].downloadURL,
        combinedId: data[0],
      },
    });
    dispatch({
      type: "CHANGE_DEFAULT_IMAGE",
    });
  };
  return (
    <div className="UserShortCutContainer">
      {lsUser?.map((item, index) => {
        return (
          <div
            key={index}
            className="UserInfoInShortCut"
            onClick={() => handleOnClickUserInShortCut(item)}
          >
            <img src={item[1].downloadURL} />
            <div>
              <p className="NameShortCut">{item[1].displayName}</p>
              <p className="LastMessage">{item[1].lastMessage.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
