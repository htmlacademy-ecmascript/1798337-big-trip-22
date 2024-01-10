import AbstractView from '../framework/view/abstract-view';


function createNoEventsMessege(messege) {
  return(
    `<p class="trip-events__msg">${messege}</p>`
  );
}

export default class NoEvents extends AbstractView {
  #messege = null;

  constructor(messege) {
    super();
    this.#messege = messege;
  }

  get template() {
    return createNoEventsMessege(this.#messege);
  }
}
