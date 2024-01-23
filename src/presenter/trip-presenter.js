import {render, remove} from '../framework/render.js';
import { sortPointByPrice, sortPointsByTime, sortPointByDate } from '../utils.js';
import Sorting from '../view/sorting.js';
import TripEventsList from '../view/trip-events-list.js';
import PointPresenter from './point-presenter.js';
import Filter from '../view/filter.js';
import { generateFilter } from '../mock/filter.js';
import { NoEventsMessage, SortType, UpdateType, UserAction } from '../const';
import NoEvents from '../view/no-events.js';


export default class TripPresenter {

  #mainContainer = null;
  #headerContainer = null;
  #pointModel = null;
  #offersModel;
  #destinationModel;
  #tripEventsListComponent = null;
  #pointPresentersId = new Map();
  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #noEventComponent;

  constructor(mainContainer, headerContainer, pointModel, offersModel, destinationModel) {
    this.#mainContainer = mainContainer;
    this.#headerContainer = headerContainer;
    this.#pointModel = pointModel;
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;
    this.#tripEventsListComponent = new TripEventsList();

    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#pointModel.points].sort(sortPointByDate);

      case SortType.PRICE:
        return [...this.#pointModel.points].sort(sortPointByPrice);

      case SortType.TIME:
        return [...this.#pointModel.points].sort(sortPointsByTime);
    }

    return [...this.#pointModel.points].sort(sortPointByDate);
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationModel.destinations;
  }

  init() {
    render(this.#tripEventsListComponent, this.#mainContainer);

    this.#renderApp();

    // this.#renderPointsList({points: this.points, destinations: this.#destinations, offers: this.#offers});

  }

  #renderApp() {
    this.#renderFilters();
    // this.#renderButtonNewEvent();
    // this.#renderTripInfo();
    if (this.points.length === 0) {
      this.#renderNoEvents();
      return;
    }
    // this.#renderSort();
    this.#renderPointsList();
  }

  #renderFilters() {
    const filters = generateFilter(this.points);
    render(new Filter(filters), this.#headerContainer);
  }

  #renderNoEvents() {
    this.#noEventComponent = new NoEvents(NoEventsMessage.EVERYTHING);
    // this.#noEventComponent = new NoEvents({ filterType: this.#filterType });
    render(this.#noEventComponent, this.#mainContainer);
  }


  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresentersId.get(data.id).init(data);
        break;

      case UpdateType.MINOR:
        this.#clearPointList({ resetSortType: true });
        this.#renderPointList();
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        this.#clearPointList({resetSortType: true});
        this.#renderPointList();
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  };


  #renderPointsList() {
    for (const point of this.points) {
      this.#renderPoint(point);
    }
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      tripEventsListComponent: this.#tripEventsListComponent,
      waypointModel: this.#pointModel,
      offersModel: this.#offersModel,
      destinationModel: this.#destinationModel,
      onPointChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresentersId.set(point.id, pointPresenter);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderPointList();

    // this.#renderPointsList({points: this.points, destinations: this.#destinations, offers: this.#offers});
  };

  #renderSort() {
    this.#sortComponent = new Sorting({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#mainContainer);
  }

  #clearPointList(resetSortType = false) {
    // this.#newEventPresenter.destroy();
    this.#pointPresentersId.forEach((presenter) => presenter.destroy());
    this.#pointPresentersId.clear();

    remove(this.#sortComponent);

    // if (this.#noEventComponent) {
    //   remove(this.#noEventComponent);
    // }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderPointList() {
    // for (let i = 0; i < this.points.length; i++) {
    //   this.#renderPoint(this.points[i]);
    const pointCount = this.points.length;
    const points = this.points.slice(0, pointCount);
    if (pointCount === 0) {
      this.#renderNoEvents();
      console.log('pointCount');
      return;
    }
    this.#renderSort();
    for (let i = 0; i < pointCount; i++) {
      this.#renderPoint(points[i]);
    }
  }

  #handleModeChange = () => {
    this.#pointPresentersId.forEach((presenter) => presenter.resetView());
  };

  #onPointChange = (changedPoint) => {
    // this.#points = updateItem(this.#points, changedPoint);
    // this.#soursedPoints = updateItem(this.#points, this.#soursedPoints);
    // Здесь будем вызывать обновление модели
    this.#pointPresentersId.get(changedPoint.id).init(changedPoint, this.#pointModel.destinations, this.#pointModel.offers);
  };
}
