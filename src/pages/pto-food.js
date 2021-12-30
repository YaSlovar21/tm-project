import './pto-food.css';
import Swiper from 'swiper/bundle';

import 'swiper/swiper-bundle.css';
var mySwiper = new Swiper('.food-types-container', {
  // Optional parameters
  direction: 'horizontal',
  autoplay: {
    delay: 3000,
  },
  speed: 800,
  //loop: true,
  parallax: true,
  effect: 'slide',
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  // If we need pagination
  pagination: {
    type: 'bullets',
    el: '.food-type__pagination-container',
    clickable: true,
    bulletClass: 'food-type__bullet',
    bulletActiveClass: 'food-type__bullet_active',
    renderBullet: function (index, className) {
        let a = '';
        if (index==0) {
          a = 'Односекционные'
        }
        if (index==1) {
          a = 'Многосекицонные'
        }
        if (index==2) {
          a = 'Установки ПОУ'
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
});
mySwiper.on('orientationchange', function () {
  swiper_on_video.update();
  console.log('UPDATED_ORIENT');
});