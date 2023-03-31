import React, { useContext, useEffect, useRef } from "react";
import { ImageContext } from "../Context/BiggerContext";
import "./Sender.css";
export default function Sender({ photoURL, text, imgUrl }) {
  const { dispatch } = useContext(ImageContext);
  const ref = useRef();
  useEffect(() => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  }, [photoURL, text, imgUrl]);
  return (
    <>
      <div className="SenderContainer" ref={ref}>
        <img alt="Bùi Thanh duy" className="avatarSender" src={photoURL} />
        <div>
          {" "}
          {text !== "" && (
            <div className="TextSender">
              <p>{text}</p>
            </div>
          )}
          {imgUrl && (
            <img
              onClick={() =>
                dispatch({ type: "OPEN_BIG_IMAGE", payload: imgUrl })
              }
              alt="Bùi Thanh Duy"
              className="ImgSender"
              src={imgUrl}
            />
          )}
        </div>
      </div>
    </>
  );
}
