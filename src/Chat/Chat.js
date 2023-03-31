import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import { db, storage } from "../Firebase/Firebase";
import Owner from "../Owner/Owner";
import BiggerImage from "../BiggerImage/BiggerImage";
import { v4 as uuid } from "uuid";
import Sender from "../Sender/Sender";
import "./Chat.css";
import { ImageContext } from "../Context/BiggerContext";
export default function Chat() {
  const { state } = useContext(ChatContext);
  const Imgref = useRef(null);
  const [user, setUser] = useState({});
  const [text, setText] = useState("");
  const [chat, setChat] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { stateImage } = useContext(ImageContext);
  const handleOnSubmitSendText = async (e) => {
    e.preventDefault();
    if (e.target[1].files[0] || e.target[0].value) {
      if (e.target[1].files[0]) {
        const storageRef = ref(storage, uuid());
        await uploadBytesResumable(storageRef, e.target[1].files[0]).then(
          () => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
              try {
                await updateDoc(doc(db, "chats", state.state.combinedId), {
                  messages: arrayUnion({
                    text: text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    imgUrl: downloadURL,
                  }),
                });
              } catch (error) {
                console.log("Error: ", error);
              }
            });
          }
        );
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [state.state.combinedId + ".lastMessage"]: {
            text: "Image was attached",
          },
        });
        await updateDoc(
          doc(
            db,
            "userChats",
            String(state.state.combinedId.replace(currentUser.uid, ""))
          ),
          {
            [state.state.combinedId + ".lastMessage"]: {
              text: "Image was attached",
            },
          }
        );
      } else {
        await updateDoc(doc(db, "chats", state.state.combinedId), {
          messages: arrayUnion({
            text: e.target[0].value,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [state.state.combinedId + ".lastMessage"]: { text },
        });
        await updateDoc(
          doc(
            db,
            "userChats",
            String(state.state.combinedId.replace(currentUser.uid, ""))
          ),
          {
            [state.state.combinedId + ".lastMessage"]: { text },
          }
        );
      }
      setText("");
      Imgref.current.value = null;
    }
  };
  useEffect(() => {
    const getData = async () => {
      const userRef = doc(db, "user", currentUser?.uid);
      const docSnap = await getDoc(userRef);
      setUser(docSnap.data());
    };
    currentUser.uid && getData();
  }, [currentUser]);
  useEffect(() => {
    const getRealTime = () => {
      onSnapshot(doc(db, "chats", state.state.combinedId), (doc) => {
        doc && setChat(doc.data().messages);
      });
    };
    state.state.combinedId && getRealTime();
  }, [state.state.combinedId]);
  return (
    <>
      {stateImage.isBigger && <BiggerImage />}
      <div className="ChatContainer">
        <div className="ContacterContainer">
          <div className="ContacterInfo">
            <img alt="fjsdjflksdjlk" src={state?.state?.photoURL} />
            <span>{state?.state?.displayName}</span>
          </div>
          <div className="Feature">
            <i className="fa-solid fa-phone"></i>
            <i className="fa-solid fa-video"></i>
          </div>
        </div>
        <div className="MessagesContainer">
          {chat &&
            chat.map((item, index) => {
              return item.senderId === currentUser.uid ? (
                <Owner
                  key={index}
                  photoURL={user?.downloadURL}
                  text={item.text}
                  imgUrl={item.imgUrl}
                />
              ) : (
                <Sender
                  key={index}
                  photoURL={state.state?.photoURL}
                  text={item.text}
                  imgUrl={item.imgUrl}
                />
              );
            })}
        </div>
        <form className="InputContainer" onSubmit={handleOnSubmitSendText}>
          <input
            placeholder="Enter to send"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            ref={Imgref}
            type="file"
            id="fileImage"
            style={{ display: "none" }}
          />
          <label htmlFor="fileImage">
            <img
              alt="Image"
              src="https://raw.githubusercontent.com/safak/youtube2022/react-chat/src/img/img.png"
            />
          </label>
          <i className="fa-solid fa-paper-plane"></i>
        </form>
      </div>
    </>
  );
}
