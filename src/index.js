import "./pages/index.css";
import { initialCards } from "./scripts/cards";
import { openPopup, closePopup } from "./scripts/modal";
import { createCard } from "./scripts/card";

const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const openEditPopupButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const openAddPopupButton = document.querySelector(".profile__add-button");

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(editPopup);
}

formElement.addEventListener("submit", handleFormSubmit);

function openEditPopup() {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openAddPopup() {
  openPopup(addPopup);
  addForm.reset();
}

openEditPopupButton.addEventListener("click", openEditPopup);
openAddPopupButton.addEventListener("click", openAddPopup);

const listElement = document.querySelector(".places__list");
const imagePopup = document.querySelector(".popup_type_image");
const addForm = addPopup.querySelector(".popup__form");
const photoInput = addForm.querySelector(".popup__input_type_url");
const placeInput = addForm.querySelector(".popup__input_type_card-name");

function renderInitialCards(item) {
  item.forEach(renderItem);
}

function renderItem(item) {
  const newCard = createCard(item.name, item.link);
  addListenersForItem(newCard, item);

  listElement.prepend(newCard);
}

renderInitialCards(initialCards);

function addListenersForItem(element, item) {
  const addDeleteButton = element.querySelector(".card__delete-button");
  addDeleteButton.addEventListener("click", handleDelete);

  const addLikeButton = element.querySelector(".card__like-button");
  addLikeButton.addEventListener("click", handleLike);

  const showImage = element.querySelector(".card__image");
  showImage.addEventListener("click", () => openImagePopup(item));
}

function handleDelete(event) {
  const currentDelete = event.target.closest(".places__item");
  currentDelete.remove();
}

function handleLike(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

function openImagePopup(item) {
  const image = imagePopup.querySelector(".popup__image");
  const subtitle = imagePopup.querySelector(".popup__caption");
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

addForm.addEventListener("submit", handleFormSubmitAdd);
