import {render} from '../render.js';
import FormEdit from '../view/form-edit.js';
import Sorting from '../view/sorting.js';
// import Point from '../view/point.js';
import TripEventsList from '../view/trip-events-list.js';

export default class TripPresenter {

  constructor(mainContainer) {
  // constructor({mainContainer, pointModel}) {
    this.mainContainer = mainContainer;
    // this.pointModel = pointModel;
    this.tripEventsListComponent = new TripEventsList();
  }

  // tripEventsListComponent = new TripEventsList();

  init() {
    // const offers = this.pointModel.getOffers();
    // const waypoints = this.pointModel.getWaypoints();
    // const destinations = this.pointModel.getDestinations();


    // this.boardTrips = [...this.waypointModel. getWaypoint()];

    render(new Sorting(), this.mainContainer);
    render(this.tripEventsListComponent, this.mainContainer);
    render(new FormEdit(), this.tripEventsListComponent.getElement());
    // for (let i = 0; i < 3; i++) {
    // render(new Point({waypoint: this.boardTrips[i]}), this.tripEventsListComponent.getElement());
    // render(new Point(waypoints, destinations, offers), this.tripEventsListComponent.getElement());
    // }
  }
}
