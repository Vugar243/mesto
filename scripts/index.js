let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile-info__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let form = document.querySelector('.popup__container');
let infoTitle = document.querySelector('.profile-info__title');
let infoSubtitle = document.querySelector('.profile-info__subtitle');
let inputName = document.querySelector('.popup__input_type_name');
let inputDescription = document.querySelector('.popup__input_type_description');
let saveButton = document.querySelector('.popup__save-button');
function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = infoTitle.textContent;
  inputDescription.value = infoSubtitle.textContent;
}
editButton.addEventListener('click', openPopup);
function closePopup() {
  popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);
function handleFormSumbit(evt) {
  evt.preventDefault();
  infoTitle.textContent = inputName.value;
  infoSubtitle.textContent = inputDescription.value;
  closePopup()
}
form.addEventListener("submit", handleFormSumbit);