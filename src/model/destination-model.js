import Observable from '../framework/observable.js';
// import { destinationsMock } from '../mock/destinations-mock.js';
import { UpdateType } from '../const.js';

export default class DestinationModel extends Observable {

  // #destination = destinationsMock;
  #destinations = [];
  #pointsApiService = null;

  constructor({ pointsApiService }) {
    super();

    this.#pointsApiService = pointsApiService;

    // this.#pointsApiService.destinations.then((destinations)=>{
    //   console.log(destinations);
    // });
  }


  get destinations() {
    return this.#destinations;
  }


  async init() {
    try {
      this.#destinations = await this.#pointsApiService.destinations;
      console.log(this.#destinations);
    } catch (err) {
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  }
}
