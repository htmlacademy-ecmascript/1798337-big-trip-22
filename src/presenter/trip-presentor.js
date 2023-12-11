import {render} from '../render.js';
// import Filter from '../view/filter-view.js';
import FormEdit from '../view/form-edit-view';
import Sorting from '../view/sorting-view.js';
// import FormOfChoice from '../view/form-of-choice-view';
import RoutePoint from '../view/route-point-view.js';
import TripEventsList from '../view/trip-events-list.js';


export default class TripPresenter {

  tripEventsListComponent = new TripEventsList;

  constructor(mainContainer) {
    this.mainContainer = mainContainer;
  }

  init() {
    // render(new Filter(), this.headerContainer);
    render(new Sorting(), this.mainContainer);
    render(this.tripEventsListComponent, this.mainContainer);
    render(new FormEdit(), this.tripEventsListComponent.getElement());
    for (let i = 0; i < 3; i++) {
      render(new RoutePoint(), this.tripEventsListComponent.getElement());
    }
  }
}
