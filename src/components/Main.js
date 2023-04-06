import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(
  {
    cards,
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    onCardClick,
    onCardLike,
    onCardDelete
  }) {

  const user = useContext(CurrentUserContext);

  return (
      <main className="content">

        <section className="profile">
          <div className="profile__avatar" onClick={onEditAvatar}>
            <img
              src={user.avatar}
              alt="Аватар пользователя"
              className="profile__avatar-image"
            />
          </div>

          <div className="profile__info">
            <h1 className="profile__name">{user.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}>
            </button>
            <p className="profile__role">{user.about}</p>
          </div>
          <button
            type="button"
            className="profile__add-button"
            onClick={onAddPlace}>
          </button>
        </section>

        <section className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </section>

      </main>
  );
}

export default Main;
