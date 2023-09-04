//import './index.css';
let id;
let currentUserId;
import { Card } from '../components/Card.js';
import { Api } from '../components/Api.js';
import { saveButtonEditAvatar, saveButtonAddingCard, saveButtonProfile, editButtonProfile, inputName, inputDescription, profileAddButton, cardForm, editButtonAvatar } from '../components/constants.js';
import { FormValidator } from '../components/Formvalidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupConfirmDelete } from '../components/PopupConfirmDelete.js';
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
  saveButtonProfile.textContent = 'Сохранение...';
  api.updateUserInfo(formData)
    .then((updatedData) => {
      userInfo.setUserInfo(updatedData);
    })
    .finally(() => {
      saveButtonProfile.textContent = 'Сохранить';
      editProfileFormPopup.close();
    });
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
  saveButtonEditAvatar.textContent = 'Сохранение...';
  api.updateAvatar(formData)
  .finally(() => {
    saveButtonEditAvatar.textContent = 'Сохранить';
    popupEditAvatar.close();
  });
  const { avatar } = formData;
  editButtonAvatar.src = avatar;
}
const popupConfirm = new PopupConfirmDelete('.popup_delete-confirm', handleFormSubmitConfirmDelete);
popupConfirm.setEventListeners();


//let id;
function openPopupConfirm(_id) {
  popupConfirm.open(_id);
  id = _id;
}

function handleFormSubmitConfirmDelete() {
  const cardToRemove = document.getElementById(id);
  api.deleteCard(id);
  cardToRemove.remove();
  }

  function handlelikeCard(cardId) {
    const cardToLike = document.getElementById(cardId);
    const likesCountElement = cardToLike.querySelector('.element__likes-count');
    const currentLikesCount = parseInt(likesCountElement.textContent);
    const newLikesCount = currentLikesCount + 1;
    likesCountElement.textContent = newLikesCount;
    api.likeCard(cardId);
  }
  
  function handledislikeCard(cardId) {
    api.dislikeCard(cardId);
    const cardToLike = document.getElementById(cardId);
    const likesCountElement = cardToLike.querySelector('.element__likes-count');
    const currentLikesCount = parseInt(likesCountElement.textContent);
    const newLikesCount = currentLikesCount - 1;
    likesCountElement.textContent = newLikesCount;
  }
const createCard = (item) => {
  const card = new Card(item, '.element-template', handleCardClick, currentUserId, openPopupConfirm, handlelikeCard, handledislikeCard);
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
  saveButtonAddingCard.textContent = 'Сохранение...';
  api.addCard(formData)
    .then((newCardData) => {
      const newCardElement = createCard(newCardData);
      sectionAddCards.addItem(newCardElement);
    })
    .finally(() => {
      saveButtonAddingCard.textContent = 'Создать';
      popupAddingCard.close();
      saveButtonAddingCard.classList.add('popup__button_inactive');
      saveButtonAddingCard.setAttribute('disabled', '');
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