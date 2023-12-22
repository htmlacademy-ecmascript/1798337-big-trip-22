import { offersMock} from '../mock/offers-mock.js';
import { destinationsMock } from '../mock/destinations-mock.js';
import { waypointsMock } from '../mock/waypoints-mock.js';

export default class PointModel {

  waypoints = [];
  offers = [];
  destinations = [];

  constructor() {
    this.waypoints = waypointsMock;
    this.offers = offersMock;
    this.destinations = destinationsMock;
  }

  getWaypoints() {
    return this.waypoints;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
