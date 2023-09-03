//import './index.css';
import { Card } from '../components/Card.js';
import { Api } from '../components/Api.js';
import { deleteButtonCard, editButtonProfile, inputName, inputDescription, profileAddButton, cardForm, editButtonAvatar } from '../components/constants.js';
import { FormValidator } from '../components/Formvalidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-74',
  headers: {
    authorization: '4549333d-9f3f-4884-90e6-025358e71c4d',
    'Content-Type': 'application/json'
  }
});
const editProfilePopup = new Popup('.popup_edit-profile');
// Создание экземпляра класса Popup
const userInfo = new UserInfo({ nameSelector: '.profile-info__title', aboutSelector: '.profile-info__subtitle' });
let currentUserId;
api.getUserInfo()
  .then((userData) => {
    const { name, about, avatar, _id } = userData;
    userInfo.setUserInfo({ name, about });
    editButtonAvatar.src = avatar;
    currentUserId = _id;
  })
// Создание экземпляра класса UserInfo
function openPopupEditProfile() {
  const currentUserInfo = userInfo.getUserInfo();
  inputName.value = currentUserInfo.name;
  inputDescription.value = currentUserInfo.about;
  editProfilePopup.open();
}
// открытие popup редактирования
editButtonProfile.addEventListener('click', openPopupEditProfile);
// Добавление обработчика клика на кнопку редактирования
const editProfileFormPopup = new PopupWithForm('.popup_edit-profile', handleFormSubmitEditProfile);
editProfileFormPopup.setEventListeners();
function handleFormSubmitEditProfile(formData) {
  userInfo.setUserInfo(formData);
  api.updateUserInfo(formData);
  editProfileFormPopup.close();
}

const openPopupWithImage = new PopupWithImage('.popup-image');
openPopupWithImage.setEventListeners();
function handleCardClick(name, link, alt) {
  openPopupWithImage.open(link, name, alt);
}



// функция открытия popup фото
const popupAddingCard = new PopupWithForm('.popup_adding-card', handleFormSumbitAddingCard);
popupAddingCard.setEventListeners();

function openPopupAddingCard() {
  popupAddingCard.open();
}
profileAddButton.addEventListener('click', openPopupAddingCard);

const popupEditAvatar = new PopupWithForm('.popup_edit-avatar', handleFormSumbitEditAvatar);
popupEditAvatar.setEventListeners();

function openPopupEditAvatar() {
  popupEditAvatar.open();
}
editButtonAvatar.addEventListener('click', openPopupEditAvatar);

function handleFormSumbitEditAvatar(formData) {
  api.updateAvatar(formData);
  const { avatar } = formData;
  editButtonAvatar.src = avatar;
}
const popupDeleteConfirm = new PopupWithForm('.popup_delete-confirm', handleFormSumbitDeleteConfirm);
popupDeleteConfirm.setEventListeners();

function openPopupDeleteConfirm() {
  popupDeleteConfirm.open();
}
deleteButtonCard.addEventListener('click', openPopupDeleteConfirm);

function handleFormSumbitDeleteConfirm() {
  
}


const createCard = (item) => {
  const card = new Card(item, '.element-template', handleCardClick, currentUserId, openPopupDeleteConfirm, '.popup__confirm-button');
  const cardElement = card.createCard();
  return cardElement;
};
const sectionAddCards = new Section({
  items: [],
  renderer: (item) => {
    const cardElement = createCard(item);
    sectionAddCards.addItem(cardElement);
  }
}, '.elements');
api.getInitialCards()
  .then((data) => {
    sectionAddCards.renderItems(data);
  });
// Обработчик добавления новой карточки
function handleFormSumbitAddingCard(formData) {
  api.addCard(formData)
    .then((newCardData) => {
      const newCardElement = createCard(newCardData);
      sectionAddCards.addItem(newCardElement);
      popupAddingCard.close();
      validators[cardForm.getAttribute('name')].toggleButtonState();
    });
}







const validators = {};
const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((formElement) => {
  const formValidator = new FormValidator(formElement, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__form-submit',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
  });
  formValidator.enableValidation();
  validators[formElement.getAttribute('name')] = formValidator;
});