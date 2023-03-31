import { signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import { auth, db } from "../Firebase/Firebase";
import UserShortCut from "../UserShortCut/UserShortCut";
import "./SideBar.css";
export default function SideBar() {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [userKey, setUserKey] = useState("");
  const [searchedUser, SetSearchedUser] = useState([]);
  const [popupSearch, setPopupSearch] = useState(false);
  const { dispatch } = useContext(ChatContext);
  useEffect(() => {
    const getData = async () => {
      const userRef = doc(db, "user", currentUser?.uid);
      const docSnap = await getDoc(userRef);
      setUser(docSnap.data());
    };
    currentUser.uid && getData();
  }, [currentUser]);
  const handleEnter = async (e) => {
    if (e.key === "Enter") {
      const q = query(
        collection(db, "user"),
        where("displayName", "==", String(userKey))
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          SetSearchedUser([...searchedUser, { ...doc.data(), uid: doc.id }]);
        });
      } else {
        console.log("Not Found!!");
      }
      setPopupSearch(true);
    }
  };
  const handleOnClickSearchedUser = async (item) => {
    const combinedId =
      currentUser.uid > item.uid
        ? currentUser.uid + item.uid
        : item.uid + currentUser.uid;
    const res = await getDoc(doc(db, "chats", combinedId));
    if (!res.exists()) {
      await setDoc(doc(db, "chats", combinedId), { messages: [] });
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId]: {
          displayName: item.displayName,
          downloadURL: item.downloadURL,
          lastMessage: "",
        },
      });
      await updateDoc(doc(db, "userChats", item.uid), {
        [combinedId]: {
          displayName: user.displayName,
          downloadURL: user.downloadURL,
          lastMessage: "",
        },
      });
    }
    dispatch({
      type: "UPDATE_CONTACTER_INFO",
      payload: {
        displayName: item.displayName,
        photoURL: item.downloadURL,
        combinedId: combinedId,
      },
    });

    setPopupSearch(false);
    setUserKey("");
    SetSearchedUser([]);
  };
  const handleLogOut = () => {
    signOut(auth);
    dispatch({
      type: "RESET_STATE",
    });
    dispatch({
      type: "RESET_DEFAULT_IMAGE",
    });
  };
  return (
    <div className="SideBarContainer">
      <div className="userInfo">
        <div>
          <img src={user?.downloadURL} />
          <div className="NameandEmail">
            <p className="NameUser">{user?.displayName}</p>
            <p className="EmailUser">{user?.email}</p>
          </div>
        </div>
        <i
          className="fa-solid fa-right-from-bracket"
          onClick={handleLogOut}
        ></i>
      </div>
      <div className="UserShortCutandSearch">
        <input
          placeholder="Search"
          value={userKey}
          onChange={(e) => setUserKey(e.target.value)}
          onKeyDown={(e) => handleEnter(e)}
        />
        <i className="fa-solid fa-magnifying-glass"></i>
        {popupSearch && userKey !== "" ? (
          <div className="UserShortCutContainer">
            <p style={{ color: "#6E6E6E", fontSize: "11px" }}>Search result</p>
            {searchedUser &&
              searchedUser.map((item) => {
                return (
                  <div
                    className="UserInfoInShortCut"
                    onClick={() => handleOnClickSearchedUser(item)}
                  >
                    <img src={item.downloadURL} />
                    <div>
                      <p className="NameShortCut">{item.displayName}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <UserShortCut />
        )}
      </div>
    </div>
  );
}
