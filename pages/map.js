import Partner from '../js/components/Partner.js';
import Section from '../js/components/Section.js';

import {
  initialPartners,
  partnersSectionConfig,
} from '../js/utils/constants.js';

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
const dinamicInfoPopupContainer = dinamicInfoPopup.querySelector('.map__popup-container');

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