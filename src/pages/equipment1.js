import './equipment.css'
import 'animate.css';
import FormValidator from '../js/components/FormValidator.js';
import FormStatic from '../js/components/FormStatic.js';
import Api from '../js/components/Api.js';


import Section from '../js/components/Section.js';

import UserMessage from '../js/components/UserMessage.js';
import DefaultMessage from '../js/components/DefaultMessage.js';

import logo_dialog from '../images/svg-elems/logo_dialog.png';

import FormStaticJsRendered from '../js/components/FormStaticJsRendered.js';

const messageList = [
];
const cardListSection = '.card-list';


import {
  raschetValidatorConfig,
  formValidatorConfig
} from '../js/utils/constants.js';

import {
  renderLoading
} from'../js/utils/utils.js';

try {
  if (!localStorage.getItem('clientId')) {
    ym(56583337, 'getClientID', function(clientID) {
      localStorage.setItem('clientId', clientID)
    });

    ym(56583337, 'userParams', {
      UserID: localStorage.getItem('clientId'),
  });
  }
} catch(err) {
  console.log(err);
}

const formApi = new Api({
  //baseUrl: 'https://functions.yandexcloud.net/d4emmiecboqc61f8q1kk',
  baseUrl: 'https://api.termoblok.ru',
  headers: {
    'Accept': '*/*',
    'Content-Type': 'text/plain'
  },
});

const formRaschet = new FormStaticJsRendered({
  templateSelector: '.form-big-template',
  formSubmitHandler: (formCallbackData, submitButton) => {
    renderLoading(true, submitButton, 'Отправить', 'Отправка...'); //вынести фразы в отдельный объект? elem: profileSubmBut, onLoadText:' ....
    formApi.sendBigForm(formCallbackData)
      .then((response) => {
        console.log(response);
        const message = new DefaultMessage({image:logo_dialog, text: generateResponseMessage(response)}, '.message-template_type_default');
        const messageElement = message.generateHTML();
        cardsList.appendItem(messageElement);
        formRaschet.cleanAll();
      })
      .catch((err) => console.log(err)) //сделать сообщение об успешной ошибке
      .finally(() => {
          //raschetValidatorForm.disableSaveButton();
          renderLoading(false, submitButton, 'Отправить', 'Отправка...');
      });
    console.log(formCallbackData);
    },
  formCleanError: () => {
    //raschetValidatorForm.cleanAllErrors();
  },
  formInputSelector: '.raschet-bem__input',
  formSubmitSelector: '.raschet-bem__submit-button',
  validationConfig: raschetValidatorConfig,
});

const formFree = new FormStaticJsRendered({
  templateSelector: '.form-free-template',
  formSubmitHandler: (formCallbackData, submitButton) => {
    renderLoading(true, submitButton, 'Отправить', 'Отправка...'); //вынести фразы в отдельный объект? elem: profileSubmBut, onLoadText:' ....
    formApi.sendCallForm(formCallbackData)
      .then((response) => {
        console.log(response);
        const message = new DefaultMessage({image:logo_dialog, text: generateResponseMessage(response)}, '.message-template_type_default');
        const messageElement = message.generateHTML();
        messageElement.setAttribute('style', 'max-width: 600px'); /* не работает */
        cardsList.appendItem(messageElement);
        formRaschet.cleanAll();
        //сделать сообщение об успешной отправке
      })
      .catch((err) => console.log(err)) //сделать сообщение об успешной ошибке
      .finally(() => {
          //raschetValidatorForm.disableSaveButton();
          renderLoading(false, submitButton, 'Отправить', 'Отправка...');
      });
    console.log(formCallbackData);
    },
  formCleanError: () => {
    //raschetValidatorForm.cleanAllErrors();
  },
  formInputSelector: '.raschet-bem__input',
  formSubmitSelector: '.raschet-bem__submit-button',
  validationConfig: formValidatorConfig,
});

// инициализация формы
const formSection = new Section({
  data: []
}, '.section-submit');

const formElement1 = formRaschet.generate();
const formElement2 = formFree.generate();

function changeForm(type) {
  if (type==='big') {
    formSection.clear();
    formSection.setItem(formElement1);
  }
  if (type==='free') {
    formSection.clear();
    formSection.setItem(formElement2);
  }
}
changeForm('big');

const formChoice = document.forms.formChoice;
formChoice.addEventListener("change" , ()=>{
    setTimeout(2000, changeForm(formChoice.elements.radio.value));
});


/* -----Диалоги----- */
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
  cardListSection,
  800,
);

// отрисовка карточек
cardsList.renderItems();

function generateResponseMessage(response) {
  const raschetMessage = document.createElement('p');
  raschetMessage.append('Мы получили от Вас запрос! ');
  const listParameters = document.createElement('ul');
  listParameters.classList.add('bem-list');
  listParameters.setAttribute('style', 'font-size:12px');
  Object.keys(response).forEach((key)=> {
    if (key!='clientId' && key!='location') {
      const listItem = document.createElement('li');
      listItem.append(key + ':' + response[key])
      listParameters.append(listItem);
    }
  });
  raschetMessage.append(listParameters);
  return raschetMessage;
}

console.log(generateResponseMessage({"23":"252"}));

