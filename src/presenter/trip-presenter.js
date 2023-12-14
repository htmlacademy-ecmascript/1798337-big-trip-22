import {render} from '../render.js';
import FormEdit from '../view/form-edit.js';
import Sorting from '../view/sorting.js';
import Waypoint from '../view/waypoint.js';
import TripEventsList from '../view/trip-events-list.js';

export default class TripPresenter {
  tripEventsListComponent = new TripEventsList;

  constructor({mainContainer, waypointModel}) {
    this.mainContainer = mainContainer;
    this.waypointModel = waypointModel;
  }

  init() {

    this.boardTrips = [...this.waypointModel. getWaypoint()];

    render(new Sorting(), this.mainContainer);
    render(this.tripEventsListComponent, this.mainContainer);
    render(new FormEdit(), this.tripEventsListComponent.getElement());
    for (let i = 0; i < this.boardTrips.length; i++) {
      render(new Waypoint({waypoint: this.boardTrips[i]}), this.tripEventsListComponent.getElement());
    }
  }
}
