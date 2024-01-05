import { nanoid } from 'nanoid';
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
  #pointPresentersId = new Map();

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
      this.#renderPoint({point, destinations, offers, id: nanoid()});
    }
  }

  #renderPoint({point, destinations, offers, id}) {
    const pointPresenter = new PointPresenter({
      tripEventsListComponent: this.#tripEventsListComponent,
    });

    pointPresenter.init(point, destinations, offers);
    this.#pointPresentersId.set(point.id, pointPresenter);
  }

  #clearTaskList() {
    this.#pointPresentersId.forEach((presenter) => presenter.destroy());
    this.#pointPresentersId.clear();
  }

  // #handleTaskChange = (updatedTask) => {
  //   this.#boardTasks = updateItem(this.#boardTasks, updatedTask);
  //   this.#taskPresenters.get(updatedTask.id).init(updatedTask);
  // };
}
