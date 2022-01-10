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
});

    
try {
  var path = document.querySelector('.circle_wow');
  var len_dash = path.getTotalLength();
}
catch (err) {

}
//console.log(len_dash);


var swiper_text_on_sborka = new Swiper('.slider-text-sborka', {
    speed: 1000,
    mousewheel: true,
    autoplay: false,
    spacebetween: 350,
    direction: 'horizontal',
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  },
    
});

var slider_sborka = new Swiper('.slider-sborka', {
  // Optional parameters
  direction: 'horizontal',
  //loop: true,
  effect: 'fade',
  parallax: true,
  speed: 1000,
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
        /*anime({
            targets: '.circle_wow',
            strokeDashoffset: [anime.setDashoffset, dash_current],
            duration: 100,
        });*/
        return a;
    } 
  },


});

slider_sborka.controller.control = swiper_text_on_sborka;
swiper_text_on_sborka.controller.control = slider_sborka;

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });


function handleAnimationEnd(event) {
    event.stopPropagation();
    node.classList.remove(`${prefix}animated`, animationName);
    resolve('Animation ended');
  }


slider_sborka.on('slideChange', function () {
    //var ggg = $('.content-slider .content-slide').eq(swiper.activeIndex);
   //  console.log('slide changed');
    let arr = slider_sborka.slides[slider_sborka.activeIndex].querySelectorAll('.wow1');
    // console.log(arr);
   // console.log(arr.length);
    for (i=0; i<arr.length; i++) {
        animation_class = arr[i].getAttribute("data-class-animaton");
    //    console.log(animation_class);
        duration_custom = arr[i].getAttribute("data-animaton-duration");
        arr[i].style.setProperty('--animate-duration', duration_custom);
        arr[i].classList.add("animate__animated", animation_class);
    }
    if (slider_sborka.activeIndex > 0) {
      let arr1 = slider_sborka.slides[slider_sborka.activeIndex-1].querySelectorAll('.wow1');
      for (i=0; i<arr1.length; i++) {
        animation_class = arr1[i].getAttribute("data-class-animaton");
        duration_custom = arr1[i].getAttribute("data-animaton-duration");
        //arr1[i].style.setProperty('--animate-duration', duration_custom);
        arr1[i].classList.remove("animate__animated");
        arr1[i].classList.remove(animation_class);
      }
    }
    
  
});

