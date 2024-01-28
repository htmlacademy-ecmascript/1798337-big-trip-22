import Observable from '../framework/observable.js';
import { destinationsMock } from '../mock/destinations-mock.js';

export default class DestinationModel extends Observable {

  #destination = destinationsMock;

  get destinations() {
    return this.#destination;
  }
}
