import Observable from '../framework/observable.js';
import { offersMock } from '../mock/offers-mock';

export default class OffersModel extends Observable {

  #offers = offersMock;

  get offers() {
    return this.#offers;
  }

  getOffersByType(type) {
    const allOffers = this.offers;
    return allOffers.find((offer) => offer.type === type);
  }

  getOffersById(type, itemsId) {
    const offersType = this.getOffersByType(type);
    return offersType.offers.filter((item) => itemsId.find((id) => item.id === id));
  }
}
