export class Card {
  constructor({ name, link, alt, owner }, templateSelector, handleCardClick, currentUserId, openPopupDeleteConfirm, confirmButtonSelector) {
    this._name = name;
    this._link = link;
    this._alt = alt;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._isOwner = (owner._id === currentUserId);
    this._openPopupDeleteConfirm = openPopupDeleteConfirm;

    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete');
    this._popupСonfirmButton = document.querySelector(confirmButtonSelector);
    // Привязываем обработчики к текущему экземпляру класса
    this._handleLike = () => this._toggleLike();
    this._handleDelete = () => this._removeCard();
    this._handleOpenPopupDelete = () => this._openPopupDeleteConfirm();
    this._handleImageClick = () => this._handleCardClick(this._name, this._link, this._alt);

    this._setEventListeners();
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _toggleLike() {
    this._likeButton.classList.toggle('element__like-button_active');
  }
  _createDeleteButton() {
    // Проверяем, является ли текущий пользователь владельцем карточки
    if (!this._isOwner) {
      this._deleteButton.style.display = 'none'; // Если владелец, показать иконку удаления
    }
  }

  _removeCard() {
      this._element.remove();
  }

  _openPopupDeleteConfirm() {
    this._openPopupDeleteConfirm;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLike);
    this._deleteButton.addEventListener('click', this._handleOpenPopupDelete);
    this._popupСonfirmButton.addEventListener('click', this._handleDelete);
    this._elementImage.addEventListener('click', this._handleImageClick);
  }

  createCard() {
    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._alt;
    this._createDeleteButton();
    // Вернём элемент наружу
    return this._element;
  }
}
