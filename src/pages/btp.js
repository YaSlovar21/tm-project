import './btp.css';

import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

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
        if (index==0) {
          a = 'Узел ввода'
        }
        if (index==1) {
          a = 'Зависимое отоппление'
        }
        if (index==2) {
          a = 'Независимое отопление'
        }
        if (index==3) {
          a = 'Одноступенчатое ГВС'
        }
        if (index==4) {
          a = 'Двухступенчатое ГВС моноблок'
        }
        if (index==5) {
          a = 'Двухступенчатое ГВС с двумя теплообменниками'
        }
        return '<span class=' + className + '>' + a + '</span>';
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

/*let windowWidth = useWindowSizeTest();*/

const freqElements = Array.from(document.querySelectorAll('.table__cell')).map((element) =>
  new FreqDynamic({
    headingSelector: 'table__heading',
    descSelector: 'table__text',
  }, element)
);

freqElements.forEach((element) => {
  element.setEventListeners();
})