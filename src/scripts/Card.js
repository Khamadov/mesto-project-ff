export default class Card {
  constructor(data, templateSelector, openImage) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openImage = openImage;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  createCard() {
    this._newHtmlElement = this._getTemplate();
    const photoElement = this._newHtmlElement.querySelector(".element__photo");
    const placeElement = this._newHtmlElement.querySelector(".element__place");
    placeElement.textContent = this._name;
    photoElement.src = this._link;
    photoElement.alt = this._name;

    this._addListenersForItem();

    return this._newHtmlElement;
  }

  _addListenersForItem() {
    const addDeleteButton =
      this._newHtmlElement.querySelector(".element__delete");
    addDeleteButton.addEventListener("click", () => {
      this._handleDelete();
    });

    const addLikeButton = this._newHtmlElement.querySelector(".element__like");
    addLikeButton.addEventListener("click", (event) => {
      this._handleLike(event);
    });

    const showImage = this._newHtmlElement.querySelector(".element__photo");
    showImage.addEventListener("click", () =>
      this._openImage(this._link, this._name)
    );
  }

  _handleDelete() {
    this._newHtmlElement.remove();
  }

  _handleLike(event) {
    event.target.classList.toggle("element__like_active");
  }
}
