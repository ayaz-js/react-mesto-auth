import React from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import logoPath from "../images/logo.svg";

function Header({email, setLoggedIn}) {
  const history = useHistory();
  const signOut = () => {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
    setLoggedIn(false);
  }

  return (
    <header className="header">
      <div className="header__wrapper">
        <a href="/" className="header__link">
          <img src={logoPath} alt="Логотип: Место" className="header__logo" />
        </a>
        <div className="header__group">
          <Switch>
            <Route exact path="/">
              <p className="header__email">{email}</p>
              <Link className="header__route-link header__route-link_color_gray" to="/sign-in" onClick={signOut}>
                Выйти
              </Link>
            </Route>
            <Route path="/sign-in">
              <Link to="/sign-in" className="header__route-link">
                Войти
              </Link>
            </Route>
            <Route path="/sign-up">
              <Link to="/sign-up" className="header__route-link">
                Регистрация
              </Link>
            </Route>
          </Switch>
        </div>
      </div>
    </header>
  );
}

export default Header;
