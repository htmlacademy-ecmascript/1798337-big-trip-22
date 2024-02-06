import {render, remove, RenderPosition} from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
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

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

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
  #loadingComponent;
  #isLoading = true;
  #isError = false;
  #newEventButtonComponent;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor(mainContainer, headerContainer, pointModel, offersModel, destinationModel, filterModel, onNewEventDestroy, newEventButtonComponent) {
    this.#mainContainer = mainContainer;
    this.#headerContainer = headerContainer;
    this.#pointModel = pointModel;
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;
    this.#filterModel = filterModel;
    this.#newEventButtonComponent = newEventButtonComponent;
    this.#tripEventsListComponent = new TripEventsList();

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#newEventPresenter = new NewEventPresenter({
      offersModel: this.#offersModel,
      destinationModel: this.#destinationModel,
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
      this.#renderLoading({ isError: false });
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


  #handleViewAction = async (actionType, updateType, update) => {

    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresentersId.get(update.id).setSaving();
        try {
          await this.#pointModel.updatePoint(updateType, update);
        } catch(err) {
          this.pointPresentersId.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newEventPresenter.setSaving();
        try {
          await this.#pointModel.addPoint(updateType, update);
        } catch(err) {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresentersId.get(update.id).setDeleting();
        try {
          await this.#pointModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresentersId.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresentersId.get(data.id).init(data);
        break;

      case UpdateType.MINOR:
        this.#clearPointList({ resetSortType: true });
        this.#renderPointList();
        break;
      case UpdateType.MAJOR:
        this.#clearPointList({resetSortType: true});
        this.#renderPointList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderPointList();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        this.#isError = true;
        remove(this.#loadingComponent);
        this.#renderPointList();
        this.#newEventButtonComponent.element.disabled = true;
        break;
    }
  };

  #renderLoading(isError) {
    this.#loadingComponent = new Loading(isError);
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

    if (this.#sortComponent) {
      remove(this.#sortComponent);
    }

    if (this.#noEventComponent) {
      remove(this.#noEventComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderPointList() {

    if (this.#isLoading) {
      this.#renderLoading({ isError: false });
      return;
    }

    if (this.#isError) {
      this.#renderLoading({ isError: true});
      return;
    }

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
    this.#newEventPresenter.destroy();
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
