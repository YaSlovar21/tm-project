//import zatonUfa from '../../images/projects/ufa_zaton.png';
//import timashevskCondit from '../../images/projects/timashevsk_condit.png';
//import ufaUmnDom from '../../images/projects/ufa_umn_dom.png';

const zatonUfa = new URL('../../images/projects/ufa_zaton.png', import.meta.url);
const timashevskCondit = new URL('../../images/timashevsk_condit.png', import.meta.url);
const ufaUmnDom = new URL('../../images/projects/ufa_umn_dom.png', import.meta.url);

const ti025Img = new URL('../../images/descTO/ti025.png', import.meta.url);
const ti077Img = new URL('../../images/descTO/ti077.png', import.meta.url);
const ti13Img = new URL('../../images/descTO/ti13.png', import.meta.url);
const ti18Img = new URL('../../images/descTO/ti18.png', import.meta.url);
const ti28Img = new URL('../../images/descTO/ti28.png', import.meta.url);
const ti45Img = new URL('../../images/descTO/ti45.png', import.meta.url);
const ti52Img = new URL('../../images/descTO/ti52.png', import.meta.url);
const ti65Img = new URL('../../images/descTO/ti65.png', import.meta.url);
const ti82Img = new URL('../../images/descTO/ti82.png', import.meta.url);
const ti95Img = new URL('../../images/descTO/ti95.png', import.meta.url);

export const callbackFormId = 'mdoygyzz';


//секция, куда загружаются карточки проектов
export const projectsContainerSelector = '.projects__items';

//template карточки проекта
export const projectTemplateSelector = "#project-template";
export const projectHorizontalTemplateSelector = "#project-horizontal-template";

export const cardArticleConfig = {
  cardArticleTemplateSelector: '#article-template',
  articleCardSelector: '.infoitem',
  articleTagsSectionSelector: '.infoitem__header',
  articleTagClass: 'infoitem__span-button',
  articleHeadSelector: '.infoitem__name',
  articleDescSelector: '.infoitem__description',
  articleLinkSelector: '.infoitem__link',
  cardListSection: '.cards-js-rendered',
}

/*
      name: item.name,
      link: item.link,
      to: item.model,
      naznach: item.naznach,
      q: item.q,
*/
export const initialProjects = [
    {
      name: "Котельная в квартале 34, г. Уфа, жилой район «Затон-Восточный»",
      link: zatonUfa,
      to: "ТИ82-201",
      naznach: "Отопление, ГВС",
      q: "17500 кВт",
      animateClass: 'animate__fadeIn',
    },
    {
      name: "Кондитерский комбинат «Кубань», г. Тимашевск, Краснодарский край",
      link: timashevskCondit,
      to: "ТИ52-77",
      naznach: "ГВС",
      q: "3,5 Гкал/ч",
      animateClass: 'animate__fadeIn',
    },
    {
      name: "БИТП Новый умный дом в г. Уфа, ул. Злобина, 31",
      link: ufaUmnDom,
      to: "ТИ13 (31-53 пластин)",
      naznach: "Отопление, ГВС",
      q: "от 0.3 до 0.5 Гкал/ч",
      animateClass: 'animate__fadeIn',
    },
];

const blogPath = 'blog-proizvodstva'

export const tagsAliases = {
  'gkh' : 'ЖКХ',
  'project': 'Проект',
  'btp': 'БТП',
  'food': 'Пищевые',
  'example': 'Пример расчёта',
  'prod': 'Продукция',
}

