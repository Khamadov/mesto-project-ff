// import { create } from "core-js/core/object";
import "./pages/index.css";
import { initialCards } from './scripts/cards';
import { openPopup, closePopup } from './scripts/modal';
 import {  createCard } from "./scripts/card";

const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const openEditPopupButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
// const buttonClosePopup = document.querySelectorAll(".popup__close");
const addPopup = document.querySelector(".popup_type_new-card");
const openAddPopupButton = document.querySelector(".profile__add-button");

// Редактировать профиль
function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(editPopup);
}

formElement.addEventListener("submit", handleFormSubmit);

// Функция открытия popup
// function openPopup(open) {
//   document.addEventListener("keydown", closePopupKeydown);
//   open.classList.add("popup_is-opened");
// }

// Функция закрытия popup
// function closePopup(close) {
//   document.removeEventListener("keydown", closePopupKeydown);
//   close.classList.remove("popup_is-opened");
// }

function openEditPopup() {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openAddPopup() {
  openPopup(addPopup);
  addForm.reset();
}

// Закрыть любой popup
// buttonClosePopup.forEach((btn) => {
//   const popup = btn.closest(".popup");
//   popup.addEventListener("click", closePopupOverlay);
//   btn.addEventListener("click", () => closePopup(popup));
// });

// Закрыть popup кликом на оверлей
// function closePopupOverlay(evt) {
//   if (evt.target === evt.currentTarget) {
//     closePopup(evt.target);
//   }
// }

// Закрыть popup нажатием на клавишу Esc
// function closePopupKeydown(evt) {
//   if (evt.key === "Escape") {
//     const openPopup = document.querySelector(".popup_is-opened");
//     closePopup(openPopup);
//   }
// }

openEditPopupButton.addEventListener("click", openEditPopup);
openAddPopupButton.addEventListener("click", openAddPopup);

const listElement = document.querySelector('.places__list');
// const itemTemplate = document.querySelector('#card-template').content;
const imagePopup = document.querySelector('.popup_type_image');
const addForm = addPopup.querySelector('.popup__form');
const photoInput = addForm.querySelector('.popup__input_type_url'); 
const placeInput = addForm.querySelector('.popup__input_type_card-name');

function renderInitialCards(item) {
  item.forEach(renderItem);
}

function renderItem(item) {
 const newCard = createCard(item.name, item.link)
 addListenersForItem(newCard, item);

 listElement.prepend(newCard)
}

// function createCard(name, link) {
//   const newHtmlElement = itemTemplate.cloneNode(true);
//   const photoElement = newHtmlElement.querySelector('.card__image');
//   const placeElement = newHtmlElement.querySelector('.card__title');
  

//   placeElement.textContent = name;
//   photoElement.src = link;
//   photoElement.alt = name;

//   return newHtmlElement;
// }

renderInitialCards(initialCards)

function addListenersForItem(element, item) {
  const addDeleteButton = element.querySelector('.card__delete-button');
  addDeleteButton.addEventListener('click', handleDelete);

  const addLikeButton = element.querySelector('.card__like-button');
  addLikeButton.addEventListener('click', handleLike);

  const showImage = element.querySelector('.card__image');
  showImage.addEventListener('click', () => openImagePopup(item));
}

function handleDelete(event) {
  const currentDelete = event.target.closest('.places__item');
  currentDelete.remove();
}

function handleLike(event) {
  event.target.classList.toggle('card__like-button_is-active');
}

function openImagePopup(item) {
  const image = imagePopup.querySelector('.popup__image');
  const subtitle = imagePopup.querySelector('.popup__caption');
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

addForm.addEventListener('submit', handleFormSubmitAdd);