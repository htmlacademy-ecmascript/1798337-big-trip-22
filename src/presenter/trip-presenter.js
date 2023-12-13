import {render} from '../render.js';
import FormEdit from '../view/form-edit.js';
import Sorting from '../view/sorting.js';
import RoutePoint from '../view/route-point.js';
import TripEventsList from '../view/trip-events-list.js';

export default class TripPresenter {
  tripEventsListComponent = new TripEventsList;

  constructor({mainContainer, tripModel}) {
    this.mainContainer = mainContainer;
    this.tripModel = tripModel;
  }

  init() {

    this.boardTrips = [...this.tripModel. getDestination()];
    render(new Sorting(), this.mainContainer);
    render(this.tripEventsListComponent, this.mainContainer);
    render(new FormEdit(), this.tripEventsListComponent.getElement());
    for (let i = 0; i < this.boardTrips.length; i++) {
      render(new RoutePoint({destination: this.boardTrips[i]}), this.tripEventsListComponent.getElement());
    }
  }
}
