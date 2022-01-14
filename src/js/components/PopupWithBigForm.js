import Popup from './Popup.js';

export default class PopupWithBigForm extends Popup {
    constructor({formSubmitHandler, formCleanError}, popupSelector, formSelector, formInputSelector) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._formCleanError = formCleanError;
        this._formElement = this._modal.querySelector(formSelector); //.popup__form
        this._inputSelector = formInputSelector;
    }

    //собираем поля формы
    _getInputValues() {
        // достаём все элементы полей
        this._inputList = this._formElement.querySelectorAll(this._inputSelector); //'.popup__input'

        // создаём пустой объект 
        this._formValues = {};

        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
          if (input.dataset.alias) {
            this._formValues[input.dataset.alias] = input.value;
          } else {
            this._formValues[input.name] = input.value;
          }
        });
        // возвращаем объект значений
        return this._formValues;
    }


    close() {
        super.close();
        this._formElement.reset();
        this._formCleanError();
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmitHandler(this._getInputValues());
        });
    }
}