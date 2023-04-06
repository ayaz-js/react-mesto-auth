import { useState, useCallback, useEffect } from "react";
import {
  Route,
  Switch,
  useHistory,
  Redirect
} from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ConfirmationPopup from "./ConfirmationPopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Api from "../utils/api.js";
import * as auth from "../utils/auth.js";
import success from "../images/success.svg";
import reject from "../images/reject.svg";

function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deletedCard, setDeletedCard] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const closeAllPopups = useCallback(() => {
    setSelectedCard(null);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeletePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }, []);

  const handleUpdateUser = (data) => {
    setIsLoading(true)
    Api.editProfile(data)
      .then((info) => setCurrentUser(info))
      .then(() => closeAllPopups())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false))
  }

  const handleUpdateAvatar = (data) => {
    setIsLoading(true)
    Api.editAvatar(data)
      .then((info) => setCurrentUser(info))
      .then(() => closeAllPopups())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false))
  }

  const handleAddPlaceSubmit = (data) => {
    setIsLoading(true)
    Api.addNewCard(data)
      .then((newCard) => setCards([newCard, ...cards]))
      .then(() => closeAllPopups())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false))
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    if (!isLiked) {
      Api.addCardLike(card._id)
        .then((like) => setCards((state) => state.map((c) => c._id === card._id ? like : c)))
        .catch((error) => console.log(error))
    } else {
      Api.deleteCardLike(card._id)
        .then((like) => setCards((state) => state.map((c) => c._id === card._id ? like : c)))
        .catch((error) => console.log(error))
    }
  };

  const handleCardDelete = (card) => {
    setIsLoading(true)
    Api.deleteCard(card._id)
      .then(() => setCards(cards.filter((item) => item !== card)))
      .then(() => closeAllPopups())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false))
  }

  const handleDeleteClick = (card) => {
    setDeletePopupOpen(true);
    setDeletedCard(card)
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.checkToken(token)
        .then((response) => {
          if (response) {
            setEmail(response.data.email);
            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Api.getUserInfo()
        .then((info) => setCurrentUser(info))
        .catch((error) => console.log(error));
      Api.getInitialCards()
        .then((initialCards) => setCards(initialCards))
        .catch((error) => console.log(error));
    }
  }, [loggedIn]);

  const history = useHistory();
  const handleRegisterSubmit = (password, email) => {
    auth.register(password, email)
      .then(() => {
        setImage(success);
        setText('Вы успешно зарегистрировались!');
      })
      .then(() => history.push('/sign-in'))
      .catch((error) => {
        console.log(error);
        setImage(reject);
        setText('Что-то пошло не так! Попробуйте ещё раз.');
      })
      .finally(() => setIsInfoTooltipPopupOpen(true));
  }
  const handleLoginSubmit = (password, email) => {
    if (!email || !password) {
      return;
    }
    auth.authorize(password, email)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setEmail(email);
        setLoggedIn(true);
        history.push("/");
        return data;
      })
      .catch((error) => {
        console.log(error);
        setIsInfoTooltipPopupOpen(true);
        setImage(reject);
        setText('Что-то пошло не так! Попробуйте ещё раз.');
      });
  }

  return (
    <div className="wrapper">
      <CurrentUserContext.Provider value={currentUser}>
      <Header setLoggedIn={setLoggedIn} email={email} />
      <Switch>

        <ProtectedRoute
          exact
          path="/"
          loggedIn={loggedIn}
          component={Main}
          onCardClick={(card) => setSelectedCard(card)}
          onEditProfile={() => setEditProfilePopupOpen(true)}
          onAddPlace={() => setAddPlacePopupOpen(true)}
          onEditAvatar={() => setEditAvatarPopupOpen(true)}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteClick}
          cards={cards}
        />

        <Route path="/sign-in">
          <Login handleLoginSubmit={handleLoginSubmit} />
        </Route>

        <Route path="/sign-up">
          <Register handleRegisterSubmit={handleRegisterSubmit} />
        </Route>

        <Route>
          <Redirect to="/" />
        </Route>

      </Switch>

      <InfoTooltip
        image={image}
        text={text}
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeAllPopups}
      />

      <Footer/>

      <EditProfilePopup
        isLoading={isLoading}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isLoading={isLoading}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <EditAvatarPopup
        isLoading={isLoading}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <ConfirmationPopup
        isLoading={isLoading}
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
        deleteCard={handleCardDelete}
        card={deletedCard}
      />

      <ImagePopup
        onClose={closeAllPopups}
        card={selectedCard}
      />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
