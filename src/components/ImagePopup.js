import React from "react";
import Popup from "./Popup";

function ImagePopup({ card, onClose }) {

  return (
    <Popup className="popup_theme_dark"
           name="image"
           isOpen={!!card}
           onClose={onClose}>
        <img
          src={card?.link}
          alt={card?.name}
          className="popup__image"
        />
        <p className="popup__image-caption">{card?.name}</p>
    </Popup>
  );
}

export default ImagePopup;
