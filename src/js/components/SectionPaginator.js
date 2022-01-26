import Section from "./Section";
// методы родителя
// setItem(element)
// appendItem(element)
// clear()

export default class SectionPaginator extends Section {
    constructor(props,cardsContainerSelector, moreButtonElement) {
        super(props, cardsContainerSelector);

        this._countBase = 3;
        this._buttonMore = moreButtonElement;
        console.log(this._buttonMore);
        this._buttonMore.addEventListener("mousedown", ()=>{
          this._countBase +=2;
          /*if (this._countBase > this._renderedItems.length) {
            this._buttonMore.classList.add('infocards__more-button_hidden');
          }*/
          this.clear();
          this.renderItems();
      });
    }

    renderFiltered(filteredData) {
      this._container.classList.add('section-loading');
      setTimeout(()=> {
        this._renderedItems = filteredData;
        this._countBase = 3;
        this.clear();
        if (filteredData.length === 0) {
          this._container.textContent = 'По Вашему условию поиска статей пока нет.'
        }
        this.renderItems();
        this._container.classList.remove('section-loading');
      }, 800)
    }

    renderItems() {
        this._renderedItems.slice(0, this._countBase).forEach(item => {
          this._renderer(item);
        });
    }
}