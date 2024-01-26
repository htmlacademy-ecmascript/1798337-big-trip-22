import AbstractView from '../framework/view/abstract-view';
import { NoEventsMessage } from '../const.js';


function createNoEventsMessage(filterType) {
  const noEventTextValue = NoEventsMessage[filterType.toUpperCase()];
  return (`<p class="trip-events__msg">${noEventTextValue}</p>`);
}

export default class NoEvents extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoEventsMessage(this.#filterType);
  }
}
