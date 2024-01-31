import Observable from '../framework/observable.js';
import { waypointsMock } from '../mock/waypoints-mock.js';

export default class PointModel extends Observable {

  #pointsApiService = null;
  #points = [];

  constructor({ pointsApiService }) {
    super();
    // this.#points = waypointsMock;
    this.#pointsApiService = pointsApiService;
    // console.log(pointsApiService);

    this.#pointsApiService.points.then((points) => {
      console.log(points);
    });
  }


  get points() {
    return structuredClone(this.#points);
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
}
