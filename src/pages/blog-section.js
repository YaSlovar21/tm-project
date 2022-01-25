import './blog-section.css';

import {
  tags,
  initialArticles
} from '../js/utils/constants.js';

import Section from '../js/components/Section.js';

const formFilter = document.forms.filterForm;

let checked = [];


const cardListSection = '.cards-js-rendered';

const cardsList = new Section({
  data: initialArticles,
  renderer: (item) => {
    const message = item.isOwner
      ? new UserMessage(item, '.message-template_type_user')
      : new DefaultMessage(item, '.message-template_type_default');

    const messageElement = message.generate();

    cardsList.setItem(messageElement);
    },
  },
  cardListSection
);

formFilter.addEventListener("change", () => {
  const checkedFromForm = Array.from(formFilter.elements.filterbox).filter((item)=>{
    return item.checked;
  }).map((item)=> {
    return item.value;
  });
  checked = checkedFromForm;
  console.log(checked);
})

function isIntersection(arrA, arrB) {
  return arrA.some(item => arrB.includes(item));
}

function articlesMapper(tags, articles) {
  return articles.filter(item => isIntersection(item.tags, tags));
}

const articlesToRender = articlesMapper(['btp', 'project'], initialArticles);
console.log(articlesToRender);