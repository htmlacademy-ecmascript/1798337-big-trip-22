import { getRandomTrip } from '../mock/trip';

const TRIP_COUNT = 1;

export default class TripModel {
  destinations = Array.from({length: TRIP_COUNT}, getRandomTrip);

  getDestination() {
    return this.destinations;
  }
}
