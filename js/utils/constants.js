//import zatonUfa from '../../images/projects/ufa_zaton.png';
//import timashevskCondit from '../../images/projects/timashevsk_condit.png';
//import ufaUmnDom from '../../images/projects/ufa_umn_dom.png';

const zatonUfa = new URL('../../images/projects/ufa_zaton.png', import.meta.url);
const timashevskCondit = new URL('../../images/timashevsk_condit.png', import.meta.url);
const ufaUmnDom = new URL('../../images/projects/ufa_umn_dom.png', import.meta.url);

const ti077Img = new URL('../../images/descTO/ti077.png', import.meta.url);

export const callbackFormId = 'mdoygyzz';


//секция, куда загружаются карточки проектов
export const projectsContainerSelector = '.projects__items';

//template карточки проекта
export const projectTemplateSelector = "#project-template";

export const initialProjects = [
    {
      name: "Котельная в квартале 34, г. Уфа, жилой район «Затон-Восточный»",
      link: zatonUfa,
    },
    {
      name: "Кондитерский комбинат «Кубань», г. Тимашевск, Краснодарский край",
      link: timashevskCondit,
    },
    {
      name: "БИТП Новый умный дом в г. Уфа, ул. Злобина, 31",
      link: ufaUmnDom,
    },
];



export const initialHeatEx = {
  'ti-025': {
    name: "ТИ 025",
    img: '',
    desc: "ТИ025 – имеет широкую гамму подключения подтрубков: Ду20, Ду25, Ду32, Ду40.Конструкция пластины позволяет формировать 12 разновидностей каналов для прохода различных жидкостей, что позволяет изменять гидравлическое сопротивление и теплопередачу, при этом сопротивление греющей и нагревающей жидкости может быть разное. Особая конструкция клипа надежно закрепляет уплотнение на пластину, тем самым исключает обрыв при монтаже пластины.",
    link3d: "",
  },
  'ti-077': {
    name: "ТИ 077",
    img: ti077Img,
    desc: "ТИ077 – имеет широкую гамму подключения подтрубков: Ду20, Ду25, Ду32, Ду40.Конструкция пластины позволяет формировать 12 разновидностей каналов для прохода различных жидкостей, что позволяет изменять гидравлическое сопротивление и теплопередачу, при этом сопротивление греющей и нагревающей жидкости может быть разное. Особая конструкция клипа надежно закрепляет уплотнение на пластину (рисунок 1,2), тем  самым исключает обрыв при монтаже пластины.",
    link3d: "",
  },
  'ti-13': {
    name: "ТИ 13",
    img: "../../images/descTO/ti13new.png",
    desc: "Технические параметры пластины ТИ 13 позволяют использовать ее для сборки экономичных и эффективных теплообменников, а так же заменять в уже имеющихся теплообменниках пластины марки FP 14, GC, G.",
    link3d: "",
  },
  'ti-18': {
    name: "ТИ 18",
    img: "../../images/descTO/ti18new.png",
    desc: "Линейка теплообменников ТИ18 имеет диаметр условного прохода до Ду65. Технические параметры пластины позволяют использовать ее для сборки экономических и эффективных теплообменников, а также заменять в уже имеющих теплообменниках пластины марки FP 20.",
    link3d: "",
  },
  'ti-16-5': {
    name: "ТИ 16,5",
    img: "",
    desc: "Технические параметры пластины ТИ 13 позволяют использовать ее для сборки экономичных и эффективных теплообменников, а так же заменять в уже имеющихся теплообменниках пластины марки FP 14, GC, G.",
    link3d: "",
  },
  'ti-28': {
    name: "ТИ 28",
    img: "../../images/descTO/ti28new.png",
    desc: "Технические параметры пластины ТИ 13 позволяют использовать ее для сборки экономичных и эффективных теплообменников, а так же заменять в уже имеющихся теплообменниках пластины марки FP 14, GC, G.",
    link3d: "",
  },
  'ti-45': {
    name: "ТИ 45",
    img: "../../images/descTO/ti45new.png",
    desc: "Технические параметры пластины ТИ 13 позволяют использовать ее для сборки экономичных и эффективных теплообменников, а так же заменять в уже имеющихся теплообменниках пластины марки FP 14, GC, G.",

    link3d: "",
  },
  'ti-65': {
    name: "ТИ 65",
    img: "",
    desc: "..............",
    link3d: "",
  },
  'ti-52': {
    name: "ТИ 52",
    img: "",
    desc: "..............",
    link3d: "",
  },
  'ti-82': {
    name: "ТИ 82",
    img: "../../images/descTO/ti82new.png",
    desc: "Технические параметры пластины ТИ 13 позволяют использовать ее для сборки экономичных и эффективных теплообменников, а так же заменять в уже имеющихся теплообменниках пластины марки FP 14, GC, G.",

    link3d: "",
  },
  'ti-95': {
    name: "ТИ 95",
    img: "../../images/descTO/ti-test95.png",
    desc: "Технические параметры пластины ТИ 95 позволяют использовать ее для сборки экономичных и эффективных теплообменников, а так же заменять в уже имеющихся теплообменниках пластины марки FP 14, GC, G.",

    link3d: "",
  },
  'ti-116': {
    name: "ТИ 116",
    img: "",
    desc: "..............",
    link3d: "",
  },
}
export const initialPartners = [
  {
    name: 'Чита',
    htmlData: {
      nameOfPartner: 'ООО \"Интерсервис\"',
      telephoneNumbers: ['+7(234)234-123', '+7(999)999-123'],
      site: 'http://interservice.com',
    }
  },
  {
    name: 'Архангельск',
    htmlData: {
      nameOfPartner: 'ООО \"Теплогазстрой\"',
      telephoneNumbers: ['+7(999)999-123'],
      site: 'http://interservice1.com',
    },
  },

]

