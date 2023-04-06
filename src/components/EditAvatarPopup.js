import React, { useEffect, useRef } from 'react';
import PopupWithForm from "./PopupWithForm";


const EditAvatarPopup = ({isOpen, onClose, isLoading, onUpdateAvatar}) => {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      onClose={onClose}
      isOpen={isOpen}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          ref={avatarRef}
          name="link"
          type="url"
          placeholder="Ссылка на аватар"
          id="avatar__link-input"
          className="form__input form__input_type_url"
          required
        />
        <span className="avatar__link-input-error form__input-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
