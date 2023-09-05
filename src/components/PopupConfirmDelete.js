import { Popup } from './Popup.js';

export class PopupConfirmDelete extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._submitButton = this._popup.querySelector('.popup__save-button');
    this._form = this._popup.querySelector('.popup__form');
  }

  setSubmitCallback(callback) {
    this._submitCallback = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', event => {
      event.preventDefault();
    });
  }

  open() {
    super.open();
    this._submitButton.addEventListener('click', this._submitCallback);
  }

  close() {
    super.close();
    this._submitButton.removeEventListener('click', this._submitCallback);
  }
}