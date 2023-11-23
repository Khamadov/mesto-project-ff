export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  _showError(inputElement, errorElement) {
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideError(inputElement, errorElement) {
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    const isInputValid = inputElement.validity.valid;
    const errorElement = this._formElement.querySelector(
      `#${inputElement.name}-error`
    );

    if (isInputValid) {
      this._hideError(inputElement, errorElement);
    } else {
      this._showError(inputElement, errorElement);
    }
  }

  _toggleButton(isActive) {
    if (isActive) {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
    } else {
      this._submitButton.disabled = "disabled";
      this._submitButton.classList.add(this._config.inactiveButtonClass);
    }
  }

  resetButton() {
    this._toggleButton(this._formElement.checkValidity());
  }

  _setEventListener() {
    const inputList = this._formElement.querySelectorAll(
      this._config.inputSelector
    );

    this._toggleButton(this._formElement.checkValidity());

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleButton(this._formElement.checkValidity());
        this._checkInputValidity(inputElement);
      });
    });
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  enableValidation() {
    this._setEventListener();
  }
}
