const apiConfig = {
  url: "https://nomoreparties.co/v1/wff-cohort-8/",
  headers: {
    authorization: "024e4f55-bbae-4cf9-b5c0-d8b0aa4321f5",
    "Content-Type": "application/json",
  },
};

//Загрузка информации о пользователе с сервера 
export function getProfileSerever() {
  return fetch(`${apiConfig.url}/users/me`, {
    headers: apiConfig.headers,
  }).then(handleResponse);
}

//Загрузка карточек с сервера 
export function getCardsServer() {
  return fetch(`${apiConfig.url}/cards`, {
    headers: apiConfig.headers,
  }).then(handleResponse);
}

//Редактирование профиля 
export function editProfileServer(data) {
  return fetch(`${apiConfig.url}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about,
    }),
  }).then(handleResponse);
}

//Добавление новой карточки 
export function addCardsServer(newCard) {
  return fetch(`${apiConfig.url}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link,
    }),
  }).then(handleResponse);
}

//Удаление карточки 
export function deleteCardServer(cardId) {
  return fetch(`${apiConfig.url}/cards/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(handleResponse);
}

//Удаление лайка 
export function deleteLikeServer(cardId) {
  return fetch(`${apiConfig.url}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(handleResponse);
}

//Добавление лайка 
export function addLikeServer(cardId) {
  return fetch(`${apiConfig.url}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: apiConfig.headers,
  }).then(handleResponse);
}

//Обновление аватара пользователя 

export function editAvatarServer(url) {
  return fetch(`${apiConfig.url}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: url
    }),
  }).then(handleResponse);
}

function handleResponse(response) {
  if (response.ok) return response.json();
  else return Promise.reject(`Ошибка: ${response.status}`);
}
