import './pou.css'

import {
  popupCallBack
} from './popup-callback.js'

document.querySelector('.pou-popup-callback').addEventListener('mousedown', ()=> {
  popupCallBack.open('Заявка на пастеризационную охладительную установку', 'Здравствуйте! Нужна консультация инженера по пищевому теплообменного оборудованию.');
});