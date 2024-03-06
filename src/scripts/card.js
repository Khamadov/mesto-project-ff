import { deleteCardServer, addLikeServer, deleteLikeServer } from "./api";

const itemTemplate = document.querySelector("#card-template").content;

export function createCard(item, openImagePopup, userId) {
  const newHtmlElement = itemTemplate.cloneNode(true);
  const photoElement = newHtmlElement.querySelector(".card__image");
  const placeElement = newHtmlElement.querySelector(".card__title");

  placeElement.textContent = item.name;
  photoElement.src = item.link;
  photoElement.alt = item.name;

  const addDeleteButton = newHtmlElement.querySelector(".card__delete-button");

  if (item.owner._id !== userId) {
    addDeleteButton.style.display = "none";
  }

  addDeleteButton.addEventListener("click", (event) =>
    handleDelete(event, item._id)
  );

  const addLikeButton = newHtmlElement.querySelector(".card__like-button");
  
  const myLike = item.likes.some(function (like) {
    return like._id === userId;
  });

  if (myLike) {
    addLikeButton.classList.add("card__like-button_is-active");
    addLikeButton.addEventListener("click", (event) =>
      deleteLike(event, item._id)
    );
  } else {
    addLikeButton.addEventListener("click", (event) =>
      addLike(event, item._id)
    );
  }

  const showImage = newHtmlElement.querySelector(".card__image");
  showImage.addEventListener("click", () => openImagePopup(item));

  const countLike = newHtmlElement.querySelector(".card__likes-count");
  countLike.textContent = item.likes.length;

  return newHtmlElement;
}

function handleDelete(event, id) {
  deleteCardServer(id).then(() => {
    const currentDelete = event.target.closest(".places__item");

    currentDelete.remove();
  });
}

function addLike(event, id) {
  addLikeServer(id).then(() => {
    event.target.classList.add("card__like-button_is-active");
  });
}
function deleteLike(event, id) {
  deleteLikeServer(id).then(() => {
    event.target.classList.remove("card__like-button_is-active");
  });
}
