import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
function Login({ handleLoginSubmit }) {
  const user = useContext(CurrentUserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => setEmail(event.target.value);

  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLoginSubmit(password, email);
  }

  return (
    <main className="sign">
      <div className="sign__container">
        <h2 className="sign__title">Вход</h2>
        <form className="sign__form" onSubmit={handleSubmit}>
          <input
            id="email"
            name="email"
            className="sign__input"
            type="email"
            required
            minLength="2"
            placeholder="Email"
            value={email || ""}
            onChange={handleEmailChange}
          ></input>
          <input
            id="password"
            name="password"
            className="sign__input"
            type="password"
            required
            minLength="6"
            placeholder="Пароль"
            value={password || ""}
            onChange={handlePasswordChange}
          ></input>
          <button className="sign__button" type="submit">
            Войти
          </button>
        </form>
      </div>
    </main>
  );
}
export default withRouter(Login);
