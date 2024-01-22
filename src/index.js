import "./pages/index.css";
import { initialCards } from "./scripts/cards";
import { openPopup, closePopup, buttonClose } from "./scripts/modal";
import { createCard } from "./scripts/card";

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const openEditPopupButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const openAddPopupButton = document.querySelector(".profile__add-button");
const editForm = editPopup.querySelector(".popup__form");
const buttonClosePopup = document.querySelectorAll(".popup__close");
const imagePopup = document.querySelector(".popup_type_image");
const addForm = addPopup.querySelector(".popup__form");
const photoInput = addForm.querySelector(".popup__input_type_url");
const placeInput = addForm.querySelector(".popup__input_type_card-name");
const image = imagePopup.querySelector(".popup__image");
const subtitle = imagePopup.querySelector(".popup__caption");
const listElement = document.querySelector(".places__list");

function renderInitialCards(item) {
  item.forEach(renderItem);
}

function renderItem(item) {
  const newCard = createCard(item, openImagePopup);

  listElement.prepend(newCard);
}

function handleFormSubmitEdit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(editPopup);
}

function openEditPopup() {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openAddPopup() {
  openPopup(addPopup);
  addForm.reset();
}

function openImagePopup(item) {
  image.src = item.link;
  image.alt = item.name;
  subtitle.textContent = item.name;
  openPopup(imagePopup);
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  renderItem({ name: placeInput.value, link: photoInput.value });
  closePopup(addPopup);
}

editForm.addEventListener("submit", handleFormSubmitEdit);
addForm.addEventListener("submit", handleFormSubmitAdd);
openEditPopupButton.addEventListener("click", openEditPopup);
openAddPopupButton.addEventListener("click", openAddPopup);

renderInitialCards(initialCards);
buttonClose(buttonClosePopup);
