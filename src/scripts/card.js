
const itemTemplate = document.querySelector("#card-template").content;

export function createCard(item, openImagePopup) {
  const newHtmlElement = itemTemplate.cloneNode(true);
  const photoElement = newHtmlElement.querySelector(".card__image");
  const placeElement = newHtmlElement.querySelector(".card__title");

  placeElement.textContent = item.name;
  photoElement.src = item.link;
  photoElement.alt = item.name;

  addListenersForItem(newHtmlElement, item, openImagePopup);

  return newHtmlElement;
}

function addListenersForItem(element, item, openImagePopup) {
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
