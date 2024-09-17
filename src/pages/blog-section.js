import './blog-section.css';

import CardArticle from '../js/components/CardArticle.js'
import SectionPaginator from '../js/components/SectionPaginator';
import Api from '../js/components/Api';

import {
  cardArticleConfig,
  tagsAliases
} from '../js/utils/constants.js';

const apiYdb = new Api({
  baseUrl: '',
  headers: {
    'Content-Type': 'application/json'
  }
});

import { isFullInclude ,articlesMapper} from '../js/utils/utils.js';


const moreButton = document.querySelector('.infocards__more-button');
const formFilter = document.forms.filterForm;


function createArticleCard(item) {
  const card = new CardArticle({
    tags: item.tags,
    linkPath: `/blog-proizvodstva/${item.staticPage}`,
    title: item.heading,
    description: item.description,
    // для супер класса
    cardTemplateSelector: cardArticleConfig.cardArticleTemplateSelector,
    cardSelector: cardArticleConfig.articleCardSelector,
  }, cardArticleConfig, tagsAliases);
  const cardToAdd = card.generateCard()
  return cardToAdd;
}

let initialCards;

async function getInitialNews() {
  const newsCards = await apiYdb.getInitialCards();
  initialCards = newsCards.map(i=> ({...i, type: JSON.parse(i.type)}));
  console.log(initialCards);
  const cardsList = new SectionPaginator({
    data: initialCards,
    renderer: (item) => {
      const card = createArticleCard(item);
      cardsList.appendItem(card);
      },
    },
    cardArticleConfig.cardListSection,
    moreButton,
  );
  cardsList.renderItems();

  formFilter.addEventListener("change", () => {
    const checkedFromForm = Array.from(formFilter.elements.filterbox).filter((item)=>{
      return item.checked;
    }).map((item)=> {
      return item.value;
    });
    console.log(checkedFromForm);
    if (checkedFromForm.length > 0) {
      cardsList.renderFiltered(articlesMapper(checkedFromForm, initialCards));
    } else {
      cardsList.renderFiltered(initialCards);
    };
  });

}

getInitialNews();