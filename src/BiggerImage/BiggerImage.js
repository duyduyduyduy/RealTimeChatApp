import React, { useContext } from "react";
import { ImageContext } from "../Context/BiggerContext";
import "./BIggerImage.css";
export default function BiggerImage() {
  const { stateImage, dispatch } = useContext(ImageContext);
  return (
    <div className="biggerImageContainer">
      <div className="biggerImageMainsize">
        <div>
          <i
            onClick={() =>
              dispatch({
                type: "CLOSE_BIG_IMAGE",
              })
            }
            className="fa-solid fa-x"
          ></i>
        </div>
        <img alt="Bùi Thanh Duy" src={stateImage?.photoURL} />
      </div>
    </div>
  );
}
