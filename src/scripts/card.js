import { openImagePopup } from "..";
const itemTemplate = document.querySelector("#card-template").content;
const listElement = document.querySelector(".places__list");

export function renderInitialCards(item) {
    item.forEach(renderItem);
  }
  
  export  function renderItem(item) {
    const newCard = createCard(item.name, item.link);
    addListenersForItem(newCard, item);
  
    listElement.prepend(newCard);
  }

 function createCard(name, link) {
  const newHtmlElement = itemTemplate.cloneNode(true);
  const photoElement = newHtmlElement.querySelector(".card__image");
  const placeElement = newHtmlElement.querySelector(".card__title");

  placeElement.textContent = name;
  photoElement.src = link;
  photoElement.alt = name;

  return newHtmlElement;
}

export function addListenersForItem(element, item) {
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