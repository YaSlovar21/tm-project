import 'swiper/swiper-bundle.css';
import 'animate.css';
import '../pages/index.css';

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

