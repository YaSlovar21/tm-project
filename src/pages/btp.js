import './btp.css';

import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import simpleParallax from 'simple-parallax-js';

import FormValidator from '../js/components/FormValidator.js';
import FormStatic from '../js/components/FormStatic.js';
import Api from '../js/components/Api.js';
import WOW from 'wow.js';

import {
  lineformConfig,
} from '../js/utils/constants.js';

import {
  renderLoading
} from'../js/utils/utils.js';

import {
  popupCallBack
} from './popup-callback.js'

const wowAnimation = new WOW({
  boxClass:     'wow',      // animated element css class (default is wow)
  animateClass: 'animated', // animation css class (default is animated)
  offset:       0,          // distance to the element when triggering the animation (default is 0)
  mobile:       true,       // trigger animations on mobile devices (default is true)
  live:         true,       // act on asynchronously loaded content (default is true)
  scrollContainer: null,    // optional scroll container selector, otherwise use window,
  resetAnimation: true,     // reset animation on end (default is true)
});
wowAnimation.init();

const lineformBtp = document.forms.lineformBtp;
const lineformSubmitButton = lineformBtp?.querySelector(lineformConfig.submitButtonSelector);
const lineformValidator = new FormValidator(lineformConfig, lineformBtp);

//lineformValidator.enableValidation();

const formApi = new Api({
  //baseUrl: 'https://functions.yandexcloud.net/d4emmiecboqc61f8q1kk',
  baseUrl: 'https://api.termoblok.ru',
  headers: {
    'Accept': 'application/json',
    //'Content-Type': 'text/plain'
    'Content-Type': 'application/json;charset=utf-8',
  },
});
/*
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

//lineformBtpStatic.setEventListeners();*/

var swiperBigBtp = new Swiper(".btpBigSwiper", {
  spaceBetween: 0,

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var mySwiper1 = new Swiper('.btp-schemes', {
  // Optional parameters
  direction: 'vertical',
  //loop: true,
  parallax: true,
  effect: 'slide',
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  cssMode: false,
  mousewheel: false,
  // If we need pagination
  pagination: {
    type: 'bullets',
    el: '.btp-schemes__pagination-container',
    clickable: true,
    bulletClass: 'btp-schemes__bullet',
    bulletActiveClass: 'btp-schemes__bullet_active',
    renderBullet: function (index, className) {
        let a = '';
        let b = '';
        if (index==0) {
          a = 'Узел ввода и учета тепловой энергии';
          b = 'Узел ввода';
        }
        if (index==1) {
          a = 'Узел на отопление зависимое';
          b = 'Зависимая схема подключения отопления';
        }
        if (index==2) {
          a = 'Узел отопления с независимой схемой подключения';
          b = 'Независимое отопление';
        }
        if (index==3) {
          a = 'Тепловой узел горячего водоснабжения с одноступенчатым теплообменником гвс';
          b = 'Одноступенчатое ГВС';
        }
        if (index==4) {
          a = 'Узел ГВС с моноблоком';
          b = 'Двухступенчатое ГВС моноблок';
        }
        if (index==5) {
          a = 'Узел ГВС с двухступенчатой схемой подключения';
          b = 'Двухступенчатое ГВС с двумя теплообменниками';
        }
        return '<li class= ' + className + '><h3 class="btp-schemes__bullet-title">' + a + '</h3><p class="btp-schemes__bullet-desc">'+ b+ '</p></li>';
    }
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    //el: '.swiper-scrollbar',
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      allowTouchMove: false,
    },
    780: {

    },
    1024: {
      allowTouchMove: true,
    }
  },
})


import FreqDynamic from '../js/components/FreqDynamic.js';

/*let windowWidth = useWindowSizeTest();

const freqElements = Array.from(document.querySelectorAll('.table__cell_type_grid')).map((element) =>
  new FreqDynamic({
    headingSelector: 'table__heading',
    descSelector: 'table__text',
  }, element)
);

freqElements.forEach((element) => {
  element.setEventListeners();
});
*/

document.querySelector('.introgrid__button')?.addEventListener('mousedown', ()=> {
  popupCallBack.open('Проконсультироваться по расчёту теплового пункта', 'Здравствуйте! Необходимо рассчитать стоимость теплового пункта.');
});
document.querySelector('.popup-mini')?.addEventListener('mousedown', ()=> {
  popupCallBack.open();
});

document.querySelector('.btp-adv__link')?.addEventListener('mousedown', ()=> {
  popupCallBack.open('Проконсультироваться по расчёту теплового пункта', 'Здравствуйте! Необходимо рассчитать стоимость теплового пункта.');
});

let pictic = document.querySelector('.techniques__after_before');
new simpleParallax(pictic, {
	delay: 0.2,
  overflow: true,
  scale: 600,
  orientation: 'right',
	transition: 'ease-out',
  customWrapper: '.techniques__after',
});
