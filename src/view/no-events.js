import AbstractView from '../framework/view/abstract-view';


function createNoEventsMessage(message) {
  return(
    `<p class="trip-events__msg">${message}</p>`
  );
}

export default class NoEvents extends AbstractView {
  #message = null;

  constructor(message) {
    super();
    this.#message = message;
  }

  get template() {
    return createNoEventsMessage(this.#message);
  }
}
