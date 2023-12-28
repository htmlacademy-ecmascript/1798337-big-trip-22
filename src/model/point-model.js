import { offersMock} from '../mock/offers-mock.js';
import { destinationsMock } from '../mock/destinations-mock.js';
import { waypointsMock } from '../mock/waypoints-mock.js';

export default class PointModel {

  #waypoints = [];
  #offers = [];
  #destinations = [];

  constructor() {
    this.#waypoints = waypointsMock;
    this.#offers = offersMock;
    this.#destinations = destinationsMock;
  }

  get waypoints() {
    return this.#waypoints;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }
}
