export default class Section {

    constructor({data, renderer}, cardlistSelector) {
        this._renderedItems = data;
        this._container = document.querySelector(cardlistSelector);
        this._renderer = renderer;
        this._delay=0;
    }

    setItem(element) {
        this._container.prepend(element);
    }

    appendItem(element) {
        this._container.append(element);
    }

    clear() {
      this._container.innerHTML = '';
    }

    renderFiltered(filteredData) {
     // this._container.classList.add('section-loading');
     // setTimeout(()=> {

        this.clear();
        this._renderedItems = filteredData;
        this._renderedItems.forEach(item => {
           this._renderer(item);
        });
        if (filteredData.length === 0) {
          this._container.textContent = 'По Вашему условию поиска статей пока нет.'
        }
      //  this._container.classList.remove('section-loading');
     // }, 800)
    }

    renderItems() {
        this._renderedItems.forEach(item => {
          setTimeout(()=> {
           this._renderer(item);
          },this._delay);
          this._delay += 200;
        });
    }
}