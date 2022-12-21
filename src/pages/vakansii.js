import './vakansii.css';

import {
  renderLoading
} from'../js/utils/utils.js';
import FormValidator from '../js/components/FormValidator';
import FormStatic from '../js/components/FormStatic.js';
import Api from '../js/components/Api.js';

const vacancyFormConfig = {
  inputSelector: '.formx__input',
  submitButtonSelector: '.formx__submit-button',
  inactiveButtonClass: 'formx__submit-button_disabled',
  inputErrorClass: 'formx__inputt_type_error',
  errorClass: 'formx__input-error_visible',
}


const vacancyFormEl = document.forms.vacancyForm;
const vacancyFormSubmitButtonEl = vacancyFormEl.querySelector(vacancyFormConfig.submitButtonSelector);
const vacancyFormValidator = new FormValidator(vacancyFormConfig, vacancyFormEl);
vacancyFormValidator.enableValidation();


const formApi = new Api({
  //baseUrl: 'https://formspree.io',
  baseUrl: 'https://functions.yandexcloud.net/d4emmiecboqc61f8q1kk',
  headers: {
    'Accept': 'application/json',
    //'Content-Type': 'text/plain'
    'Content-Type': 'application/json;charset=utf-8',
  },
});

const vacancyForm = new FormStatic({
  formSubmitHandler: (formCallbackData) => {
    renderLoading(true, vacancyFormSubmitButtonEl, 'Откликнуться', 'Отправляем...'); //вынести фразы в отдельный объект? elem: profileSubmBut, onLoadText:' ....
    formApi.sendBigForm(formCallbackData)
      .then((response) => {
        console.log(response);
        vacancyForm.cleanAll();
        //сделать сообщение об успешной отправке
      })
      .catch((err) => console.log(err)) //сделать сообщение об успешной ошибке
      .finally(() => {
        vacancyFormValidator.disableSaveButton();
        vacancyFormEl.reset();
          renderLoading(false, vacancyFormSubmitButtonEl, 'Откликнуться', 'Отправляем...');
      });
    console.log(formCallbackData);
    },
  formCleanError: () => {
    //raschetValidatorForm.cleanAllErrors();
  }}, vacancyFormEl, vacancyFormConfig.inputSelector);

  vacancyForm.setEventListeners();