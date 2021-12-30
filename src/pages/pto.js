import Swiper from 'swiper/bundle';

import 'swiper/swiper-bundle.css';
import 'animate.css';
import WOW from 'wow.js';
import './pto.css';

const wowAnimation = new WOW({
  boxClass:     'wow',      // animated element css class (default is wow)
  animateClass: 'animate__animated', // animation css class (default is animated)
  offset:       0,          // distance to the element when triggering the animation (default is 0)
  mobile:       true,       // trigger animations on mobile devices (default is true)
  live:         true,       // act on asynchronously loaded content (default is true)
  scrollContainer: null,    // optional scroll container selector, otherwise use window,
  resetAnimation: true,     // reset animation on end (default is true)
});
wowAnimation.init();

import {
  //данные проектов
  initialProjects,
  //данные теплообменников
  initialHeatEx,
  projectsContainerSelector, //селектор секции куда грузятся карточки
  projectTemplateSelector,   //шаблон карточки

  popupImageSelector,
  popupImageSelectorsCongig,
  popupToConfig,
  popupWithToSelector,
} from '../js/utils/constants.js';

import Section from '../js/components/Section.js';
import Card from '../js/components/Card.js';
import PopupWithImage from '../js/components/PopupWithImage.js';

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
  }, projectTemplateSelector);
  const cardToAdd = card.generateCard()
  return cardToAdd;
}

const projectList = new Section({
  data: initialProjects,
  renderer: (item) => {
    //в этой точке знаем все данные карточки
    //item - объект карточки со всеми свойствами
    const card = createCard(item);
    projectList.setItem(card);

  }
}, projectsContainerSelector);

projectList.renderItems();

const popupImage = new PopupWithImage(popupImageSelectorsCongig, popupImageSelector);
popupImage.setEventListeners();



//интеактивные пластины
import PopupWithHeatEx from '../js/components/PopupWithHeatEx.js';
const popupHeatEx = new PopupWithHeatEx(popupToConfig, popupWithToSelector);
const platesSvg = document.querySelector('.plates__svg');

platesSvg.addEventListener("click", (evt) => {
  popupHeatEx.open(initialHeatEx[evt.target.dataset.to]);
  console.log(initialHeatEx[evt.target.dataset.to]);
});


var mySwiper1 = new Swiper('.khan__book-container', {
  // Optional parameters
  direction: 'horizontal',
  //loop: true,
  effect: 'coverflow',
  speed: 700,
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  preloadImages: false,
  // Enable lazy loading
  lazy: true,
  zoom: true,
  cssMode: false,
  mousewheel: false,
  // If we need pagination
  pagination: {
    type: 'bullets',
    el: '.khan__list',
    clickable: true,
    bulletClass: 'khan__list-item',
    bulletActiveClass: 'khan__list-item_active',
    renderBullet: function (index, className) {
        let a = '';
        if (index==0) {
          a = 'Коммерческое предложение'
        }
        if (index==1) {
          a = 'Спецификация'
        }
        if (index==2) {
          a = 'Тех. данные'
        }
        return '<li class=' + className + '>' + a + '</li>';
        //<li id="khan_1" class="khan__list-item khan__list-item_active">Коммерческое предложение</li>
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
})