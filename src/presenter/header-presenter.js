import {render} from '../framework/render.js';
import Filter from '../view/filter.js';

export default class HeaderPresenter {

  constructor(headerContainer) {
    this.headerContainer = headerContainer;
  }

  init() {
    render(new Filter(), this.headerContainer);
  }
}
