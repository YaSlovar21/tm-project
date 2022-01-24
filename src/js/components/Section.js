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

    renderItems() {
        this._renderedItems.forEach(item => {
          setTimeout(()=> {
           this._renderer(item);
          },this._delay);
          this._delay += 1500;
        });
    }
}