import AbstractView from '../framework/view/abstract-view';
import { NoEventsMessage } from '../const.js';


function createNoEventsMessage(filterType) {
  const noEventMessageValue = NoEventsMessage[filterType.toUpperCase()];
  return (`<p class="trip-events__msg">${noEventMessageValue}</p>`);
}

export default class NoEvents extends AbstractView {
  #filterType = null;

  constructor({filterType: filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoEventsMessage(this.#filterType);
  }
}
