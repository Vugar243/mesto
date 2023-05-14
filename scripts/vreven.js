

const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, enableValidation) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, enableValidation);
  } else {
    hideInputError(formElement, inputElement, enableValidation);
  }
};

const setEventListeners = (formElement, enableValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
  const buttonElement = formElement.querySelector(enableValidation.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, enableValidation);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, enableValidation);
      toggleButtonState(inputList, buttonElement, enableValidation);
    });
  });
};

const enableValidation = (enableValidation) => {
  const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, enableValidation);
  });
};

function hasInvalidInput (inputList){
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
};

function toggleButtonState (inputList, buttonElement, {inactiveButtonClass}) {
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', '');
} else {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-submit',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});