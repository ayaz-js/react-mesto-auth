import React from "react";
import Popup from './Popup';

function PopupWithForm(
  {
    title,
    name,
    children,
    isOpen,
    onClose,
    buttonText,
    onSubmit
  }) {

  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <h2 className={`popup__title popup__title_${name}`}>{title}</h2>

      <form
        className="form"
        name={name}
        onSubmit={onSubmit}
      >

        {children}

        <button
          type="submit"
          className="form__save-button form__save-button_active"
        >{buttonText}</button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
