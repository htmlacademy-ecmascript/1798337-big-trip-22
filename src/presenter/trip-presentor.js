import {render} from '../render.js';
import Filter from '../view/filter-view.js';
import FormEdit from '../view/form-edit-view';
import Sorting from '../view/sorting-view.js';
import FormOfChoice from '../view/form-of-choice-view';
import RoutePoint from '../view/route-point-view.js';


export default class TripPresenter {
  constructor(headerContainer, mainContainer) {
    this.headerContainer = headerContainer;
    this.mainContainer = mainContainer;
  }

  init() {
    const formEdit = new FormEdit();
    render(formEdit, this.mainContainer);

    const filter = new Filter();
    render(filter, this.headerContainer);

    const sorting = new Sorting();
    render(sorting, this.mainContainer);

    const formOfChoice = new FormOfChoice();
    render(formOfChoice, this.mainContainer);

    for (let i = 0; i < 5; i++) {
      const waypoint = new RoutePoint();
      render(waypoint, this.mainContainer);
    }
  }
}
