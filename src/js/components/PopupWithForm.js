import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({formSubmitHandler, formCleanError, checherValidation}, popupSelector, formSelector, formInputSelector) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._formCleanError = formCleanError;
        this._formElement = this._modal.querySelector(formSelector); //.popup__form
        this._inputSelector = formInputSelector;

        this._checker = checherValidation;
        
    }



    //собираем поля формы
    _getInputValues() {
        // достаём все элементы полей
        this._inputList = this._formElement.querySelectorAll(this._inputSelector); //'.popup__input'

        // создаём пустой объект
        this._formValues = {};

        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        console.log(this._formValues);
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
            if (this._checker()) {
              this._formSubmitHandler(this._getInputValues());
            }
        });
    }
}