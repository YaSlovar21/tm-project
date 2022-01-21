import './equipment.css'

import FormValidator from '../js/components/FormValidator.js';
import FormStatic from '../js/components/FormStatic.js';
import Api from '../js/components/Api.js';


import Section from '../js/components/Section.js';

import UserMessage from '../js/components/UserMessage.js';
import DefaultMessage from '../js/components/DefaultMessage.js';

import logo_dialog from '../images/svg-elems/logo_dialog.png';

const messageList = [
	{
		image: logo_dialog,
		text: 'Добрый день! Заполнив основные поля формы, наш инженер рассчитает пластинчатый теплобменник за 30 минут!'
	},
	{
		text: 'Сейчас попробуем!',
    isOwner: true
	},
	{
		image: logo_dialog,
		text: 'Ждём!'
	},
];
const cardListSection = '.card-list';


import {
  raschetValidatorConfig,
} from '../js/utils/constants.js';

import {
  renderLoading
} from'../js/utils/utils.js';

const formApi = new Api({
  //baseUrl: 'https://formspree.io',
  baseUrl: 'https://functions.yandexcloud.net/d4emmiecboqc61f8q1kk',
  headers: {
    'Accept': '*/*',
    'Content-Type': 'text/plain'
  },
});

const raschetForm = document.forms.formRaschetPopup;
const raschetSubmitButton = raschetForm.querySelector('.raschet-bem__submit-button');

const raschetValidatorForm = new FormValidator(raschetValidatorConfig, raschetForm);
raschetValidatorForm.enableValidation();


const cardsList = new Section({
  data: messageList,
  renderer: (item) => {
    const message = item.isOwner
      ? new UserMessage(item, '.message-template_type_user')
      : new DefaultMessage(item, '.message-template_type_default');

    const messageElement = message.generate();
    cardsList.appendItem(messageElement);
    },
  },
  cardListSection
);

// отрисовка карточек
cardsList.renderItems();

function generateResponseMessage(response) {
  let generatedMessage = 'Мы получили от Вас запрос! ';
  Object.keys(response).forEach((item)=> {
    generatedMessage += item + ':' + response[item];
  });
  return generatedMessage;
}

console.log(generateResponseMessage({"23":"252"}));

const formRaschetStatic = new FormStatic({
  formSubmitHandler: (formCallbackData) => {
    renderLoading(true, raschetSubmitButton, 'Отправить', 'Отправка...'); //вынести фразы в отдельный объект? elem: profileSubmBut, onLoadText:' ....
    formApi.sendBigForm(formCallbackData)
      .then((response) => {
        console.log(response);
        const message = new DefaultMessage({image:logo_dialog, text: generateResponseMessage(response)}, '.message-template_type_default');
        const messageElement = message.generate();
        cardsList.appendItem(messageElement);
        formRaschetStatic.cleanAll();

        //сделать сообщение об успешной отправке
      })
      .catch((err) => console.log(err)) //сделать сообщение об успешной ошибке
      .finally(() => {
          raschetValidatorForm.disableSaveButton();
          renderLoading(false, raschetSubmitButton, 'Отправить', 'Отправка...');
      });
    console.log(formCallbackData);
    },
  formCleanError: () => {
    raschetValidatorForm.cleanAllErrors();
  }}, raschetForm, '.raschet-bem__input');

  formRaschetStatic.setEventListeners();

