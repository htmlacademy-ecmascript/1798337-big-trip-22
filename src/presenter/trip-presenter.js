import {render} from '../framework/render.js';
// import FormEdit from '../view/form-edit.js';
import Sorting from '../view/sorting.js';
// import Point from '../view/point.js';
import TripEventsList from '../view/trip-events-list.js';
import PointPresenter from './point-presenter.js';


export default class TripPresenter {

  #mainContainer = null;
  #pointModel = null;
  #tripEventsListComponent = null;

  constructor(mainContainer, pointModel) {
    this.#mainContainer = mainContainer;
    this.#pointModel = pointModel;
    this.#tripEventsListComponent = new TripEventsList();
  }

  init() {
    const waypoints = this.#pointModel.waypoints;
    const destinations = this.#pointModel.destinations;
    const offers = this.#pointModel.offers;

    render(new Sorting(), this.#mainContainer);
    render(this.#tripEventsListComponent, this.#mainContainer);

    for (const point of waypoints) {
      this.#renderPoint(point, destinations, offers);
    }
  }

  #renderPoint(point, destinations, offers) {
    const pointPresenter = new PointPresenter({
      tripEventsListComponent: this.#tripEventsListComponent,
    });

    pointPresenter.init(point, destinations, offers);
  }
}