export const initialArticles = [
  {
    tags: ['gkh', 'prod'],
    linkPath: `/${blogPath}/plastinchatye-teploobmenniki-otopleniya.html`,
    heading: '1Пластинчатые теплообменники отопления',
    description: 'Производство теплообменников для отопления',
  },
  {
    tags: ['prod', 'food'],
    linkPath: `/${blogPath}/plastinchatye-teploobmenniki-otopleniya.html`,
    heading: '2Пластинчатые пастеризаторы',
    description: 'Производство пластинчатых пастеризаторов пищевых жидкостей',
  },
  {
    tags: ['prod', 'food'],
    linkPath: `/${blogPath}/plastinchatye-teploobmenniki-otopleniya.html`,
    heading: '3Пластинчатые охладители',
    description: 'Охлаждение жидкости в потоке, возможно пищевое исполнение',
  },
  {
    tags: ['gkh', 'project', 'example'],
    linkPath: `/${blogPath}/plastinchatye-teploobmenniki-otopleniya.html`,
    heading: '4Пластинчатые теплообменники для гвс',
    description: 'Производство теплобменников горячего водоснабжения',
  },
  {
    tags: ['gkh', 'btp'],
    linkPath: `/${blogPath}/plastinchatye-teploobmenniki-otopleniya.html`,
    heading: '5Проектирование блочных тепловых пунктов',
    description: 'Квалифицированные инженеры завода по производству теплообменников спроектируют БТП',
  },
  {
    tags: ['prod', 'food'],
    linkPath: `/${blogPath}/plastinchatye-teploobmenniki-otopleniya.html`,
    heading: '6Пластинчатые пастеризаторы',
    description: 'Производство пластинчатых пастеризаторов пищевых жидкостей',
  },
  {
    tags: ['prod', 'food'],
    linkPath: `/${blogPath}/plastinchatye-teploobmenniki-otopleniya.html`,
    heading: '7Пластинчатые охладители',
    description: 'Охлаждение жидкости в потоке, возможно пищевое исполнение',
  },
  {
    tags: ['gkh', 'project', 'example'],
    linkPath: `/${blogPath}/plastinchatye-teploobmenniki-otopleniya.html`,
    heading: '8Пластинчатые теплообменники для гвс',
    description: 'Производство теплобменников горячего водоснабжения',
  },
  {
    tags: ['gkh', 'btp'],
    linkPath: `/${blogPath}/plastinchatye-teploobmenniki-otopleniya.html`,
    heading: '9Проектирование блочных тепловых пунктов',
    description: 'Квалифицированные инженеры завода по производству теплообменников спроектируют БТП',
  },
  {
    tags: ['gkh', 'btp'],
    linkPath: `/${blogPath}/plastinchatye-teploobmenniki-otopleniya.html`,
    heading: '10Проектирование блочных тепловых пунктов',
    description: 'Квалифицированные инженеры завода по производству теплообменников спроектируют БТП',
  },
];


