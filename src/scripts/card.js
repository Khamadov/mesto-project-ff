import { deleteCardServer, addLikeServer, deleteLikeServer } from "./api";

const itemTemplate = document.querySelector("#card-template").content;

export function createCard(
  item,
  openImagePopup,
  handleDelete,
  handleLike,
  userId
) {
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

  addDeleteButton.addEventListener("click", (event) => handleDelete(event, item._id));

  const addLikeButton = newHtmlElement.querySelector(".card__like-button");

  const myLike = item.likes.some(function (like) {
    return like._id === userId;
  });

  if (myLike) {
    addLikeButton.classList.add("card__like-button_is-active");
  }

  addLikeButton.addEventListener("click", (event) =>
    handleLike(event, item._id)
  );

  const showImage = newHtmlElement.querySelector(".card__image");
  showImage.addEventListener("click", () => openImagePopup(item));

  const countLike = newHtmlElement.querySelector(".card__likes-count");
  countLike.textContent = item.likes.length;

  return newHtmlElement;
}

export function handleLike(event, id) {
  const likeButton = event.target;
  const isLike = likeButton.classList.contains("card__like-button_is-active");
  const countLike = event.target.closest(".card").querySelector(".card__likes-count");
  if (isLike) {
    deleteLikeServer(id)
      .then((res) => {
        likeButton.classList.remove("card__like-button_is-active");
        countLike.textContent = res.likes.length;
      })
      .catch(console.error);
  } else {
    addLikeServer(id)
      .then((res) => {
        likeButton.classList.add("card__like-button_is-active");
        countLike.textContent = res.likes.length;
      })
      .catch(console.error);
  }
}

export function handleDelete(event, id) {
  deleteCardServer(id)
    .then(() => {
      const currentDelete = event.target.closest(".places__item");

      currentDelete.remove();
    })
    .catch(console.error);
}