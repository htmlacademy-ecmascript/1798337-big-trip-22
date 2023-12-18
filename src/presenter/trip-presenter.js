import {render} from '../render.js';
import FormEdit from '../view/form-edit.js';
import Sorting from '../view/sorting.js';
import Point from '../view/point.js';
import TripEventsList from '../view/trip-events-list.js';
import { waypointsMock } from '../mock/waypoints-mock.js';
import { getRandomInt } from '../utils.js';

export default class TripPresenter {

  constructor(mainContainer, pointModel) {
    this.mainContainer = mainContainer;
    this.pointModel = pointModel;
    this.tripEventsListComponent = new TripEventsList();
  }

  init() {
    const waypoints = this.pointModel.getWaypoints();
    const destinations = this.pointModel.getDestinations();
    const offers = this.pointModel.getOffers();

    render(new Sorting(), this.mainContainer);
    render(this.tripEventsListComponent, this.mainContainer);
    render(new FormEdit(waypoints[getRandomInt(waypointsMock.length)],destinations, offers), this.tripEventsListComponent.getElement());

    for (const point of waypoints) {
      render(new Point(point,destinations, offers), this.tripEventsListComponent.getElement());
    }
  }
}
