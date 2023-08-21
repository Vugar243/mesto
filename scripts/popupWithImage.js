import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image-image');
    this._caption = this._popup.querySelector('.popup__image-title');
  }

  open(imageSrc, imageCaption) {
    this._image.src = imageSrc;
    this._image.alt = imageCaption;
    this._caption.textContent = imageCaption;
    super.open();
  }
}