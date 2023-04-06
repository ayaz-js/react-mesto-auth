import React from 'react';
import PopupWithForm from "./PopupWithForm";

const ConfirmationPopup = ({card, isLoading, isOpen, onClose, deleteCard}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    deleteCard(card);
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      buttonText={isLoading ? "Удаление..." : "Да"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  );
};

export default ConfirmationPopup;
