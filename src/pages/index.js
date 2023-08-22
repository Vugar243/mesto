import './index.css';
import { Card } from '../components/Card.js';
import { initialCards, editButton, inputName, inputDescription, profileAddButton, cardForm, } from '../components/constants.js';
import { FormValidator } from '../components/Formvalidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
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
function handleFormSubmit(formData) {
  userInfo.setUserInfo(formData);
  editProfileFormPopup.close();
}

const openPopupWithImage = new PopupWithImage('.popup-image');
openPopupWithImage.setEventListeners();
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
function handleFormSumbitAddingCard(formData) {

  // Создаем экземпляр карточки с новыми данными
  const newCardElement = createCard(formData);

  // Добавляем карточку в секцию и отрисовываем ее
  section.addItem(newCardElement);
  
  popupAddingCard.close();

  validators[cardForm.getAttribute('name')].toggleButtonState();
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