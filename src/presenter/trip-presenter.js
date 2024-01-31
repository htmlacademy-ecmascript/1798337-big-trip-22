import {render, remove, RenderPosition} from '../framework/render.js';
import { sortPointByPrice, sortPointsByTime, sortPointByDate, filter, generateSorting} from '../utils.js';
import Sorting from '../view/sorting.js';
import TripEventsList from '../view/trip-events-list.js';
import PointPresenter from './point-presenter.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const';
import NoEvents from '../view/no-events.js';
import FilterPresenter from './filter-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import TripInfo from '../view/trip-info.js';
import Loading from '../view/loading.js';

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
  #tripInfo = new TripInfo();
  #filterModel;
  #filterType = FilterType.EVERYTHING;
  #newEventPresenter;
  #sortingState = generateSorting(this.#currentSortType);
  #loadingComponent = new Loading();
  #isLoading = true;

  constructor(mainContainer, headerContainer, pointModel, offersModel, destinationModel, filterModel, onNewEventDestroy) {
    this.#mainContainer = mainContainer;
    this.#headerContainer = headerContainer;
    this.#pointModel = pointModel;
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;
    this.#filterModel = filterModel;
    this.#tripEventsListComponent = new TripEventsList();

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#newEventPresenter = new NewEventPresenter({
      destinations: this.#destinationModel.destinations,
      offers: this.#offersModel.offers,
      eventsListComponent: this.#tripEventsListComponent,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewEventDestroy,
    });
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filter[filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortPointByDate);

      case SortType.PRICE:
        return filteredPoints.sort(sortPointByPrice);

      case SortType.TIME:
        return filteredPoints.sort(sortPointsByTime);
    }

    return filteredPoints.sort(sortPointByDate);
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
  }

  createNewPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterType = FilterType.EVERYTHING;


    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#clearPointList({ resetSortType: true });
    this.#renderPointList();
    this.#newEventPresenter.init();
  }


  #renderApp() {
    this.#renderFilter();
    this.#renderTripInfo();

    if (this.#isLoading) {
      this.#renderLoading();
      console.log('loading');
      return;
    }

    if (this.points.length === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderPointsList();
  }

  #renderFilter() {
    const filterPresenter = new FilterPresenter({
      filterContainer: this.#headerContainer,
      filterModel: this.#filterModel,
      pointModel: this.#pointModel,
    });
    filterPresenter.init();
  }

  #renderTripInfo() {
    render(this.#tripInfo, this.#headerContainer, RenderPosition.BEFOREBEGIN);
  }

  #renderNoEvents() {
    this.#noEventComponent = new NoEvents({filterType: this.#filterModel.filter});
    render(this.#noEventComponent, this.#mainContainer);
  }


  #handleViewAction = (actionType, updateType, update) => {
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderPointList();
        break;
    }
  };

  #renderLoading() {
    render(this.#loadingComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);
  }


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

  #renderSort() {
    this.#sortingState = generateSorting(this.#currentSortType);
    this.#sortComponent = new Sorting({
      onSortTypeChange: this.#handleSortTypeChange,
      sortElements: this.#sortingState,
      sortingElements: this.#sortingState,
    });

    render(this.#sortComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);
  }

  #clearPointList(resetSortType = false) {
    this.#newEventPresenter.destroy();
    this.#pointPresentersId.forEach((presenter) => presenter.destroy());
    this.#pointPresentersId.clear();

    remove(this.#sortComponent);

    if (this.#noEventComponent) {
      remove(this.#noEventComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderPointList() {
    const pointCount = this.points.length;
    const points = this.points.slice(0, pointCount);
    if (pointCount === 0) {
      this.#renderNoEvents();
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

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderPointList();
  };
}
