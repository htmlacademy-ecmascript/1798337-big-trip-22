import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class OffersModel extends Observable {

  #pointsApiService = null;
  #offers = [];

  constructor({ pointsApiService }) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get offers() {
    return this.#offers;
  }

  getOffersByType(type) {
    const allOffers = this.#offers;
    return allOffers.find((offer) => offer.type === type);
  }

  getOffersById(type, itemsId) {
    const offersType = this.getOffersByType(type);
    return offersType.offers.filter((item) => itemsId.find((id) => item.id === id));
  }

  async init() {
    try {
      this.#offers = await this.#pointsApiService.offers;
      // this._notify(UpdateType.INIT);
    } catch (err) {
      this.#offers = [];
      this._notify(UpdateType.ERROR);
    }
  }
}
