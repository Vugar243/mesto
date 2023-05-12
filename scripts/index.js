const editButton = document.querySelector('.profile-info__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const form = document.querySelector('.popup__container');
const infoTitle = document.querySelector('.profile-info__title');
const infoSubtitle = document.querySelector('.profile-info__subtitle');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const saveButton = document.querySelector('.popup__save-button');
const addButton = document.querySelector('.profile__add-button');
const addingCard = document.querySelector('.popup_adding-card');
const closeButtonAddingCard = document.querySelector('.popup__close-button_adding-card');
const editProfile = document.querySelector('.popup_edit-profile');
const elementTemplate = document.querySelector('.element-template').content;
const elementsList = document.querySelector('.elements');
const profileForm = document.querySelector('.popup__form_profile-form');
const cardForm = document.querySelector('.popup__form_card-form');
const likeButton = document.querySelector('.element__like-button');
const popupImage = document.querySelector('.popup-image');
const popupImageClose = document.querySelector('.popup__image-close-button');
const popupImageImage = document.querySelector('.popup__image-image');
const popupImageTitle = document.querySelector('.popup__image-title');
const elementImage = document.querySelector('.element__image');
const body = document.querySelector('.body');
const popup = document.querySelectorAll('.popup');
function openPopup (popup) {
  popup.classList.add('popup_opened');
  enableValidation();
}
//открытие popup
function closePopup (popup) {
   popup.classList.remove('popup_opened');
   enableValidation();
}
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
addButton.addEventListener('click', openPopupAddingCard);
// открытие popup добавления карточек
function closePopupEditProfile() {
  closePopup(editProfile);
}
closeButton.addEventListener('click', closePopupEditProfile);
// закрытие popup редактирования 
function closePopupAddingCard() {
  closePopup(addingCard);
}
closeButtonAddingCard.addEventListener('click', closePopupAddingCard);
// закрытие popup добавления карточек
function handleFormSumbitEditProfile(evt) {
  evt.preventDefault();
  infoTitle.textContent = inputName.value;
  infoSubtitle.textContent = inputDescription.value;
  closePopup(editProfile)
}
profileForm.addEventListener("submit", handleFormSumbitEditProfile);
// редактирование профиля 
function closePopupImage () {
  closePopup(popupImage);
}
popupImageClose.addEventListener('click', closePopupImage);
//закрытие popup фото
function createCard(element) {
  const cardTemplate = document.querySelector('.element-template').content;
  const directorElement = cardTemplate.cloneNode(true);
  
  directorElement.querySelector('.element__title').textContent = element.name;
  directorElement.querySelector('.element__image').src = element.link;
  directorElement.querySelector('.element__image').alt = element.alt;
  
  directorElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });
  directorElement.querySelector('.element');
  directorElement.querySelector('.element__delete');
  const elementCard = directorElement.querySelector('.element');
  const deleteButton = elementCard.querySelector('.element__delete');
  function deleteCard () {
    elementCard.remove();
  }
  deleteButton.addEventListener('click', deleteCard);
  const elementImage = elementCard.querySelector('.element__image');
  function openPopupImage () {
    openPopup(popupImage);
    popupImageTitle.textContent = element.name;
    popupImageImage.src = element.link;
  }
  elementImage.addEventListener('click', openPopupImage);
  return directorElement
}
//функция создания карточки
initialCards.forEach(function (element) {
  elementsList.append(createCard(element));
});
//функция добавления карточек из масива
function handleFormSumbitAddingCard(evt) {
  evt.preventDefault();
  const inputTitle = document.querySelector('.popup__input_type_title').value;
  const inputLink = document.querySelector('.popup__input_type_link').value;
  elementsList.prepend(createCard({ name: inputTitle, link: inputLink,  }));
  cardForm.reset();
  closePopup(addingCard);
}
cardForm.addEventListener("submit", handleFormSumbitAddingCard);
//функция добоваления карточек
function keyHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup(editProfile);
    closePopup(addingCard);
    closePopup(popupImage);
  }
}
body.addEventListener('keydown', keyHandler);
//Закрытие попапа нажатием на Esc 
body.addEventListener('click', function (evt) {
  popup.forEach(function (popup) {
    if (evt.target.classList.contains('popup') ) {
      closePopup(popup);
      }
  })});
//Закрытие попапа кликом на оверлей
