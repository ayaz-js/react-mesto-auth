import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({isOpen, onClose, isLoading, onUpdateUser}) => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  const user = useContext(CurrentUserContext);

  useEffect(() => {
    setName(user ? user.name : "");
    setAbout(user ? user.about : "");
  }, [user, isOpen]);

  const handleNameChange = (event) => setName(event.target.value);
  const handleAboutChange = (event) => setAbout(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateUser({ name: name, about: about });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      onClose={onClose}
      isOpen={isOpen}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          name="name"
          type="text"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          id="name-input"
          className="form__input form__input_type_name"
          required
          value={name || ''}
          onChange={handleNameChange}
        />
        <span className="name-input-error form__input-error"></span>
      </label>

      <label className="form__field">
        <input
          name="about"
          type="text"
          placeholder="Деятельность"
          minLength="2"
          maxLength="200"
          id="role-input"
          className="form__input form__input_type_role"
          required
          value={about || ''}
          onChange={handleAboutChange}
        />
        <span className="role-input-error form__input-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
