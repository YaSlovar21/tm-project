import './pou.css'

import {
  popupCallBack
} from './popup-callback.js'

document.querySelector('.pou-popup-callback').addEventListener('mousedown', ()=> {
  popupCallBack.open('Заявка на пастеризационную охладительную установку', 'Здравствуйте! Нужна консультация инженера по пищевому теплообменного оборудованию.');
});

document.querySelector('.btp-adv__link').addEventListener('mousedown', ()=> {
  popupCallBack.open('Заявка на пастеризационную охладительную установку', 'Здравствуйте! Необходимо рассчитать пастеризационную утановку.');
});