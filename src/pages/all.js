import './all.css';
import '../images/favicon.svg';

import Popup from '../js/components/Popup.js';
import {popupWithMenuSelector} from '../js/utils/constants.js';

const popupMenu = new Popup(popupWithMenuSelector);
popupMenu.setEventListeners();

const navMobileButton = document.querySelector('.nav__mobile-icon');
navMobileButton.addEventListener('click', () => popupMenu.open());