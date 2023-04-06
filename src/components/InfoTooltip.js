import React from 'react';
import Popup from "./Popup";

const InfoTooltip = ({text, image, isOpen, onClose}) => {
  return (
    <Popup
      name="info"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="popup__info-tooltip">
        <img className="popup__icon" src={image} />
        <h2 className="popup__title popup__title_info">{text}</h2>
      </div>
    </Popup>
  );
};

export default InfoTooltip;
