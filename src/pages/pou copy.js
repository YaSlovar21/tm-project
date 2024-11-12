import './pou.css'

import {
  popupCallBack
} from './popup-callback.js'


import FormValidator from '../js/components/FormValidator.js';
import FormStatic from '../js/components/FormStatic.js';
import Api from '../js/components/Api.js';

import {
  lineformConfig,
} from '../js/utils/constants.js';

import {
  renderLoading
} from'../js/utils/utils.js';


const lineformBtp = document.forms.lineformBtp;
const lineformSubmitButton = lineformBtp.querySelector(lineformConfig.submitButtonSelector);
const lineformValidator = new FormValidator(lineformConfig, lineformBtp);

lineformValidator.enableValidation();

const formApi = new Api({
  //baseUrl: 'https://formspree.io',
  //baseUrl: 'https://functions.yandexcloud.net/d4emmiecboqc61f8q1kk',
  baseUrl: 'https://api.termoblok.ru',
  headers: {
    'Accept': 'application/json',
    //'Content-Type': 'text/plain'
    'Content-Type': 'application/json;charset=utf-8',
  },
});

const lineformBtpStatic = new FormStatic({
  formSubmitHandler: (formCallbackData) => {
    renderLoading(true, lineformSubmitButton, 'Оставить заявку', 'Отправка...'); //вынести фразы в отдельный объект? elem: profileSubmBut, onLoadText:' ....
    formApi.sendBigForm(formCallbackData)
      .then((response) => {
        console.log(response);
        formRaschetStatic.cleanAll();
        //сделать сообщение об успешной отправке
      })
      .catch((err) => console.log(err)) //сделать сообщение об успешной ошибке
      .finally(() => {
        lineformValidator.disableSaveButton();
        lineformBtp.reset();
          renderLoading(false, lineformSubmitButton, 'Оставить заявку', 'Отправка...');
      });
    console.log(formCallbackData);
    },
  formCleanError: () => {
    //raschetValidatorForm.cleanAllErrors();
  }}, lineformBtp, '.lineform__input');

lineformBtpStatic.setEventListeners();


document.querySelector('.pou-popup-callback').addEventListener('mousedown', ()=> {
  popupCallBack.open('Заявка на пастеризационную охладительную установку', 'Здравствуйте! Нужна консультация инженера по пищевому теплообменному оборудованию.');
});

document.querySelector('.btp-adv__link').addEventListener('mousedown', ()=> {
  popupCallBack.open('Заявка на пастеризационную охладительную установку', 'Здравствуйте! Необходимо рассчитать пастеризационную установку.');
});