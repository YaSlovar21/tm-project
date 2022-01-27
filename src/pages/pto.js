import Swiper from 'swiper/bundle';

import 'swiper/swiper-bundle.css';
import 'animate.css';
import WOW from 'wow.js';
import anime from 'animejs/lib/anime.es.js';
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
import CardProject from '../js/components/CardProject.js';
import PopupWithImage from '../js/components/PopupWithImage.js';

function createCard(item) {
  const card = new CardProject({
    name: item.name,
    link: item.link,
    handleImageClick: (desc, link) => {
      //(desc, link) передаем во внутреннем методе карточки
      popupImage.open({
        link: link,
        name: desc,
      });
    },

    cardTemplateSelector: projectTemplateSelector,
    cardSelector: '.projects__item',
    animateClass: item.animateClass,
  });
  const cardToAdd = card.generateCard()
  return cardToAdd;
}

const projectList = new Section({
  data: initialProjects,
  renderer: (item) => {
    //в этой точке знаем все данные карточки
    //item - объект карточки со всеми свойствами
    const card = createCard(item);
    projectList.appendItem(card);

  },

}, projectsContainerSelector);

projectList.renderItems();

const popupImage = new PopupWithImage(popupImageSelectorsCongig, popupImageSelector);
popupImage.setEventListeners();


//интеактивные пластины
import PopupWithHeatEx from '../js/components/PopupWithHeatEx.js';
const popupHeatEx = new PopupWithHeatEx(popupToConfig, popupWithToSelector);

popupHeatEx.setEventListeners();
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
});


try {
  var path = document.querySelector('.circle_wow');
  var len_dash = path.getTotalLength();
}
catch (err) {

}
//console.log(len_dash);

const advantages = {
  1: 'Общие',
  2: 'Пластины и уплотнения',
  3: 'Опции',
  4: 'Конструкция',
  5: 'Партнерам'
}

var swiper_text_on_sborka = new Swiper('.slider-text-sborka', {
    type: 'bullets',
    speed: 1500,
    mousewheel: true,
    autoplay: false,
    effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
    //spacebetween: 350,
    //direction: 'horizontal',
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
    bulletClass: 'slider-text-sborka__bullet',
    bulletActiveClass: 'slider-text-sborka__bullet_active',
    el: '.swiper-pagination-1',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + advantages[index + 1] + '</span>';
    },
  },

});

var slider_sborka = new Swiper('.slider-sborka', {
  // Optional parameters
  direction: 'horizontal',
  //loop: true,
  effect: 'fade',
  //parallax: true,
  speed: 1500,
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  cssMode: false,
  mousewheel: true,
  autoplay: true,
  // If we need pagination
  pagination: {
    type: 'custom',
    el: '.slider-sborka_pagination',
    renderCustom: function (slider_sborka, current, total) {
        let a = current + ' of ' + total;
        //console.log(a);
        const dash_current = (1- current/total)*len_dash;
        //console.log(dash_current);
        //console.log()
        anime({
            targets: '.circle_wow',
            strokeDashoffset: [anime.setDashoffset, dash_current],
            duration: 100,
        });
        return a;
    }
  },


});

slider_sborka.controller.control = swiper_text_on_sborka;
swiper_text_on_sborka.controller.control = slider_sborka;

const animateCSS1 = (element, animation, prefix = 'animate__') =>
    new Promise((resolve, reject) => {
      const imgToAnime = element.querySelector('.wow1');
      const animationName = imgToAnime.getAttribute("data-class-animaton");
      imgToAnime.classList.add(`${prefix}animated`, animationName);

      function handleAnimationEnd(event) {
        event.stopPropagation();
        imgToAnime.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation ended');
      }

      imgToAnime.addEventListener('animationend', handleAnimationEnd, {once: true});
    });

slider_sborka.on('slideChange', function () {
   console.log(slider_sborka.slides[slider_sborka.activeIndex]);
   animateCSS1(slider_sborka.slides[slider_sborka.activeIndex], 'animate__fadeInRight')
});


let pageY= 0;
let isPlaying = 1;

const el = document.querySelectorAll(".honeycomb path");
function randomValues() {
  if (pageY < 300) {
    anime({
      targets: [el],
      fill: function () {
        let a = anime.random(0, 4);
        if (a == 0) {
          return "#ff5e3a";
        } else {
          return "rgb(50, 50, 52);";
        }
      },
      easing: "steps(1)",
      duration: 5400,
      complete: randomValues,
    });
  }
}
randomValues();

window.addEventListener("scroll", function () {
  pageY = pageYOffset;
  if (pageY > 300 && isPlaying) {
    isPlaying = 0;
  }
  if (pageY < 300 && !isPlaying) {
    randomValues();
    isPlaying = 1;
  }
});