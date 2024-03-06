import "./pages/index.css";
import { openPopup, closePopup, buttonClose } from "./scripts/modal";
import { createCard } from "./scripts/card";
import { clearValidation } from "./scripts/validation";
import {
  getProfileSerever,
  getCardsServer,
  editProfileServer,
  addCardsServer,
  editAvatarServer,
} from "./scripts/api";

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
const avatarPopup = document.querySelector(".popup_type_avatar-edit");
const avatarForm = avatarPopup.querySelector(".popup__form");
const openAvatarPopupButton = document.querySelector(".profile__avatar-edit");
const avatarImage = document.querySelector(".profile__image");
const avatarInput = avatarForm.querySelector(".popup__input_type_url");


getProfileSerever().then((data) => {
  profileName.textContent = data.name;
  profileJob.textContent = data.about;
  avatarImage.style.backgroundImage = `url(${data.avatar})`;
  
  renderInitialCards(data._id);
});

function renderInitialCards(userId) {
  getCardsServer().then((cards) => {
    cards.forEach((item) => renderItem(item, userId));
  });
}

function renderItem(item, ownerId) {
  const newCard = createCard(item, openImagePopup, ownerId);

  listElement.prepend(newCard);
}

function handleFormSubmitEdit(evt) {
  evt.preventDefault();

  editForm.querySelector(".popup__button").textContent = "Сохранение...";

  editProfileServer({ name: nameInput.value, about: jobInput.value }).then(
    (data) => {
      profileName.textContent = data.name;
      profileJob.textContent = data.about;
      closePopup(editPopup);
    }
  );
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
  avatarForm.querySelector(".popup__button").textContent = "Сохранение...";

  editAvatarServer(avatarUrl).then((data) => {
    avatarImage.style.backgroundImage = `url(${data.avatar})`;
    closePopup(avatarPopup);
  });
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();

  addForm.querySelector(".popup__button").textContent = "Сохранение...";

  addCardsServer({ name: placeInput.value, link: photoInput.value }).then(
    (card) => {
      renderItem(card);
      closePopup(addPopup);
    }
  );
}

editForm.addEventListener("submit", handleFormSubmitEdit);
addForm.addEventListener("submit", handleFormSubmitAdd);
avatarForm.addEventListener("submit", handleFormSubmitAvatar);
openEditPopupButton.addEventListener("click", openEditPopup);
openAddPopupButton.addEventListener("click", openAddPopup);
openAvatarPopupButton.addEventListener("click", openAvatarPopup);

const validateConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

buttonClose(buttonClosePopup);
