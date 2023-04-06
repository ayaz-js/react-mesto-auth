export const BASE_URL = 'https://auth.nomoreparties.co';

const getResponse = (response) => {
  if (!response.ok) {
    return Promise.reject(response.status);
  }
  return response.json();
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((response) => getResponse(response));
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((response) => getResponse(response));
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: `GET`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => getResponse(response));
};
