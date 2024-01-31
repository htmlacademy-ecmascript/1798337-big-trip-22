import Observable from '../framework/observable.js';
// import { waypointsMock } from '../mock/waypoints-mock.js';

export default class PointModel extends Observable {

  #pointsApiService = null;
  #points = [];

  constructor({ pointsApiService }) {
    super();
    // this.#points = waypointsMock;
    this.#pointsApiService = pointsApiService;
    // console.log(pointsApiService);

    this.#pointsApiService.points.then((points) => {
      console.log(points.map(this.#adaptToClient));
    });
  }


  get points() {
    return structuredClone(this.#points);
  }

  async init() {
    try {
      const points = await this.#pointsApiService.tasks;
      this.#points = points.map(this.#adaptToClient);
    } catch(err) {
      this.#points = [];
    }
  }

  updatePoint(updateType, update) {

    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {

    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  #adaptToClient(point) {
    const adaptedWaypoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite'],
      offersId: point.offers,
    };

    delete adaptedWaypoint['base_price'];
    delete adaptedWaypoint['date_from'];
    delete adaptedWaypoint['date_to'];
    delete adaptedWaypoint['is_favorite'];
    delete adaptedWaypoint['offers'];

    return adaptedWaypoint;
  }
}
