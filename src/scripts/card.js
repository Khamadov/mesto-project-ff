const itemTemplate = document.querySelector("#card-template").content;

export function createCard(name, link) {
  const newHtmlElement = itemTemplate.cloneNode(true);
  const photoElement = newHtmlElement.querySelector(".card__image");
  const placeElement = newHtmlElement.querySelector(".card__title");

  placeElement.textContent = name;
  photoElement.src = link;
  photoElement.alt = name;

  return newHtmlElement;
}
