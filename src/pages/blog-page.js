import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

import './blog-page.css'

const openRaschetButton = document.querySelector('.info__sale-link');
const raschetSection = document.querySelector('.inforaschet');

openRaschetButton.addEventListener('click', ()=>{
  if (!raschetSection.classList.contains('inforaschet_active')) {
    openRaschetButton.scrollIntoView({
      behavior: 'smooth'
    });
  }
  raschetSection.classList.toggle('inforaschet_active');
  raschetSection.classList.toggle('animate__animated');
  raschetSection.classList.toggle('animate__slow');
  raschetSection.classList.toggle('animate__fadeIn');
});



const closeRaschetPopupButton = document.querySelector('.form__close-popup');
const openRaschetPopupButton = document.querySelector('.form-popup-open-button');
const formPopup = document.querySelector('.form__popup');
openRaschetPopupButton.addEventListener('click', (evt) => {
  formPopup.classList.add('form__popup_opened');
});
closeRaschetPopupButton.addEventListener('click', (evt) => {
  console.log(evt.target.closest('.form__popup'));
  evt.target.closest('.form__popup').classList.remove('form__popup_opened');
});
var form = document.querySelector('form');
form.addEventListener('change', function() {
    alert('Hi!');
});

const swiperInfo = new Swiper('.info__container', {
  direction: 'vertical',
  slidesPerView: 'auto',
  freeMode: true,
  scrollbar: {
    el: '.swiper-scrollbar',

  },
  parallax: true,
  mousewheel: {
    eventsTarget: '.info__container',
  },
  nested: true,

});