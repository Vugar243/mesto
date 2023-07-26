import { popupImage, popupImageImage, popupImageTitle, openPopup} from './index.js';
export class Card {
  constructor(name, link, alt) {
    this._name = name;
    this._link = link;
    this._alt = alt;
  }
  
  _getTemplate() {
    const cardElement = document.querySelector('.element-template').content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _handleLike() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    });
  }

  _handleDelete() {
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._element.remove();
    });
  }

  _handleImageClick() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPopupImage();
    });
  }

  _openPopupImage() {
    openPopup(popupImage);

    popupImageTitle.textContent = this._name;
    popupImageImage.src = this._link;
    popupImageImage.alt = this._alt;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._alt;

    this._handleLike();
    this._handleDelete();
    this._handleImageClick();

    // Вернём элемент наружу
    return this._element;
  }
}