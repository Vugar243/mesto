import { initialCards, Card } from './Card.js';
import { FormValidator } from './formValidator.js';
const editButton = document.querySelector('.profile-info__edit-button');
const infoTitle = document.querySelector('.profile-info__title');
const infoSubtitle = document.querySelector('.profile-info__subtitle');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const profileAddButton = document.querySelector('.profile__add-button');
const addingCard = document.querySelector('.popup_adding-card');
const editProfile = document.querySelector('.popup_edit-profile');
const elementsList = document.querySelector('.elements');
const profileForm = document.querySelector('.popup__form_profile-form');
const cardForm = document.querySelector('.popup__form_card-form');
export const popupImage = document.querySelector('.popup-image');
export const popupImageImage = document.querySelector('.popup__image-image');
export const popupImageTitle = document.querySelector('.popup__image-title');
const popups = document.querySelectorAll('.popup');
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');
export function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}
//открытие popup
function closePopup (popup) {
   popup.classList.remove('popup_opened');
   document.removeEventListener('keydown', closeByEscape); 
}
//закрытие popup
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup (openedPopup);
  }
};
//закрытие popup
function openPopupEditProfile() {
  inputName.value = infoTitle.textContent;
  inputDescription.value = infoSubtitle.textContent;
  openPopup(editProfile);
}
editButton.addEventListener('click', openPopupEditProfile);
// открытие popup редактирования 
function openPopupAddingCard() {
  openPopup(addingCard);
}
profileAddButton.addEventListener('click', openPopupAddingCard);
// открытие popup добавления карточек
function handleFormSumbitEditProfile(evt) {
  evt.preventDefault();
  infoTitle.textContent = inputName.value;
  infoSubtitle.textContent = inputDescription.value;
  closePopup(editProfile)
}
profileForm.addEventListener("submit", handleFormSumbitEditProfile);
// редактирование профиля
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, item.alt);
  const cardElement = card.generateCard();

  // Добавляем в DOM
  elementsList.append(cardElement);
});
//функция добавления карточек из масива
function handleFormSumbitAddingCard(evt) {
  evt.preventDefault();

  const inputTitleValue = inputTitle.value;
  const inputLinkValue = inputLink.value;

  const newCard = new Card(inputTitleValue, inputLinkValue);
  const cardElement = newCard.generateCard();

  elementsList.prepend(cardElement);

  // После добавления карточки на страницу, делаем кнопку неактивной
  evt.submitter.setAttribute('disabled', '');
  evt.submitter.classList.add('popup__button_inactive');

  cardForm.reset();
  closePopup(addingCard);
}
cardForm.addEventListener("submit", handleFormSumbitAddingCard);
//функция добоваления карточек
const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((formElement) => {
  const formValidator = new FormValidator(formElement, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__form-submit',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  });
  formValidator.enableValidation();
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
  })
});
//Закрытие попапа кликом на оверлей
// закрытие popup редактирования 
// закрытие popup добавления карточек
//закрытие popup фото