export const initialPartners1 = [
  {
    name: 'Чита',
    htmlData: ['ООО \"Интерсервис\"']
  },
  {
    name: 'Архангельск',
    htmlData: ['ООО \"Теплогазстрой\"', '+7(234)234-123'],
  },
  {
    name: 'Краснодар',
    htmlData: ['ООО \"Ютермо\"', '+7(234)234-123'],
  },
  {
    name: 'Астрахань',
    htmlData: ['ООО \"Ютермо\"', '+7(234)234-123'],
  },
  {
    name: 'Ростов-на-Дону',
    htmlData: ['ООО \"Ютермо\"', '+7(234)234-123'],
  },
  {
    name: 'Севастополь',
    htmlData: ['ООО \"Ютермо\"', '+7(234)234-123'],
  },
  {
    name: 'Ставрополь',
    htmlData: ['ООО \"Ютермо\"', '+7(234)234-123'],
  },
  {
    name: 'Махачкала',
    htmlData: ['ООО \"Ютермо\"', '+7(234)234-123'],
  },
  {
    name: 'Волгоград',
    htmlData: ['ООО \"Ютермо\"', '+7(234)234-123'],
  },
  {
    name: 'Новосибирск',
    htmlData: ['ООО \"Инженерные системы\"', '+7(234)234-123'],
  },
  {
    name: 'Искитим',
    htmlData: ['ООО \"Инженерные системы\"', '+7(234)234-123'],
  },
  {
    name: 'Омск',
    htmlData: ['ООО \"Теплосервис\"', '+7(234)234-123'],
  },
  {
    name: 'Оренбург',
    htmlData: ['ООО \"Отопление качество\"', '+7(234)234-123'],
  },
  {
    name: 'Томск',
    htmlData: ['ООО \"Амито\"', '+7(234)234-123'],
  },
  {
    name: 'Уфа',
    htmlData: ['ООО \"Партнер\"', '+7(234)234-123'],
  },
  {
    name: 'Стерлитамак',
    htmlData: ['ООО \"Партнер\"', '+7(234)234-123'],
  },
  {
    name: 'Владивосток',
    htmlData: ['ООО \"Солид ДВ\"', '+7(234)234-123'],
  },
  {
    name: 'Иркутск',
    htmlData: ['ООО \"Константа\"', '+7(234)234-123'],
  },
  {
    name: 'Ижевск',
    htmlData: ['ООО \"Отопление качество\"', '+7(234)234-123'],
  },
  {
    name: 'Вологда',
    htmlData: ['ООО \"Протемол\"', '+7(234)234-123'],
  },
  {
    name: 'Санкт-Петербург',
    htmlData: ['ООО \"Хортэк-ОПТ\"', '+7(234)234-123'],
  },
]

export const ESC_CODE = 'Escape';

//секция, куда загружаются карточки проектов
export const cardsContainerSelector = '.projects__items';

//template карточки проекта
export const cardTemplateSelector = "#project-template";

export const partnersSectionConfig = {
  containerSelector: '.map__list',
  itemTemplateSelelector: '#partner-item-template',
  activeClass: 'map__list-item_active',
}

//селекторы модальных окон
export const popupImageSelector = '.popup-viewport';
export const callBackPopupSelector = '.popup-callback';
export const popupWithToSelector = '.popup-to';
export const popupWithMenuSelector = '.popup-menu';
//формы
/*
export const formCallBack= document.forms.formCallBack;
export const callbackSubmitButton = formCallBack.querySelector('.popup__button-save');

//кнопки открытия модальных окон
export const callBackPopupOpenButton = document.querySelector('.popup-callback-button');
export const popupWithSertifOpenButton = document.querySelector('.about__doc');

//интеактивные пластины
export const platesSvg = document.querySelector('.plates__svg');
*/


//конфиги

export const menuConfig = {
  navSelector: '.nav',
  navItemClass: 'nav__ul-item',
}


// конфиг селекторов в модальном окне с картиной и подписью
export const popupImageSelectorsCongig = {
    popupImageSelector: '.popup__image',
    popupImageDescSelector: '.popup__image-description'
}

export const popupToConfig = {
  popupImageToSelector: '.popup__to-img',
  popupImageNameSelector: '.popup__to-name',
  popupImageDescSelector: '.popup__to-desc',
  popupImageLink3dSelector: '.popup__to-3dlink',
}

export const formValidatorConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}

