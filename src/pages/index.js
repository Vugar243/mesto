import './index.css';
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
const userInfo = new UserInfo({ nameSelector: '.profile-info__title', aboutSelector: '.profile-info__subtitle', avatarSelector: '.profile-container__avatar' });

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
      editProfileFormPopup.close();
    })
    .catch((error) => {
      console.error(`Ошибка при обновлении данных пользователя: ${error}`);
    })
    .finally(() => {
      saveButtonProfile.textContent = 'Сохранить';
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
  validators[cardForm.getAttribute('name')].forceButtonState(saveButtonAddingCard);
}
profileAddButton.addEventListener('click', openPopupAddingCard);

const popupEditAvatar = new PopupWithForm('.popup_edit-avatar', handleFormSumbitEditAvatar);
popupEditAvatar.setEventListeners();

function openPopupEditAvatar() {
  popupEditAvatar.open();
  validators[cardForm.getAttribute('name')].forceButtonState(saveButtonEditAvatar);
}
editButtonAvatar.addEventListener('click', openPopupEditAvatar);

function handleFormSumbitEditAvatar(formData) {
  saveButtonEditAvatar.textContent = 'Сохранение...';
  api.updateAvatar(formData)
    .then(() => {
      const { avatar } = formData;
      editButtonAvatar.src = avatar;
      popupEditAvatar.close();
    })
    .catch((error) => {
      console.error(`Ошибка при обновлении аватара пользователя: ${error}`);
    })
    .finally(() => {
      saveButtonEditAvatar.textContent = 'Сохранить';
    });
}
const popupConfirm = new PopupConfirmDelete('.popup_delete-confirm', handleFormSubmitConfirmDelete);
popupConfirm.setEventListeners();



function openPopupConfirm(_id) {
  popupConfirm.open(_id);
  id = _id;
}

function handleFormSubmitConfirmDelete() {
  const cardToRemove = document.getElementById(id);
  api.deleteCard(id)
    .then(() => {
      cardToRemove.remove();
      popupConfirm.close();
    })
    .catch((error) => {
      console.error(`Ошибка при удалении карточки: ${error}`);
    });
}

function handlelikeCard(cardId) {
  api.likeCard(cardId)
    .then((res) => {
      const cardToLike = document.getElementById(cardId);
      const likesCountElement = cardToLike.querySelector('.element__likes-count');
      likesCountElement.textContent = res.likes.length;
      const likeButton = cardToLike.querySelector('.element__like-button');
      likeButton.classList.add('element__like-button_active');
    })
    .catch((error) => {
      console.error(`Ошибка при лайке карточки: ${error}`);
    });
}
  
function handledislikeCard(cardId) {
  api.dislikeCard(cardId)
    .then((res) => {
      const cardToDislike = document.getElementById(cardId);
      const likesCountElement = cardToDislike.querySelector('.element__likes-count');
      likesCountElement.textContent = res.likes.length;
      const likeButton = cardToDislike.querySelector('.element__like-button');
      likeButton.classList.remove('element__like-button_active');
    })
    .catch((error) => {
      console.error(`Ошибка при дизлайке карточки: ${error}`);
    });
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    // Установка данных пользователя
    const { name, about, avatar, _id } = userData;
    userInfo.setUserInfo({ name, about, avatar, _id });
    editButtonAvatar.src = avatar;
    currentUserId = _id;

    // Отрисовка карточек
    sectionAddCards.renderItems(initialCards);
  })
  .catch((err) => {
    // Обработка ошибки
    console.error(err);
  });

function handleFormSumbitAddingCard(formData) {
  saveButtonAddingCard.textContent = 'Сохранение...';
  api.addCard(formData)
    .then((newCardData) => {
      const newCardElement = createCard(newCardData);
      sectionAddCards.addItem(newCardElement);
      popupAddingCard.close();
    })
    .catch((error) => {
      console.error(`Ошибка при добавлении новой карточки: ${error}`);
    })
    .finally(() => {
      saveButtonAddingCard.textContent = 'Создать';
    });
}
// Обработчик добавления новой карточки
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