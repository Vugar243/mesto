import '../pages/index.css';
import { Card } from './Card.js';
import { initialCards, editButton, infoTitle, infoSubtitle, inputName, 
  inputDescription, profileAddButton, addingCard, editProfile, profileForm, 
  cardForm, popups, inputTitle, inputLink, popupImage } from './constants.js';
import { FormValidator } from './Formvalidator.js';
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
const editProfilePopup = new Popup('.popup_edit-profile');
// Создание экземпляра класса Popup
const userInfo = new UserInfo({ nameSelector: '.profile-info__title', aboutSelector: '.profile-info__subtitle' });
// Создание экземпляра класса UserInfo
function openPopupEditProfile() {
  const currentUserInfo = userInfo.getUserInfo();
  inputName.value = currentUserInfo.name;
  inputDescription.value = currentUserInfo.about;
  editProfilePopup.open();
}
// открытие popup редактирования
editButton.addEventListener('click', openPopupEditProfile);
// Добавление обработчика клика на кнопку редактирования
const editProfileFormPopup = new PopupWithForm('.popup_edit-profile', handleFormSubmit);
editProfileFormPopup.setEventListeners();
function handleFormSubmit() {
  const formData = editProfileFormPopup._getInputValues();
  userInfo.setUserInfo(formData);
  editProfileFormPopup.close();
}

const openPopupWithImage = new PopupWithImage('.popup-image');

function handleCardClick(name, link, alt) {
  openPopupWithImage.open(link, name, alt);
}
// функция открытия popup фото

const createCard = (item) => {
  const card = new Card(item, '.element-template', handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
};

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    section.addItem(cardElement);
  }
}, '.elements');

// Отрисовка карточек
section.renderItems();

const popupAddingCard = new PopupWithForm('.popup_adding-card', handleFormSumbitAddingCard);
popupAddingCard.setEventListeners();

function openPopupAddingCard() {
  popupAddingCard.open();
}
profileAddButton.addEventListener('click', openPopupAddingCard);
// открытие popup добавления карточек
function handleFormSumbitAddingCard() {
  const formData = popupAddingCard._getInputValues();

  // Создаем экземпляр карточки с новыми данными
  const newCardElement = createCard(formData);

  // Добавляем карточку в секцию и отрисовываем ее
  section.addItem(newCardElement);

  cardForm.reset();
  validators[cardForm.getAttribute('name')].toggleButtonState();

  popupAddingCard.close();
}
//функция добоваления карточек


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
popups.forEach(() => {
  openPopupWithImage.setEventListeners();
});
//Закрытие попапа кликом на оверлей
// закрытие popup редактирования 
// закрытие popup добавления карточек
//закрытие popup фото