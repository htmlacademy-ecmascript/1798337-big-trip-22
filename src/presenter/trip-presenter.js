import {render} from '../render.js';
import FormEdit from '../view/form-edit.js';
import Sorting from '../view/sorting.js';
import RoutePoint from '../view/route-point.js';
import TripEventsList from '../view/trip-events-list.js';

export default class TripPresenter {
  tripEventsListComponent = new TripEventsList;

  constructor(mainContainer) {
    this.mainContainer = mainContainer;
  }

  init() {
    render(new Sorting(), this.mainContainer);
    render(this.tripEventsListComponent, this.mainContainer);
    render(new FormEdit(), this.tripEventsListComponent.getElement());
    for (let i = 0; i < 3; i++) {
      render(new RoutePoint(), this.tripEventsListComponent.getElement());
    }
  }
}
