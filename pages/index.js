// import Swiper from 'swiper/bundle';
// import WOW from 'wow.js';
// import anime from 'animejs/lib/anime.es.js';

import Card from '../js/components/Card.js';


import FormValidator from '../js/components/FormValidator.js';
import PopupWithForm from '../js/components/PopupWithForm.js';
import PopupWithBigForm from '../js/components/PopupWithBigForm.js';


import PopupWithHeatEx from '../js/components/PopupWithHeatEx.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import Api from '../js/components/Api.js';

//import 'swiper/swiper-bundle.css';
//import 'animate.css';
//import '../pages/index.css';
//import '../pages/CNAME';

import {
  //данные проектов
  //initialProjects,
  initialHeatEx,
  // initialPartners,

  cardsContainerSelector, //селектор секции куда грузятся карточки
  cardTemplateSelector,   //шаблон карточки

  popupImageSelector,     //попап с картинкой (селектор)
  callBackPopupSelector,  //попап с формой обратного звонка (селектор)

  popupWithToSelector,    //попап с теплообменником

  //кнопки открытия модальных окон




  //конфиги
  popupImageSelectorsCongig,
  popupToConfig,
  formValidatorConfig,


  //идентификатор Formspree формы обратного звонка
  callbackFormId,

  menuConfig,

  // partnersSectionConfig,
} from '../js/utils/constants.js';

import {
  renderLoading
} from'../js/utils/utils.js';

const formCallBack= document.forms.formCallBack;
const callbackSubmitButton = formCallBack.querySelector('.popup__button-save');

//кнопки открытия модальных окон
const callBackPopupOpenButton = document.querySelector('.popup-callback-button');
const raschetPopupOpenButton = document.querySelector('.popup-raschet-button')

//интеактивные пластины
const platesSvg = document.querySelector('.plates__svg');


// const dinamicInfoPopup = mapSection.querySelector('.map__popup');
// const popupInfoCloseButton = dinamicInfoPopup.querySelector(".map__popup-close");


const formValidatorCallBack = new FormValidator(formValidatorConfig, formCallBack);
formValidatorCallBack.enableValidation();

//const menu = new Menu(menuConfig);
//menu.setEventListeners();

//const mobileMenuButton = document.querySelector('.nav-mobile-logo');
//mobileMenuButton.addEventListener('click', () => menu.mobileOpen());

const formApi = new Api({
  //baseUrl: 'https://formspree.io',

  baseUrl: 'https://functions.yandexcloud.net/d4emmiecboqc61f8q1kk',
  headers: {
    'Accept': '*/*',
    'Content-Type': 'text/plain'
  },
});

function createCard(item) {
  const card = new Card({
    name: item.name,
    link: item.link,
    handleImageClick: (desc, link) => {
      //(desc, link) передаем во внутреннем методе карточки
      popupImage.open({
        link: link,
        name: desc,
      });
    },
  }, cardTemplateSelector);
  const cardToAdd = card.generateCard()
  return cardToAdd;
}



const popupImage = new PopupWithImage(popupImageSelectorsCongig, popupImageSelector);
const popupHeatEx = new PopupWithHeatEx(popupToConfig, popupWithToSelector);

const popupCallBack = new PopupWithForm({
  formSubmitHandler: (formCallbackData) => {
    const name = formCallbackData.name;
    const tel = formCallbackData.tel;
    renderLoading(true, callbackSubmitButton, 'Отправить', 'Отправка...'); //вынести фразы в отдельный объект? elem: profileSubmBut, onLoadText:' ....
    formApi.sendCallForm(name, tel, callbackFormId)
      .then((response) => {
        console.log(response)
        popupCallBack.close();
        //сделать сообщение об успешной отправке
      })
      .catch((err) => console.log(err)) //сделать сообщение об успешной ошибке
      .finally(() => {
        formValidatorCallBack.disableSaveButton();
        renderLoading(false, callbackSubmitButton, 'Отправить', 'Отправка...');
      });
  },
  formCleanError: () => {
    formValidatorCallBack.cleanAllErrors();
  },
}, callBackPopupSelector, '.popup__form', '.popup__input');



const popupRaschet = new PopupWithBigForm({
  formSubmitHandler: (formCallbackData) => {
    //const name = formCallbackData.name;
    const name='test';
    const tel = formCallbackData;
    // renderLoading(true, callbackSubmitButton, 'Отправить', 'Отправка...'); //вынести фразы в отдельный объект? elem: profileSubmBut, onLoadText:' ....
    //formApi.sendCallForm(name, tel, callbackFormId)
    //   .then((response) => {
    //     console.log(response)
    //     popupCallBack.close();
    //     //сделать сообщение об успешной отправке
     // })
      // .catch((err) => console.log(err)) //сделать сообщение об успешной ошибке
     //  .finally(() => {
    //     formValidatorCallBack.disableSaveButton();
    //     renderLoading(false, callbackSubmitButton, 'Отправить', 'Отправка...');
    //   });
    console.log(formCallbackData);
  },
  formCleanError: () => {
    formValidatorCallBack.cleanAllErrors();
  },
}, '.popup-raschet', '.raschet-bem', '.raschet-bem__input')

popupImage.setEventListeners();
popupCallBack.setEventListeners();
popupRaschet.setEventListeners();

//popupHeatEx.setEventListeners();

//навешиваем слушатели на элементы сайта
//сделать forEach по всем кнопкам с селектором "кнопки открытия попапа"
callBackPopupOpenButton.addEventListener("mousedown", () => {
  popupCallBack.open();
})
raschetPopupOpenButton.addEventListener("mousedown", () => {
  popupRaschet.open();
})


platesSvg.addEventListener("click", (evt) => {
  popupHeatEx.open(initialHeatEx[evt.target.dataset.to]);
  console.log(initialHeatEx[evt.target.dataset.to]);
});



document.querySelectorAll('.photo-grid__item').forEach((item) => {
  item.addEventListener("mousedown", (evt) => {
    console.log(evt.target);
    popupImage.open({
      link: evt.target.querySelector('.photo-grid__image').src,
      name: evt.target.querySelector('.photo-grid__image').alt,
    });
  });
});



/* Слайдер в хидере на главной */

const mainHeaderSlider = new Swiper(".mainHeaderSlider", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  parallax: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  autoplay: true,
});