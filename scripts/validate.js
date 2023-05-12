const popupForm = document.querySelector('.popup__form');
const formInput = popupForm.querySelector('.popup__input');
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input, .popup__textarea'));
  inputList.forEach((inputElement) => {
    const buttonElement = formElement.querySelector('.form__submit');
    toggleButtonState (inputList, buttonElement);
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
        });
      });
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__form'));

fieldsetList.forEach((fieldSet) => {
  setEventListeners(fieldSet);
});
    setEventListeners(formElement);
  });
};

enableValidation();
function hasInvalidInput (inputList){
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
};
function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add('popup__button_inactive');
}else{
  buttonElement.classList.remove('popup__button_inactive');
}
  };
