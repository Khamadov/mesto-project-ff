import './pages/index.css';
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import { initialCards } from "./scripts/constants.js";

const buttonEditPopup = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector("#popup-edit");
const buttonClosePopup = document.querySelectorAll(".popup__close");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__profession");
const formEdit = popupEdit.querySelector("#form-edit");
const nameInput = popupEdit.querySelector(".popup__input_type_name");
const jobInput = popupEdit.querySelector(".popup__input_type_job");

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

function openPopup(open) {
  document.addEventListener("keydown", closePopupKeydown);
  open.classList.add("popup_opened");
}

function closePopup(close) {
  document.removeEventListener("keydown", closePopupKeydown);
  close.classList.remove("popup_opened");
}

function openEditPopup() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closeEditPopup() {
  closePopup(popupEdit);
}

buttonClosePopup.forEach((btn) => {
  const popup = btn.closest(".popup");
  popup.addEventListener("click", closePopupOverlay);
  btn.addEventListener("click", () => closePopup(popup));
});

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function closePopupKeydown(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

formEdit.addEventListener("submit", handleFormSubmitEdit);
buttonEditPopup.addEventListener("click", openEditPopup);

const elementsList = document.querySelector(".elements");
const elementTemplate = document.querySelector(".element-template").content;
const addPopup = document.querySelector("#popup-add");
const addOpenPopupButton = document.querySelector(".profile__add-button");
const addForm = addPopup.querySelector("#form-add");
const imagePopup = document.querySelector("#popup-image");
const imagePopupPhoto = imagePopup.querySelector(".popup__photo");
const imagePopupSubtitle = imagePopup.querySelector(".popup__subtitle");
const photoInput = addForm.querySelector(".popup__input_type_link");
const placeInput = addForm.querySelector(".popup__input_type_place");

function renderInitialCards() {
  initialCards.forEach(renderItem);
}

function renderItem(item) {
  const newCard = new Card(item, "#template", openImagePopup);
  elementsList.prepend(newCard.createCard());
}

renderInitialCards();

function openImagePopup(link, name) {
  imagePopupPhoto.src = link;
  imagePopupPhoto.alt = name;
  imagePopupSubtitle.textContent = name;
  openPopup(imagePopup);
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  renderItem({ name: placeInput.value, link: photoInput.value });
  closePopup(addPopup);
  addCardValidator.resetButton();
}

function openAddPopup() {
  openPopup(addPopup);
  addForm.reset();
  addCardValidator.resetButton();
}

function closeAddPopup() {
  closePopup(addPopup);
}

function closeImagePopup() {
  closePopup(imagePopup);
}

addForm.addEventListener("submit", handleFormSubmitAdd);
addOpenPopupButton.addEventListener("click", openAddPopup);

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input-error_active",
};

const editProfileValidator = new FormValidator(validationConfig, formEdit);
editProfileValidator.enableValidation();

const addCardValidator = new FormValidator(validationConfig, addForm);
addCardValidator.enableValidation();
