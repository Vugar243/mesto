const popup = document.querySelector('.popup');
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
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');
const profileForm = document.querySelector('.popup__form_profile-form');
const cardForm = document.querySelector('.popup__form_card-form');
const likeButton = document.querySelector('.element__like-button');
const popupImage = document.querySelector('.popup-image');
const popupImageClose = document.querySelector('.popup__image-close-button');
const popupImageImage = document.querySelector('.popup__image-image');
const popupImageTitle = document.querySelector('.popup__image-title');
const elementImage = document.querySelector('.element__image');
function openPopup (popup) {
  popup.classList.add('popup_opened');
}
//открытие popup
function closePopup (popup) {
   popup.classList.remove('popup_opened');
}
//закрытие popup
function openPopupEditProfile() {
  inputName.value = infoTitle.textContent;
  inputDescription.value = infoSubtitle.textContent;
  openPopup(editProfile)
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
function AddingCard(element) {
  const cardTemplate = document.querySelector('.element-template').content;
  const directorElement = cardTemplate.cloneNode(true);
  
  directorElement.querySelector('.element__title').textContent = element.name;
  directorElement.querySelector('.element__image').src = element.link;
  
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
  function closePopupImage () {
    closePopup(popupImage);
  }
  popupImageClose.addEventListener('click', closePopupImage);

  elementsList.append(directorElement);
}
//функция добоваления карточек
initialCards.forEach(function (element) {
  AddingCard(element);
});
function handleFormSumbitAddingCard(evt) {
  evt.preventDefault();
  const cardTemplate = document.querySelector('.element-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = inputLink.value;
  cardElement.querySelector('.element__title').textContent = inputTitle.value;

  cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });
  cardElement.querySelector('.element__delete');
  const deleteButton = cardElement.querySelector('.element__delete');

  function deleteCard () {
    cardElement.remove('element_delete');
  }
  deleteButton.addEventListener('click', deleteCard);
  const elementImage = cardElement.querySelector('.element__image');
  function openPopupImage () {
    openPopup(popupImage);
    popupImageTitle.textContent = cardElement.querySelector('.element__title').textContent;
    popupImageImage.src = cardElement.querySelector('.element__image').src;
  }
  elementImage.addEventListener('click', openPopupImage);


  elementsList.prepend(cardElement);
  closePopup(addingCard);
}
cardForm.addEventListener("submit", handleFormSumbitAddingCard);