export const initialHeatEx = {
  'ti-025': {
    name: "ТИ 025",
    img: ti025Img,
    desc: "ТИ025 – имеет широкую гамму подключения подтрубков: Ду20, Ду25, Ду32, Ду40.Конструкция пластины позволяет формировать 12 разновидностей каналов для прохода различных жидкостей, что позволяет изменять гидравлическое сопротивление и теплопередачу, при этом сопротивление греющей и нагревающей жидкости может быть разное. Особая конструкция клипа надежно закрепляет уплотнение на пластину, тем самым исключает обрыв при монтаже пластины.",
    link3d: "https://disk.yandex.ru/d/p4EH75u--S1Dzg",
    baseUrl: '/catalog/ti-025.html'
  },
  'ti-077': {
    name: "ТИ 077",
    img: ti077Img,
    desc: "ТИ077 – имеет широкую гамму подключения подтрубков: Ду20, Ду25, Ду32, Ду40.Конструкция пластины позволяет формировать 12 разновидностей каналов для прохода различных жидкостей, что позволяет изменять гидравлическое сопротивление и теплопередачу, при этом сопротивление греющей и нагревающей жидкости может быть разное. Особая конструкция клипа надежно закрепляет уплотнение на пластину (рисунок 1,2), тем  самым исключает обрыв при монтаже пластины.",
    link3d: "https://disk.yandex.ru/d/kEiGbHo7Fi8Uwg",
    baseUrl: '/catalog/ti-077.html'
  },
  'ti-13': {
    name: "ТИ 13",
    img: ti13Img,
    desc: "Технические параметры пластины ТИ 13 позволяют использовать ее для сборки экономичных и эффективных теплообменников, а так же заменять в уже имеющихся теплообменниках пластины марки FP 14, GC, G.",
    link3d: "https://disk.yandex.ru/d/7C26Ov2CVbgl6w",
    baseUrl: '/catalog/ti-13.html'
  },
  'ti-18': {
    name: "ТИ 18",
    img: ti18Img,
    desc: "Линейка теплообменников ТИ18 имеет диаметр условного прохода до Ду65. Технические параметры пластины позволяют использовать ее для сборки экономических и эффективных теплообменников, а также заменять в уже имеющих теплообменниках пластины марки FP 20.",
    link3d: "https://disk.yandex.ru/d/O2lzhXAOWaA4ug",
    baseUrl: '/catalog/ti-18.html'
  },
  'ti-16-5': {
    name: "ТИ 16,5",
    img: "",
    desc: "Технические параметры пластины ТИ 13 позволяют использовать ее для сборки экономичных и эффективных теплообменников, а так же заменять в уже имеющихся теплообменниках пластины марки FP 14, GC, G.",
    link3d: "",
    baseUrl: '/catalog/ti-16-5.html'
  },
  'ti-28': {
    name: "ТИ 28",
    img: ti28Img,
    desc: "Технические параметры пластины ТИ 13 позволяют использовать ее для сборки экономичных и эффективных теплообменников, а так же заменять в уже имеющихся теплообменниках пластины марки FP 14, GC, G.",
    link3d: "https://disk.yandex.ru/d/3lo5g4MpzvYFcA",
    baseUrl: '/catalog/ti-28.html'
  },
  'ti-45': {
    name: "ТИ 45",
    img: ti45Img,
    desc: "Технические параметры пластины ТИ 13 позволяют использовать ее для сборки экономичных и эффективных теплообменников, а так же заменять в уже имеющихся теплообменниках пластины марки FP 14, GC, G.",

    link3d: "https://disk.yandex.ru/d/3lo5g4MpzvYFcA",
    baseUrl: '/catalog/ti-45.html'
  },
  'ti-65': {
    name: "ТИ 65",
    img: ti65Img,
    desc: "..............",
    link3d: "https://disk.yandex.ru/d/1c62zYE1I9yvyA",
    baseUrl: '/catalog/ti-65.html'
  },
  'ti-52': {
    name: "ТИ 52",
    img: ti52Img,
    desc: "..............",
    link3d: "https://disk.yandex.ru/d/1c62zYE1I9yvyA",
    baseUrl: '/catalog/ti-52.html'
  },
  'ti-82': {
    name: "ТИ 82",
    img: ti82Img,
    desc: "Технические параметры пластины ТИ 13 позволяют использовать ее для сборки экономичных и эффективных теплообменников, а так же заменять в уже имеющихся теплообменниках пластины марки FP 14, GC, G.",
    link3d: "https://disk.yandex.ru/d/1c62zYE1I9yvyA",
    baseUrl: '/catalog/ti-82.html'
  },
  'ti-95': {
    name: "ТИ 95",
    img: ti95Img,
    desc: "Технические параметры пластины ТИ 95 позволяют использовать ее для сборки экономичных и эффективных теплообменников, а так же заменять в уже имеющихся теплообменниках пластины марки FP 14, GC, G.",

    link3d: "",
    baseUrl: '/catalog/ti-95.html'
  },
  'ti-116': {
    name: "ТИ 116",
    img: "",
    desc: "..............",
    link3d: "",
    baseUrl: '/catalog/ti-116.html'
  },
}
export const initialPartners = [
  {
    name: 'Чита',
    htmlData: {
      nameOfPartner: 'ООО \"Интерсервис\"',
      telephoneNumbers: ['8-914-130-30-30'],
    }
  },
  {
    name: 'Архангельск',
    htmlData: {
      nameOfPartner: 'ООО \"Теплогазстрой\"',
      telephoneNumbers: ['8(8182)-639-739'],
      site: 'http://tgs29.ru/',
    },
  },
  {
    name: 'Краснодар',
    htmlData: {
      nameOfPartner: 'ООО \"Ютермо\"',
      telephoneNumbers: ['8 800 700-09-58', '+7 (905) 406-75-76'],
      site: 'https://utermo.ru/',
    },
  },
  {
    name: 'Астрахань',
    htmlData: {
      nameOfPartner: 'ООО \"Ютермо\"',
      telephoneNumbers: ['8 800 700-09-58', '+7 (905) 406-75-76'],
      site: 'https://utermo.ru/',
    },
  },
  {
    name: 'Ростов-на-Дону',
    htmlData: {
      nameOfPartner: 'ООО \"Ютермо\"',
      telephoneNumbers: ['8 800 700-09-58', '+7 (905) 406-75-76'],
      site: 'https://utermo.ru/',
    },
  },
  {
    name: 'Севастополь',
    htmlData: {
      nameOfPartner: 'ООО \"Ютермо\"',
      telephoneNumbers: ['8 800 700-09-58', '+7 (905) 406-75-76'],
      site: 'https://utermo.ru/',
    },
  },
  {
    name: 'Ставрополь',
    htmlData: {
      nameOfPartner: 'ООО \"Ютермо\"',
      telephoneNumbers: ['8 800 700-09-58', '+7 (905) 406-75-76'],
      site: 'https://utermo.ru/',
    },
  },
  {
    name: 'Махачкала',
    htmlData: {
      nameOfPartner: 'ООО \"Ютермо\"',
      telephoneNumbers: ['8 800 700-09-58', '+7 (905) 406-75-76'],
      site: 'https://utermo.ru/',
    },
  },
  {
    name: 'Волгоград',
    htmlData: {
      nameOfPartner: 'ООО \"Ютермо\"',
      telephoneNumbers: ['8 800 700-09-58', '+7 (905) 406-75-76'],
      site: 'https://utermo.ru/',
    },
  },
  {
    name: 'Новосибирск',
    htmlData: {
      nameOfPartner: 'ООО \"Инженерные системы\"',
      telephoneNumbers: ['+7-903-900-36-63'],
    },
  },
  {
    name: 'Искитим',
    htmlData: {
      nameOfPartner: 'ООО \"Инженерные системы\"',
      telephoneNumbers: ['+7-903-900-36-63'],
    },
  },
  {
    name: 'Омск',
    htmlData: {
      nameOfPartner: 'ООО \"Термополис+\"',
      telephoneNumbers: ['+7(3812) 660-137'],
    },
  },
  {
    name: 'Оренбург',
    htmlData: {
      nameOfPartner: 'ООО \"Отопление качество\"',
      telephoneNumbers: ['8-922-555-75-17'],
    },
  },
  {
    name: 'Томск',
    htmlData: {
      nameOfPartner: 'ООО \"Амито\"',
      telephoneNumbers: ['8 (3822) 978-933'],
      site: 'https://amito-t.ru/',
    },
  },
  {
    name: 'Уфа',
    htmlData: {
      nameOfPartner: 'ООО \"Партнер\"',
      telephoneNumbers: ['+7(347) 236-05-34', '+7(347)236-65-38 '],
      site: 'http://www.partnerufa.ru',
    },
  },
  {
    name: 'Стерлитамак',
    htmlData: {
      nameOfPartner: 'ООО \"Партнер\"',
      telephoneNumbers: ['+7(347) 236-05-34', '+7(347)236-65-38 '],
      site: 'http://www.partnerufa.ru',
    },
  },
  {
    name: 'Владивосток',
    htmlData: {
      nameOfPartner: 'ООО \"Солид ДВ\"',
      telephoneNumbers: ['+7-902-482-7837', '+7-902-480-5454'],
    },
  },
  {
    name: 'Иркутск',
    htmlData: {
      nameOfPartner: 'ООО \"Константа\"',
      telephoneNumbers: ['+7 (3952) 42-87-03 '],
    },
  },
  {
    name: 'Ижевск',
    htmlData: {
      nameOfPartner: 'ООО \"Отопление качество\"',
      telephoneNumbers: ['+7 (3412) 27-18-78'],
    },
  },
  {
    name: 'Вологда',
    htmlData: {
      nameOfPartner: 'ООО \"Протемол\"',
    },
  },
  {
    name: 'Санкт-Петербург',
    htmlData: {
      nameOfPartner: 'ООО \"Хортэк-ОПТ\"',
      telephoneNumbers: ['+7 (812) 703-42-30'],
    },
  },
];

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


