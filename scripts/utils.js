export const popupImage = document.querySelector('.popup-image');
export const popupImageImage = document.querySelector('.popup__image-image');
export const popupImageTitle = document.querySelector('.popup__image-title');
export function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}
//открытие popup
export function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup (openedPopup);
  }
};
//закрытие popup
export function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape); 
}
//закрытие popup