import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const user = useContext(CurrentUserContext);

  const handleLikeClick = () => {
    onCardLike(card);
  }
  const handleDeleteClick = () => {
    onCardDelete(card)
  }

  const isOwner = card.owner._id === user._id;
  const isLiked = card.likes.some((like) => like._id === user._id);
  const cardLikeButtonClassName = `element__like-button ${isLiked ? " element__like-button_active" : ""}`;

  return (
    <>
      <article className="element">
        <img
          alt={card.name}
          src={card.link}
          className="element__image"
          onClick={() => onCardClick(card)}
        />
        <div className="element__text-container">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like-container">
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={handleLikeClick}
            ></button>
            <span className="element__like-count">{card.likes.length}</span>
          </div>
        </div>
        {isOwner && (
          <button
            type="button"
            className="element__remove-button"
            onClick={handleDeleteClick}
          ></button>
        )}
      </article>
    </>
  );
}

export default Card;
