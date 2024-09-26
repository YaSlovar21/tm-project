import '../pages/ti.css';
import 'animate.css';

import simpleParallax from 'simple-parallax-js';


import PopupWithImage from '../js/components/PopupWithImage.js';

import {
  popupImageSelector,
  popupImageSelectorsCongig
} from '../js/utils/constants.js';



const popupImage = new PopupWithImage(popupImageSelectorsCongig, popupImageSelector);

const drawing = document.querySelector('.khan__book-pic_page_heatex');
const openDrawingButton = document.querySelector('.khan__buy-link');

openDrawingButton.addEventListener("mousedown", ()=> {
  popupImage.open({
    link: drawing.src,
    name: drawing.alt,
  })
})
popupImage.setEventListeners();

new simpleParallax(drawing, {
	delay: .6,
	transition: 'cubic-bezier(0,0,0,1)'
});

const tiAlias = window.location.pathname;

console.log(tiAlias);
