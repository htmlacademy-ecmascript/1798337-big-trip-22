import {render} from '../render.js';
import Filter from '../view/filter-view.js';


export default class HeaderPresenter {

  constructor(headerContainer) {
    this.headerContainer = headerContainer;
  }

  init() {
    render(new Filter(), this.headerContainer);
  }
}
