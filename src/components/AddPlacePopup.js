import React, { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({isOpen, onClose, onAddPlace, isLoading}) => {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  const handleNameChange = (event) => setName(event.target.value);
  const handleLinkChange = (event) => setLink(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    onAddPlace({
      name: name,
      link: link
    })
  }


  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      onClose={onClose}
      isOpen={isOpen}
      buttonText={isLoading ? "Загрузка..." : "Создать"}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          name="name"
          type="text"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          id="title-input"
          className="form__input form__input_type_title"
          required
          value={name || ''}
          onChange={handleNameChange}
        />
        <span className="title-input-error form__input-error"></span>
      </label>

      <label className="form__field">
        <input
          name="link"
          type="url"
          placeholder="Ссылка на картинку"
          id="link-input"
          className="form__input form__input_type_url"
          required
          value={link || ''}
          onChange={handleLinkChange}
        />
        <span className="link-input-error form__input-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
