export class Card {
  constructor({ name, link, alt, owner, _id, likes }, templateSelector, handleCardClick, currentUserId, openPopupFunction, likeCard, dislikeCard) {
    this._name = name;
    this._link = link;
    this._alt = alt;
    this._likes = likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._isOwner = (owner._id === currentUserId);
    this._id = _id;
    this._openPopupFunction = openPopupFunction;
    this._likeCard = likeCard;
    this._dislikeCard = dislikeCard;
    this._isLiked = likes.some(like => like._id === currentUserId);

    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete');
    this._likesCount = this._element.querySelector('.element__likes-count');
    // Привязываем обработчики к текущему экземпляру класса
    this._handleLike = () => this._toggleLike();
    this._handleImageClick = () => this._handleCardClick(this._name, this._link, this._alt);
    this._handleConfirm = () => this._openPopupDeleteConfirm();
    this._createDeleteButton();
    this._setEventListeners();
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

 
  _createDeleteButton() {
    // Проверяем, является ли текущий пользователь владельцем карточки
    if (!this._isOwner) {
      this._deleteButton.classList.toggle('element__delete_hidden'); // Если владелец, показать иконку удаления
    }
  }
  _like() {
    this._likeCard(this._id);
  }

  _dislike() {
    this._dislikeCard(this._id);
  }

  


  _toggleLike() {
    if (this._isLiked) {
      this._likeButton.classList.toggle('element__like-button_active');
      this._isLiked = !this._isLiked;
      // Если лайк уже поставлен, снимаем его
      this._dislike(); // Дождитесь, пока _dislike завершится
    } else {
      this._likeButton.classList.toggle('element__like-button_active');
      this._isLiked = !this._isLiked;
      // Если лайк не поставлен, ставим его
      this._like(); // Дождитесь, пока _like завершится
    }
  }


  _openPopupDeleteConfirm() {
    this._openPopupFunction(this._id);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLike);
    this._elementImage.addEventListener('click', this._handleImageClick);
    this._deleteButton.addEventListener('click', this._handleConfirm);
  }

  createCard() {
    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._alt;
    this._element.id = this._id;
    this._likesCount.textContent = this._likes;
    if (this._isLiked) {
      this._likeButton.classList.add('element__like-button_active');
    }
    // Вернём элемент наружу
    return this._element;
  }
}
