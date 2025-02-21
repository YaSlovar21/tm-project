import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
//import 'animate.css';
//import WOW from 'wow.js';
import simpleParallax from 'simple-parallax-js';

import './pto.css';

/*const wowAnimation = new WOW({
  boxClass:     'wow',      // animated element css class (default is wow)
  animateClass: 'animated', // animation css class (default is animated)
  offset:       0,          // distance to the element when triggering the animation (default is 0)
  mobile:       true,       // trigger animations on mobile devices (default is true)
  live:         true,       // act on asynchronously loaded content (default is true)
  scrollContainer: null,    // optional scroll container selector, otherwise use window,
  resetAnimation: true,     // reset animation on end (default is true)
});
wowAnimation.init();
*/
import {
  //данные проектов
  initialProjects,
  //данные теплообменников
  initialHeatEx,
  projectsContainerSelector, //селектор секции куда грузятся карточки
  projectTemplateSelector,   //шаблон карточки
  projectHorizontalTemplateSelector, //шаблон горизонтальной карточки проекта

  popupImageSelector,
  popupImageSelectorsCongig,
  popupToConfig,
  popupWithToSelector,
} from '../js/utils/constants.js';


import {
  popupCallBack
} from './popup-callback.js'
document.querySelector('.up-footer__call').addEventListener('mousedown', ()=> {
  popupCallBack.open('Заявка на обратный звонок', 'Здравствуйте, перезвоните мне.');
});

import {
  popupRaschet
} from './popup-raschet.js'

document.querySelector('.khan__buy-link')?.addEventListener('mousedown', ()=> {
  popupRaschet.open();
});

document.querySelector('.up-footer__raschet')?.addEventListener('mousedown', ()=> {
  popupRaschet.open();
});

document.querySelector('.po-link-button')?.addEventListener('mousedown', ()=> {
  popupCallBack.open('Запрос программы расчёта', 'Здравствуйте, просьба разъяснить условия использование Вашей программы расчёта.');
})

import FreqDynamic from '../js/components/FreqDynamic.js';
import Section from '../js/components/Section.js';
import CardProject from '../js/components/CardProject.js';
import CardProjectHorizontal from '../js/components/CardProjectHorizontal.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import PopupWithHeatEx from '../js/components/PopupWithHeatEx.js';




const formProjectViewChange = document.forms.formProjectsViewChange;
const projectViewMoreButton = formProjectViewChange.querySelector('.ui-button');
const projectsItemsSect = document.querySelector('.projects__items');

let initialProjectsToRender = [].concat(initialProjects[0]);


