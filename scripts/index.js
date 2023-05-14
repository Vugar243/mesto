const editButton = document.querySelector('.profile-info__edit-button');
const closePopupEditProfileButton = document.querySelector('.popup__close-button');
//const form = document.querySelector('.popup__container');
const infoTitle = document.querySelector('.profile-info__title');
const infoSubtitle = document.querySelector('.profile-info__subtitle');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const profileAddButton = document.querySelector('.profile__add-button');
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
const body = document.querySelector('.body');
const popups = document.querySelectorAll('.popup');
const popupSaveButtonSubmit = document.querySelector('.popup__save-button-submit');
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}
//открытие popup
function closePopup (popup) {
   popup.classList.remove('popup_opened');
   document.removeEventListener('keydown', closeByEscape); 
}
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
function closePopupEditProfile() {
  closePopup(editProfile);
}
closePopupEditProfileButton.addEventListener('click', closePopupEditProfile);
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
};
popupImageClose.addEventListener('click', closePopupImage);
//закрытие popup фото
function createCard(element) {
  const cardTemplate = document.querySelector('.element-template').content;
  const directorElement = cardTemplate.cloneNode(true);
  const elementImage = directorElement.querySelector('.element__image');
  directorElement.querySelector('.element__title').textContent = element.name;
  elementImage.src = element.link;
  elementImage.alt = element.alt;
  
  directorElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });
  const elementCard = directorElement.querySelector('.element');
  const deleteButton = elementCard.querySelector('.element__delete');
  function deleteCard () {
    elementCard.remove();
  }
  deleteButton.addEventListener('click', deleteCard);
  function openPopupImage () {
    openPopup(popupImage);
    popupImageTitle.textContent = element.name;
    popupImageImage.src = element.link;
    popupImageImage.alt = element.alt;
  }
  elementImage.addEventListener('click', openPopupImage);
  enableValidation(enableValidation);
  return directorElement
}
//функция создания карточки
initialCards.forEach(function (element) {
  elementsList.append(createCard(element));
});

//функция добавления карточек из масива

function handleFormSumbitAddingCard(evt) {
  evt.preventDefault();
  const inputTitleValue = inputTitle.value;
  const inputLinkValue = inputLink.value;
  elementsList.prepend(createCard({ name: inputTitleValue, link: inputLinkValue,  }));
  popupSaveButtonSubmit.setAttribute('disabled', '');
  popupSaveButtonSubmit.classList.add('popup__button_inactive');
  cardForm.reset();
  closePopup(addingCard);
}
cardForm.addEventListener("submit", handleFormSumbitAddingCard);
//функция добоваления карточек
function handleEscape(evt) {
  if (evt.key === 'Escape') {
    popups.forEach(popup => closePopup(popup));
  }
}

//Закрытие попапа нажатием на Esc 
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
  })
});
//Закрытие попапа кликом на оверлей
