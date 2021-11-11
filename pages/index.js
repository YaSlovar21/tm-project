// import Swiper from 'swiper/bundle';
// import WOW from 'wow.js';
// import anime from 'animejs/lib/anime.es.js';

import Section from '../js/components/Section.js';
import Card from '../js/components/Card.js';
import Menu from '../js/components/Menu.js';
import Partner from '../js/components/Partner.js';

import FormValidator from '../js/components/FormValidator.js';
import PopupWithForm from '../js/components/PopupWithForm.js';
//import PopupConfirm from '../js/components/PopupConfirm.js';
import PopupWithHeatEx from '../js/components/PopupWithHeatEx.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import Api from '../js/components/Api.js';

//import 'swiper/swiper-bundle.css';
//import 'animate.css';
//import '../pages/index.css';
//import '../pages/CNAME';

import {
  //данные проектов
  //initialProjects,
  initialHeatEx,
  initialPartners,

  cardsContainerSelector, //селектор секции куда грузятся карточки
  cardTemplateSelector,   //шаблон карточки

  popupImageSelector,     //попап с картинкой (селектор)
  callBackPopupSelector,  //попап с формой обратного звонка (селектор)
  popupWithToSelector,    //попап с теплообменником

  //кнопки открытия модальных окон
  callBackPopupOpenButton,
  popupWithSertifOpenButton,

  platesSvg,

  //конфиги
  popupImageSelectorsCongig,
  popupToConfig,
  formValidatorConfig,


  //идентификатор Formspree формы обратного звонка
  callbackFormId,
  formCallBack,
  callbackSubmitButton,
  menuConfig,

  partnersSectionConfig,
} from '../js/utils/constants.js';

import {
  renderLoading
} from'../js/utils/utils.js';


initialPartners.sort(function(a,b) {
  const aSecondName = a.name.toLowerCase();
  const bSecondName = b.name.toLowerCase();
  if (aSecondName > bSecondName) return 1;
  if (aSecondName < bSecondName) return -1;
  return 0;
});

const mapSection = document.querySelector('.map');
const mapList = mapSection.querySelector('.map__list');
const dinamicInfoPopup = mapSection.querySelector('.map__popup');
const popupInfoCloseButton = dinamicInfoPopup.querySelector(".map__popup-close");


const formValidatorCallBack = new FormValidator(formValidatorConfig, formCallBack);
formValidatorCallBack.enableValidation();

const menu = new Menu(menuConfig);
menu.setEventListeners();

const mobileMenuButton = document.querySelector('.nav-mobile-logo');
mobileMenuButton.addEventListener('click', () => menu.mobileOpen());

const formApi = new Api({
  baseUrl: 'https://formspree.io',
  headers: {
    'Accept': 'application/json'
  },
});

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
  }, cardTemplateSelector);
  const cardToAdd = card.generateCard()
  return cardToAdd;
}

function createPartner(dataJson) {
  const partner = new Partner({
    name: dataJson.name,
    htmlData: dataJson.htmlData,
    classActive: partnersSectionConfig.activeClass,
    handleItemClick: (dataHtml) => {
      //(desc, link) передаем во внутреннем методе карточки
      popupInfoOpen(dataHtml);
    },
  }, partnersSectionConfig.itemTemplateSelelector);
  const partnerToAdd = partner.generatePartner()
  return partnerToAdd;
}



const partnerList = new Section({
  data: initialPartners,
  renderer: (itemData) => {
    const partner = createPartner(itemData);
    partnerList.setItem(partner);
  }
}, partnersSectionConfig.containerSelector);

partnerList.renderItems();


const popupImage = new PopupWithImage(popupImageSelectorsCongig, popupImageSelector);
const popupHeatEx = new PopupWithHeatEx(popupToConfig, popupWithToSelector);

const popupCallBack = new PopupWithForm({
  formSubmitHandler: (formCallbackData) => {
    const name = formCallbackData.name;
    const tel = formCallbackData.tel;
    renderLoading(true, callbackSubmitButton, 'Отправить', 'Отправка...'); //вынести фразы в отдельный объект? elem: profileSubmBut, onLoadText:' ....
    formApi.sendCallForm(name, tel, callbackFormId)
      .then((response) => {
        console.log(response)
        popupCallBack.close();
        //сделать сообщение об успешной отправке
      })
      .catch((err) => console.log(err)) //сделать сообщение об успешной ошибке
      .finally(() => {
        formValidatorCallBack.disableSaveButton();
        renderLoading(false, callbackSubmitButton, 'Отправить', 'Отправка...');
      });
  },
  formCleanError: () => {
    formValidatorCallBack.cleanAllErrors();
  },
}, callBackPopupSelector)


popupImage.setEventListeners();
popupCallBack.setEventListeners();

//popupHeatEx.setEventListeners();

//навешиваем слушатели на элементы сайта
callBackPopupOpenButton.addEventListener("mousedown", () => {
  popupCallBack.open();
})


platesSvg.addEventListener("click", (evt) => {
  popupHeatEx.open(initialHeatEx[evt.target.dataset.to]);
  console.log(initialHeatEx[evt.target.dataset.to]);
});



document.querySelectorAll('.photo-grid__item').forEach((item) => {
  item.addEventListener("mousedown", (evt) => {
    console.log(evt.target);
    popupImage.open({
      link: evt.target.querySelector('.photo-grid__image').src,
      name: evt.target.querySelector('.photo-grid__image').alt,
    });
  });
});


/*Карта партнеров*/

const dinamicInfoPopupContainer = dinamicInfoPopup.querySelector('.map__popup-container');

function popupInfoOpen(dataHtml) {
  if (dataHtml) {
    const partnerEl = dataHtml.map(el => {
      const listItem = document.createElement('li');
      listItem.classList.add('map__container-li');
      listItem.textContent = el;
      return listItem;
    });
    partnerEl[0].setAttribute('style','font-weight:bold; margin-bottom:10px;');
    //dinamicInfoPopupContainer.innerHTML= '<div class="animate__animated animate__fadeInUp">'+dataHtml+'</div>';
    dinamicInfoPopupContainer.prepend(...partnerEl);
  }
  dinamicInfoPopup.classList.add('map__popup_opened');
}

popupInfoCloseButton.addEventListener('click', function () {
  dinamicInfoPopup.classList.remove('map__popup_opened');
  dinamicInfoPopupContainer.innerHTML ='';
  let mapActive = mapList.querySelector('.map__list-item_active')
  if (mapActive) {
    mapActive.classList.remove('map__list-item_active');
  }
});

/* Слайдер в хидере на главной */

const mainHeaderSlider = new Swiper(".mainHeaderSlider", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  parallax: true,
});