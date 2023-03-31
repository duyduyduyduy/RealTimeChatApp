import React, { useContext, useEffect, useRef } from "react";
import { ImageContext } from "../Context/BiggerContext";
import "./Owner.css";
export default function Owner({ photoURL, text, imgUrl }) {
  const { dispatch } = useContext(ImageContext);
  const ref = useRef();
  useEffect(() => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  }, [photoURL, text, imgUrl]);
  return (
    <>
      <div className="OwnerContainer" ref={ref}>
        <img alt="fksdjfkl" className="avatarOwner" src={photoURL} />
        <div className="ContentContainer">
          {imgUrl && (
            <img
              alt="fhkjdsh"
              onClick={() =>
                dispatch({ type: "OPEN_BIG_IMAGE", payload: imgUrl })
              }
              className="ImgSender"
              src={imgUrl}
            />
          )}
          {text !== "" && (
            <div className="TextOwner">
              <p>{text}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
