import Partner from '../js/components/Partner.js';
import Section from '../js/components/Section.js';
import Api from '../js/components/Api';

import './map.css'

import {
  partnersSectionConfig,
} from '../js/utils/constants.js';

const apiYdb = new Api({
  baseUrl: '',
  headers: {
    'Content-Type': 'application/json'
  }
});

const mapSection = document.querySelector('.map');
const mapList = mapSection?.querySelector('.map__list');

const dinamicInfoPopup = mapSection?.querySelector('.map__popup');
const popupInfoCloseButton = dinamicInfoPopup?.querySelector(".map__popup-close");
const dinamicInfoPopupContainer = dinamicInfoPopup?.querySelector('.map__popup-container');

function createPartner(dataJson) {
  const partner = new Partner({
    name: dataJson.name,
    htmlData: dataJson.htmlData,
    classActive: partnersSectionConfig.activeClass,
    handleItemClick: (arrayOfPartnersInTown) => {
      //(desc, link) передаем во внутреннем методе карточки
      dinamicInfoPopupContainer.innerHTML ='';
      let mapActive = mapList.querySelector('.map__list-item_active')
      if (mapActive) {
        mapActive.classList.remove('map__list-item_active');
      }
      popupInfoOpen(arrayOfPartnersInTown);
      try {
        ym(56583337,'reachGoal','partner-town', {clickedTown: dataJson.name});
      } catch (err) {
        console.log(err);
      }
    },
  }, partnersSectionConfig.itemTemplateSelelector);
  const partnerToAdd = partner.generatePartner()
  return partnerToAdd;
}

function popupInfoOpen(arrayOfPartnersInTown) {
  arrayOfPartnersInTown.forEach((item, i, arr) =>{
    if (item.nameOfPartner !== '') {
      const listItem = document.createElement('li');
      listItem.classList.add('map__container-li');
      listItem.textContent = item.nameOfPartner;
      listItem.setAttribute('style','font-weight:bold; margin-bottom:15px;');
      dinamicInfoPopupContainer.append(listItem);
    }
    if (arr[i].telephoneNumbers !== '') {
      const partnerEl = arr[i].telephoneNumbers.map(el => {
        const listItem = document.createElement('li');
        listItem.classList.add('map__container-li');
        listItem.textContent = el;
        listItem.setAttribute('style','font-weight:300; margin-bottom:5px;');
        return listItem;
      });
      //partnerEl[-1].setAttribute('style','font-weight:bold; margin-bottom:10px;');
      //dinamicInfoPopupContainer.innerHTML= '<div class="animate__animated animate__fadeInUp">'+dataHtml+'</div>';
      dinamicInfoPopupContainer.append(...partnerEl);
    }
    if (arr[i].site !== '') {
      const listItem1 = document.createElement('li');
      listItem1.classList.add('map__container-li');
      const link = document.createElement('a');
      link.textContent = arr[i].site;
      link.href = arr[i].site;
      listItem1.append(link);
      listItem1.setAttribute('style','margin-top:10px;');
      dinamicInfoPopupContainer.append(listItem1);
    }
    const brEl = document.createElement('br');
    dinamicInfoPopupContainer.append(brEl);

  });
  dinamicInfoPopup.classList.add('map__popup_opened');
}

popupInfoCloseButton?.addEventListener('click', function () {
  dinamicInfoPopup.classList.remove('map__popup_opened');
  dinamicInfoPopupContainer.innerHTML ='';
  let mapActive = mapList.querySelector('.map__list-item_active')
  if (mapActive) {
    mapActive.classList.remove('map__list-item_active');
  }
});


function groupNameById(result, partner) {
  console.log(result);
  return {
    ...result,
    [partner.city]: result[partner.city] ? result[partner.city].concat(partner) : [partner]
  }
}

function groupNameByIdToArr(result, partner) {
  let findedIndexInAcc = result.findIndex(i => i.name === partner.city);
  if (findedIndexInAcc!==-1) {
    result[findedIndexInAcc]['htmlData'].push({...partner, telephoneNumbers: JSON.parse(partner.telephoneNumbers)})
    return result;
  }
  return [
    ...result,
    {
      name: partner.city,
      htmlData: [{...partner, telephoneNumbers: JSON.parse(partner.telephoneNumbers)}]
    }
  ]
};

async function getInitialPartners() {
  mapSection.classList.add('section-loading');
  const partners = await apiYdb.getInitiatPartners();
  const initialPartners = partners.reduce(groupNameByIdToArr,[]);
  initialPartners.sort(function(a,b) {
    const aSecondName = a.name.toLowerCase();
    const bSecondName = b.name.toLowerCase();
    if (aSecondName > bSecondName) return 1;
    if (aSecondName < bSecondName) return -1;
    return 0;
  });
  const partnerList = new Section({
    data: initialPartners,
    renderer: (itemData) => {
      const partner = createPartner(itemData);
      partnerList.appendItem(partner);
    }
  }, partnersSectionConfig.containerSelector, 0);
    partnerList.renderItems();

  mapSection.classList.remove('section-loading')
}
if (mapSection) {
  getInitialPartners();
}