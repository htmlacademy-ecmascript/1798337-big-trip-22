import {render} from '../framework/render.js';
import { sortPointByPrice, sortPointsByTime, sortPointByDate, updateItem } from '../utils.js';
import Sorting from '../view/sorting.js';
import TripEventsList from '../view/trip-events-list.js';
import PointPresenter from './point-presenter.js';
import Filter from '../view/filter.js';
import { generateFilter } from '../mock/filter.js';
import { NoEventsMessage, SortType } from '../const';
import NoEvents from '../view/no-events.js';


export default class TripPresenter {

  #mainContainer = null;
  #headerContainer = null;
  #pointModel = null;
  #tripEventsListComponent = null;
  // #points = [];
  #destinations = [];
  #offers = [];
  #pointPresentersId = new Map();
  #sortComponent = null;
  #currentSortType = SortType.DAY;
  // #soursedPoints = [];

  constructor(mainContainer, headerContainer, pointModel) {
    this.#mainContainer = mainContainer;
    this.#headerContainer = headerContainer;
    this.#pointModel = pointModel;
    this.#tripEventsListComponent = new TripEventsList();
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#pointModel.points].sort(sortPointByDate);

      case SortType.PRICE:
        return [...this.#pointModel.points].sort(sortPointByPrice);
        // this.#points.sort(sortPointByPrice);
        // break;

      case SortType.TIME:
        return [...this.#pointModel.points].sort(sortPointsByTime);
        // this.#points.sort(sortPointsByTime);
        // break;

      default :
        return [...this.#pointModel.points].sort(sortPointByDate);
    }

    return this.#pointModel.points;
  }

  init() {

    // this.#points = [...this.#pointModel.waypoints].sort(sortPointByDate);
    // this.#soursedPoints = [...this.#pointModel.waypoints];
    this.#destinations = this.#pointModel.destinations;
    this.#offers = this.#pointModel.offers;

    const filters = generateFilter(this.points);

    render(new Filter(filters), this.#headerContainer);
    if (this.points.length === 0) {
      render(new NoEvents(NoEventsMessage.EVERYTHING), this.#mainContainer);
      return;
    }

    this.#renderSort();

    render(this.#tripEventsListComponent, this.#mainContainer);

    this.#renderPointsList({points: this.points, destinations: this.#destinations, offers: this.#offers});

  }


  #renderPointsList({points, destinations, offers}) {
    for (const point of points) {
      this.#renderPoint({point, destinations, offers});
    }
  }

  #renderPoint({point, destinations, offers}) {
    const pointPresenter = new PointPresenter({
      tripEventsListComponent: this.#tripEventsListComponent,
      onPointChange: this.#onPointChange,
      onModeChange: this.#onModeChange
    });

    pointPresenter.init(point, destinations, offers);
    this.#pointPresentersId.set(point.id, pointPresenter);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    // this.#sortPoints(sortType);
    this.#currentSortType = sortType;
    this.#clearPointsList();
    this.#renderPointsList({points: this.points, destinations: this.#destinations, offers: this.#offers});
  };

  // #sortPoints = (sortType) => {
  //   switch (sortType) {
  //     case SortType.DAY:
  //       this.#points.sort(sortPointByDate);
  //       break;

  //     case SortType.PRICE:
  //       this.#points.sort(sortPointByPrice);
  //       break;

  //     case SortType.TIME:
  //       this.#points.sort(sortPointsByTime);
  //       break;
  //     default :
  //       this.#points.sort(sortPointByDate);
  //   }

  //   this.#currentSortType = sortType;
  // };

  #renderSort() {
    this.#sortComponent = new Sorting({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#mainContainer);
  }

  #clearPointsList() {
    this.#pointPresentersId.forEach((presenter) => presenter.destroy());
    this.#pointPresentersId.clear();
  }

  #onModeChange = () => {
    this.#pointPresentersId.forEach((presenter) => presenter.resetView());
  };

  #onPointChange = (changedPoint) => {
    // this.#points = updateItem(this.#points, changedPoint);
    // this.#soursedPoints = updateItem(this.#points, this.#soursedPoints);
    // Здесь будем вызывать обновление модели
    this.#pointPresentersId.get(changedPoint.id).init(changedPoint, this.#pointModel.destinations, this.#pointModel.offers);
  };
}
