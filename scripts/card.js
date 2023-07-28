import { popupImage, popupImageImage, popupImageTitle, openPopup } from './utils.js';
export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();

    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete');
    
    // Привязываем обработчики к текущему экземпляру класса
    this._handleLike = () => this._toggleLike();
    this._handleDelete = () => this._removeCard();
    this._handleImageClick = () => this._openPopupImage();
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _toggleLike() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _removeCard() {
    this._element.remove();
  }

  _openPopupImage() {
    openPopup(popupImage);

    popupImageTitle.textContent = this._name;
    popupImageImage.src = this._link;
    popupImageImage.alt = this._alt;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLike);
    this._deleteButton.addEventListener('click', this._handleDelete);
    this._elementImage.addEventListener('click', this._handleImageClick);
  }

  createCard() {
    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._alt;

    this._setEventListeners();
    
// Вернём элемент наружу
    return this._element;
  }
}