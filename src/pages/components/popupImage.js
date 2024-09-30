import PopupWithImage from '../../js/components/PopupWithImage.js';

import {
  popupImageSelector,     //попап с картинкой (селектор)
  popupImageSelectorsCongig
} from '../../js/utils/constants.js'

const popupImage = new PopupWithImage(popupImageSelectorsCongig, popupImageSelector);
popupImage.setEventListeners();

document.querySelectorAll('.popup-image-item').forEach((item) => {
    item.addEventListener("mousedown", (evt) => {
      evt.stopPropagation();
      console.log(evt.target);
      popupImage.open({
        link: evt.target.src ? evt.target.src : evt.target.querySelector('img').src,
        desc: evt.target.alt ? evt.target.alt : evt.target.querySelector('img').alt,
      });
    });
  });
