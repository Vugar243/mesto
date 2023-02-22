let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile-info__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let form = document.querySelector('.popup__container');
let infoTitle = document.querySelector('.profile-info__title');
let infoSubtitle = document.querySelector('.profile-info__subtitle');
let inputName = document.querySelector('.popup__input_type_name');
let inputDescription = document.querySelector('.popup__input_type_description');
let saveButton = document.querySelector('.popup__save-button');
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
const popupImageClose = document.querySelector('.popup-image__close-button');
const popupImageImage = document.querySelector('.popup-image__image');
const popupImageTitle = document.querySelector('.popup-image__title');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
initialCards.forEach(function (element) {
  const directorElement = elementTemplate.cloneNode(true);
  
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
    elementCard.classList.toggle('element_delete');
  }
  deleteButton.addEventListener('click', deleteCard)
  
  const elementImage = elementCard.querySelector('.element__image');
  
  function openPopupImage () {
    popupImage.classList.toggle('popup-image_opened');
    popupImageTitle.textContent = element.name;
    popupImageImage.src = element.link;
  }
  elementImage.addEventListener('click', openPopupImage);
  function closePopupImage () {
    popupImage.classList.remove('popup-image_opened');
  }
  popupImageClose.addEventListener('click', closePopupImage);

  elementsList.append(directorElement);
});
function openPopupEditProfile() {
  editProfile.classList.toggle("popup_opened");
  inputName.value = infoTitle.textContent;
  inputDescription.value = infoSubtitle.textContent;
}
editButton.addEventListener('click', openPopupEditProfile);
function openPopupAddingCard() {
  addingCard.classList.toggle("popup_opened");
}
addButton.addEventListener('click', openPopupAddingCard);
function closePopup() {
  editProfile.classList.remove("popup_opened");
  addingCard.classList.remove("popup_opened");
}
closeButton.addEventListener('click', closePopup);
closeButtonAddingCard.addEventListener('click', closePopup);
function handleFormSumbitEditProfile(evt) {
  evt.preventDefault();
  infoTitle.textContent = inputName.value;
  infoSubtitle.textContent = inputDescription.value;
  closePopup()
}
profileForm.addEventListener("submit", handleFormSumbitEditProfile);
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
    cardElement.classList.toggle('element_delete');
  }
  deleteButton.addEventListener('click', deleteCard);

  const elementImage = cardElement.querySelector('.element__image');
  function openPopupImage () {
    popupImage.classList.toggle('popup-image_opened');
    popupImageTitle.textContent = cardElement.querySelector('.element__title').textContent;
    popupImageImage.src = cardElement.querySelector('.element__image').src;
  }
  elementImage.addEventListener('click', openPopupImage);


  elementsList.prepend(cardElement);
  closePopup();
  
}
cardForm.addEventListener("submit", handleFormSumbitAddingCard);