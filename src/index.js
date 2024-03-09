import "./pages/index.css";
import { openPopup, closePopup, setCloseHandlers } from "./scripts/modal";
import { createCard, handleDelete, handleLike } from "./scripts/card";
import { clearValidation, enableValidation } from "./scripts/validation";
import {
  getProfileSerever,
  getCardsServer,
  editProfileServer,
  addCardsServer,
  editAvatarServer,
} from "./scripts/api";
import { validateConfig } from "./scripts/constants";

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const openEditPopupButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const openAddPopupButton = document.querySelector(".profile__add-button");
const editForm = document.forms["edit-profile"];
const buttonsClosePopup = document.querySelectorAll(".popup__close");
const imagePopup = document.querySelector(".popup_type_image");
const addForm = document.forms["new-place"];
const photoInput = addForm.querySelector(".popup__input_type_url");
const placeInput = addForm.querySelector(".popup__input_type_card-name");
const image = imagePopup.querySelector(".popup__image");
const subtitle = imagePopup.querySelector(".popup__caption");
const listElement = document.querySelector(".places__list");
const avatarPopup = document.querySelector(".popup_type_avatar-edit");
const avatarForm = document.forms["new-avatar"];
const openAvatarPopupButton = document.querySelector(".profile__avatar-edit");
const avatarImage = document.querySelector(".profile__image");
const avatarInput = avatarForm.querySelector(".popup__input_type_url");

let userId;

Promise.all([getProfileSerever(), getCardsServer()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    avatarImage.style.backgroundImage = `url(${userData.avatar})`;

    userId = userData._id;

    cards.forEach((item) => renderItem(item));
  })
  .catch(console.error);

function renderItem(item) {
  const newCard = createCard(
    item,
    openImagePopup,
    handleDelete,
    handleLike,
    userId
  );

  listElement.append(newCard);
}

function addNewCard(item, handleDelete, handleLike, userId) {
  const newCard = createCard(
    item,
    openImagePopup,
    handleDelete,
    handleLike,
    userId
  );

  listElement.prepend(newCard);
}

function handleFormSubmitEdit(evt) {
  evt.preventDefault();

  evt.submitter.textContent = "Сохранение...";

  editProfileServer({ name: nameInput.value, about: jobInput.value })
    .then((data) => {
      profileName.textContent = data.name;
      profileJob.textContent = data.about;

      closePopup(editPopup);
    })
    .catch(console.error)
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
}

function openEditPopup() {
  openPopup(editPopup);
  clearValidation(editForm, validateConfig);

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openAddPopup() {
  openPopup(addPopup);
  clearValidation(addForm, validateConfig);
}

function openImagePopup(item) {
  image.src = item.link;
  image.alt = item.name;
  subtitle.textContent = item.name;

  openPopup(imagePopup);
}

function openAvatarPopup() {
  openPopup(avatarPopup);
  clearValidation(avatarForm, validateConfig);
}

function handleFormSubmitAvatar(evt) {
  evt.preventDefault();
  const avatarUrl = avatarInput.value;
  evt.submitter.textContent = "Сохранение...";

  editAvatarServer(avatarUrl)
    .then((data) => {
      avatarImage.style.backgroundImage = `url(${data.avatar})`;

      closePopup(avatarPopup);
    })
    .catch(console.error)
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();

  evt.submitter.textContent = "Сохранение...";

  addCardsServer({ name: placeInput.value, link: photoInput.value })
    .then((card) => {
      addNewCard(card, handleDelete, handleLike, userId);

      closePopup(addPopup);
    })
    .catch(console.error)
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
}

editForm.addEventListener("submit", handleFormSubmitEdit);
addForm.addEventListener("submit", handleFormSubmitAdd);
avatarForm.addEventListener("submit", handleFormSubmitAvatar);
openEditPopupButton.addEventListener("click", openEditPopup);
openAddPopupButton.addEventListener("click", openAddPopup);
openAvatarPopupButton.addEventListener("click", openAvatarPopup);

setCloseHandlers(buttonsClosePopup);
enableValidation(validateConfig);
