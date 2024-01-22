import Observable from '../framework/observable.js';
import { offersMock} from '../mock/offers-mock.js';
import { destinationsMock } from '../mock/destinations-mock.js';
import { waypointsMock } from '../mock/waypoints-mock.js';

export default class PointModel extends Observable {

  #points = [];
  #offers = [];
  #destinations = [];

  constructor() {
    super();
    this.#points = waypointsMock;
    this.#offers = offersMock;
    this.#destinations = destinationsMock;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }
}
