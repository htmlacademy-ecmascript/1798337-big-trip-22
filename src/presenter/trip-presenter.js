import {render} from '../framework/render.js';
import { updateItem } from '../utils.js';
import Sorting from '../view/sorting.js';
import TripEventsList from '../view/trip-events-list.js';
import PointPresenter from './point-presenter.js';
import Filter from '../view/filter.js';
import { generateFilter } from '../mock/filter.js';


export default class TripPresenter {

  #mainContainer = null;
  #headerContainer = null;
  #pointModel = null;
  #tripEventsListComponent = null;
  #points = [];
  #pointPresentersId = new Map();

  constructor(mainContainer, headerContainer, pointModel) {
    this.#mainContainer = mainContainer;
    this.#headerContainer = headerContainer;
    this.#pointModel = pointModel;
    this.#tripEventsListComponent = new TripEventsList();
  }

  init() {
    this.#points = [...this.#pointModel.waypoints];
    const destinations = this.#pointModel.destinations;
    const offers = this.#pointModel.offers;

    const filters = generateFilter(this.#points);

    render(new Filter(filters), this.#headerContainer);
    render(new Sorting(), this.#mainContainer);
    render(this.#tripEventsListComponent, this.#mainContainer);

    for (const point of this.#points) {
      this.#renderPoint({point, destinations, offers});
    }
  }

  #renderPoint({point, destinations, offers}) {
    const pointPresenter = new PointPresenter({
      tripEventsListComponent: this.#tripEventsListComponent,
      onPointChange: this.#onPointChange,
      handleModeChange: this.#handleModeChange
    });

    pointPresenter.init(point, destinations, offers);
    this.#pointPresentersId.set(point.id, pointPresenter);
  }

  #clearPointsList() {
    this.#pointPresentersId.forEach((presenter) => presenter.destroy());
    this.#pointPresentersId.clear();
  }

  #handleModeChange = () => {
    this.#pointPresentersId.forEach((presenter) => presenter.resetView());
  };

  #onPointChange = (changedPoint) => {
    this.#points = updateItem(this.#points, changedPoint);
    this.#pointPresentersId.get(changedPoint.id).init(changedPoint, this.#pointModel.destinations, this.#pointModel.offers);
  };
}
