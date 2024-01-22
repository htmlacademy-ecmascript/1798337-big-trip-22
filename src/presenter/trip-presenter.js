import {render} from '../framework/render.js';
import { sortPointByPrice, sortPointsByTime, sortPointByDate, updateItem } from '../utils.js';
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
  #tripEventsListComponent = null;
  // #points = [];
  #destinations = [];
  #offers = [];
  #pointPresentersId = new Map();
  #sortComponent = null;
  #currentSortType = SortType.DAY;
  // #soursedPoints = [];
  #noEventsComponent = new NoEvents();
  #renderB

  constructor(mainContainer, headerContainer, pointModel) {
    this.#mainContainer = mainContainer;
    this.#headerContainer = headerContainer;
    this.#pointModel = pointModel;
    this.#tripEventsListComponent = new TripEventsList();

    this.#pointModel.addObserver(this.#handleModelEvent);
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

      // default :
      //   return [...this.#pointModel.points].sort(sortPointByDate);
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

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);

    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#pointModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#pointModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#pointModel.deleteTask(updateType, update);
        break;
    }
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
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
        this.#clearBoard();
        this.#renderBoard();
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  };


  #renderPointsList({points, destinations, offers}) {
    for (const point of points) {
      this.#renderPoint({point, destinations, offers});
    }
  }

  #renderPoint({point, destinations, offers}) {
    const pointPresenter = new PointPresenter({
      tripEventsListComponent: this.#tripEventsListComponent,
      onPointChange: this.#handleViewAction,
      onModeChange: this.#onModeChange
      // onDataChange: this.#handleViewAction,
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
    this.#clearBoard();
    this.#renderBoard();

    // this.#renderPointsList({points: this.points, destinations: this.#destinations, offers: this.#offers});
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
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#mainContainer);
  }

  #clearBoard({resetSortType = false} = {}) {
    const taskCount = this.tasks.length;

    this.#pointPresentersId.forEach((presenter) => presenter.destroy());
    this.#pointPresentersId.clear();

    remove(this.#sortComponent);
    // remove(this.#NoEvents);


    // if (resetRenderedTaskCount) {
    //   this.#renderedTaskCount = TASK_COUNT_PER_STEP;
    // } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества задач (например, удаление или перенос в архив)
      // нужно скорректировать число показанных задач
      // this.#renderedTaskCount = Math.min(taskCount, this.#renderedTaskCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderBoard() {
    const waypointCount = this.waypoints.length;
    const waypoints = this.waypoints.slice(0, waypointCount);
    if (waypointCount === 0) {
      this.#renderNoEvent();
      return;
    }
    this.#renderSort();
    for (let i = 0; i < waypointCount; i++) {
      this.#renderPoint(waypoints[i]);
    }
    // render(this.#boardComponent, this.#boardContainer);

    // const points = this.points;
    // const taskCount = points.length;

    // if (taskCount === 0) {
    //   this.#renderNoTasks();
    //   return;
    // }

    // this.#renderSort();
    // render(this.#tripEventsListComponent, this.this.#mainContainer);
  };
    // Теперь, когда #renderBoard рендерит доску не только на старте,
    // но и по ходу работы приложения, нужно заменить
    // константу TASK_COUNT_PER_STEP на свойство #renderedTaskCount,
    // чтобы в случае перерисовки сохранить N-показанных карточек
    // this.#renderTasks(tasks.slice(0, Math.min(taskCount, this.#renderedTaskCount)));

    // if (taskCount > this.#renderedTaskCount) {
    //   this.#renderLoadMoreButton();
    // }


    // #clearPointsList() {
    //   this.#pointPresentersId.forEach((presenter) => presenter.destroy());
    //   this.#pointPresentersId.clear();
    // }

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