const projectList = new Section({
  data: initialProjects,
  renderer: (item) => {
    const card = new CardProject({
      name: item.name,
      link: item.link,
      naznach: item.naznach,
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
    const cardElement = card.generateCard()
    //cardElement.setAttribute('data-wow-delay', item['data-wow-delay']);
    projectList.appendItem(cardElement);
  },
}, projectsContainerSelector);

const projectHorizontalList = new Section({
  data: initialProjectsToRender,
  renderer: (item) => {
    const card = new CardProjectHorizontal({
      name: item.name,
      link: item.link,
      to: item.to,
      naznach: item.naznach,
      q: item.q,
      path: item.path,
      handleImageClick: (desc, link) => {
        //(desc, link) передаем во внутреннем методе карточки
        popupImage.open({
          link: link,
          name: desc,
        });
      },
      cardTemplateSelector: projectHorizontalTemplateSelector,
      cardSelector: '.projects__item',
      animateClass: item.animateClass,
    });
    const cardElement = card.generateCard()
    //cardElement.setAttribute('data-wow-delay', item['data-wow-delay']);
    projectList.appendItem(cardElement);
  },
}, projectsContainerSelector);

projectList.clear();
projectHorizontalList.renderItems();


formProjectViewChange.addEventListener('change', (evt)=>{
  if (evt.target.checked) {
    initialProjectsToRender = initialProjects;
    projectHorizontalList.clear();
    projectHorizontalList.renderFiltered(initialProjectsToRender);
    projectViewMoreButton.textContent = 'Скрыть';
  } else {
    projectsItemsSect.scrollIntoView({behavior: 'smooth'});
    initialProjectsToRender =  [].concat(initialProjects[0]);
    projectHorizontalList.clear();
    projectHorizontalList.renderFiltered(initialProjectsToRender);
    projectViewMoreButton.textContent = 'Смотреть ещё';
  }
})


const popupImage = new PopupWithImage(popupImageSelectorsCongig, popupImageSelector);
popupImage.setEventListeners();

//интеактивные пластины
const popupHeatEx = new PopupWithHeatEx(popupToConfig, popupWithToSelector);
popupHeatEx.setEventListeners();
const platesSvg = document.querySelector('.plates__svg');

platesSvg.addEventListener("click", (evt) => {
  if (evt.target.dataset.to) {
    popupHeatEx.open(initialHeatEx[evt.target.dataset.to]);
    console.log(initialHeatEx[evt.target.dataset.to]);
  }
});


var mySwiper1 = new Swiper('.khan__book-container', {
  direction: 'horizontal',
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

  pagination: {
    type: 'bullets',
    el: '.khan__pagination-list',
    clickable: true,
    bulletClass: 'khan__pagination-list-item',
    bulletActiveClass: 'khan__pagination-list-item_active',
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

try {
  var pathCircle = document.querySelector('.circle_wow');
  var len_dash = pathCircle.getTotalLength();
}
catch (err) {
}

var slider_sborka = new Swiper('.slider-sborka', {
  direction: 'horizontal',
  effect: 'fade',
  speed: 1500,
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  cssMode: false,
  mousewheel: true,
  autoplay: true,
  pagination: {
    type: 'custom',
    el: '.slider-sborka_pagination',
    renderCustom: function (slider_sborka, current, total) {
        let a = current + ' of ' + total;
        const dash_current = (1- current/total)*len_dash;
        pathCircle.style.strokeDashoffset = `${dash_current}px`;
        /*anime({targets: '.circle_wow', strokeDashoffset: [anime.setDashoffset, dash_current], duration: 100,});*/
        return a;
    }
  },
});

slider_sborka.controller.control = swiper_text_on_sborka;
swiper_text_on_sborka.controller.control = slider_sborka;

const animateCSS1 = (element, animation, prefix = 'animate__') =>
    new Promise((resolve, reject) => {
      const imgToAnime = element.querySelector('.wow1');
      const animationName = imgToAnime?.getAttribute("data-class-animaton");
      imgToAnime?.classList.add(`${prefix}animated`, animationName);

      function handleAnimationEnd(event) {
        event.stopPropagation();
        imgToAnime.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation ended');
      }

      imgToAnime?.addEventListener('animationend', handleAnimationEnd, {once: true});
    });

slider_sborka.on('slideChange', function () {
   console.log(slider_sborka.slides[slider_sborka.activeIndex]);
   animateCSS1(slider_sborka.slides[slider_sborka.activeIndex], 'animate__fadeInRight')
});


/* HONEYS */

const honeys = Array.from(document.querySelectorAll('.honeycomb path'));
const partLength = honeys.length/4;

function generatePart() {
  return Array.from({length: partLength}, function(value, index) {
    return honeys[Math.floor(Math.random() * honeys.length)];
  });
}

function generateParts(num) {
  return Array.from({length: num}, function() {
    return generatePart();
  })
}

function highLightPart(someElementsArray) {
  someElementsArray.forEach((item) => {
    item.setAttribute('style', 'fill:rgb(255, 94, 58)')
  })
}

function turnOffHighLightPart(someElementsArray) {
  someElementsArray.forEach((item) => {
    item.setAttribute('style', 'fill:rgb(50, 50, 52)');
  })
}

const numberOfParts = 5;
const generatedParts = generateParts(numberOfParts);
let i = 0;
setInterval(()=> {
  highLightPart(generatedParts[i]);
  setTimeout(()=> {
    turnOffHighLightPart(generatedParts[i]);
    i = (i===numberOfParts-1) ?  0 : i+1;
  }, 2600);
}, 3000);

//let pageY= 0;
//let isPlaying = 1;

/*
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
*/

const freqElements = Array.from(document.querySelectorAll('.t-cell')).map((element) =>
  new FreqDynamic({
    headingSelector: 'table-heading',
    descSelector: 'table-text-and-list',
  }, element)
);

// freqElements - массив объектов FreqDynamic
freqElements.forEach((element) => {
  element.setEventListeners();
});

/*
const poButton = document.querySelector('.po__link');
poButton.addEventListener('mousedown', ()=> {
  poButton.classList.add('po__link_hovered');
})*/


let imageMain = document.querySelector('.flexburton__main-image');
new simpleParallax(imageMain, {
	delay: .4,
  overflow: true,
  scale: 1.6,
	transition: 'ease-out',
  customWrapper: '.flexburton__right-side',
});

let plastPresent = document.querySelector('.plastdetail__image');
new simpleParallax(plastPresent, {
	delay: .3,
  overflow: true,
  scale: 1.3,
	transition: 'cubic-bezier(0,0,0,1)',
  /*customWrapper: '.flexburton__right-side',*/
});

let itemPics = document.querySelectorAll('.plastdetail__iimage');
new simpleParallax(itemPics, {
	delay: .3,
  overflow: true,
  scale: 1.2,
  orientation: 'down',
	transition: 'cubic-bezier(0,0,0,1)',
  /*customWrapper: '.flexburton__right-side',*/
});

let principImage = document.querySelector('.princip__image-svg');
new simpleParallax(principImage, {
	delay: 0.2,
  overflow: true,
  scale: 1.05,
  orientation: 'left',
	transition: 'cubic-bezier(0,0,0,1)',
  customWrapper: '.princip__image',
});

let poImage = document.querySelector('.po__image');
new simpleParallax(poImage, {
	delay: 0.2,
  overflow: true,
  scale: 1.05,
  orientation: 'up',
	transition: 'cubic-bezier(0,0,0,1)',
  /*customWrapper: '.flexburton__right-side',*/
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


Array.from(document.querySelectorAll('.smooth-scroll-link')).map((item, index) =>{
  item.addEventListener('click', (evt)=> {
    evt.preventDefault();
    document.querySelector(evt.target.dataset.scroll).scrollIntoView({
      behavior: 'smooth'
    });
  })
});

const scrollFactoryContainer =  document.querySelector('.scroll-factory');

const isScrollingFact = (evt) => {
  let newScrollLeft = scrollFactoryContainer.scrollLeft + evt.deltaY;
  console.log(newScrollLeft)
  let deltaRight = scrollFactoryContainer.querySelector('.scroll-factory__inner').scrollWidth -scrollFactoryContainer.scrollLeft - scrollFactoryContainer.clientWidth  ;
  console.log(deltaRight);
  if ( newScrollLeft < -80 || (deltaRight < 46 && deltaRight > -1 && evt.deltaY >0) ) {
    console.log(deltaRight );
    return;
  }
  evt.preventDefault();
  scrollFactoryContainer.scrollLeft += evt.deltaY;
}

scrollFactoryContainer?.addEventListener("wheel", (evt) => {
  console.log(scrollFactoryContainer.scrollLeft , scrollFactoryContainer.clientWidth, scrollFactoryContainer.querySelector('.scroll-factory__inner').scrollWidth)
  isScrollingFact(evt);
});