// конфиг селекторов в модальном окне с картиной и подписью
export const popupImageSelectorsCongig = {
    popupImageSelector: '.popup__image',
    popupImageDescSelector: '.popup__image-description'
}

export const popupToConfig = {
  popupImageToSelector: '.popup__to-img',
  popupImageContainerSelector: '.popup__to-img-container',
  popupImageNameSelector: '.popup__to-name',
  popupImageDescSelector: '.popup__to-desc',
  popupImageLink3dSelector: '.popup__to-3dlink',
}

export const formValidatorConfig = {
  inputSelector: '.raschet-bem__input',
  submitButtonSelector: '.button-bem',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'raschet-bem__input_type_error',
  errorClass: 'raschet-bem__input-error_visible'
}

export const raschetValidatorConfig = {
  inputSelector: '.raschet-bem__input',
  submitButtonSelector: '.raschet-bem__submit-button',
  inactiveButtonClass: 'raschet-bem__submit-button_disabled',
  inputErrorClass: 'raschet-bem__input_type_error',
  errorClass: 'raschet-bem__input-error_visible'
}

export const lineformConfig = {
  inputSelector: '.lineform__input',
  submitButtonSelector: '.lineform__button-save',
  inactiveButtonClass: 'raschet-bem__submit-button_disabled',
  inputErrorClass: 'raschet-bem__input_type_error',
  errorClass: 'raschet-bem__input-error_visible'
}

