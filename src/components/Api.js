export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
      .then(this._checkResponse)
      .catch(err => Promise.reject(`Ошибка при получении карточек: ${err}`));
  }
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(this._checkResponse)
      .catch(err => Promise.reject(`Ошибка при получении информации о пользователе: ${err}`));
  }
  updateUserInfo({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._checkResponse)
      .catch(err => Promise.reject(`Ошибка при обновлении информации о пользователе: ${err}`));
  }
  addCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._checkResponse)
      .catch(err => Promise.reject(`Ошибка при добавлении карточки: ${err}`));
  }
  updateAvatar({ avatar }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
      .then(this._checkResponse)
      .catch(err => Promise.reject(`Ошибка при обновлении информации о пользователе: ${err}`));
  }
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._checkResponse)
      .catch(err => Promise.reject(`Ошибка при удалении карточки: ${err}`));
  }
  likeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers,
    })
      .then(this._checkResponse)
      .catch(err => Promise.reject(`Ошибка при постановке лайка: ${err}`));
  }

  dislikeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._checkResponse)
      .catch(err => Promise.reject(`Ошибка при снятии лайка: ${err}`));
  }
}


  // другие методы работы с API

//Высылаю данные для 9-й проектной работы:


//Токен: 4549333d-9f3f-4884-90e6-025358e71c4d
//Идентификатор группы: cohort-74