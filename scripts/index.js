//import '../pages/index.css';
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
const editProfileFormPopup = new PopupWithForm('.popup_edit-profile');

function handleFormSumbitEditProfile(formData) {
  userInfo.setUserInfo(formData);
  editProfileFormPopup.close();
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  const formData = editProfileFormPopup._getInputValues();
  handleFormSumbitEditProfile(formData);
}

profileForm.addEventListener("submit", handleFormSubmit);
// Добавление обработчика сабмита на форму редактирования профиля

function handleCardClick(name, link, alt) {
  const popupWithImage = new PopupWithImage('.popup-image');
  popupWithImage.open(link, name, alt);
}
// функция открытия popup фото
const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.element-template', handleCardClick);
    const cardElement = card.createCard();
    section.addItem(cardElement);
  }
}, '.elements');

// Отрисовка карточек
section.renderItems();
//функция добавления карточек из масива

const popupAddingCard = new Popup('.popup_adding-card');

function openPopupAddingCard() {
  popupAddingCard.open();
}
profileAddButton.addEventListener('click', openPopupAddingCard);
// открытие popup добавления карточек
function handleFormSumbitAddingCard(evt) {
  evt.preventDefault();

  const inputTitleValue = inputTitle.value;
  const inputLinkValue = inputLink.value;

  const newCardData = { name: inputTitleValue, link: inputLinkValue, alt: inputTitleValue };
  
  // Создаем экземпляр карточки с новыми данными
  const newCard = new Card(newCardData, '.element-template', handleCardClick);
  
  // Добавляем карточку в секцию и отрисовываем ее
  section.addItem(newCard.createCard());
  
  cardForm.reset();

  validators[cardForm.getAttribute('name')].toggleButtonState();

  popupAddingCard.close();
}

cardForm.addEventListener("submit", handleFormSumbitAddingCard);
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
  const popupInstance = new Popup('.popup');
  popupInstance.setEventListeners();
});
//Закрытие попапа кликом на оверлей
// закрытие popup редактирования 
// закрытие popup добавления карточек
//закрытие popup фото