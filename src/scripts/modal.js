export function openPopup(open) {
  document.addEventListener("keydown", closePopupKeydown);
  open.classList.add("popup_is-opened");
}

export function setCloseHandlers(buttons) {
  buttons.forEach((btn) => {
    const popup = btn.closest(".popup");
    popup.addEventListener("click", closePopupOverlay);
    btn.addEventListener("click", () => closePopup(popup));
  });
}

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function closePopupKeydown(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    closePopup(openPopup);
  }
}

export function closePopup(close) {
  document.removeEventListener("keydown", closePopupKeydown);
  close.classList.remove("popup_is-opened");
}
