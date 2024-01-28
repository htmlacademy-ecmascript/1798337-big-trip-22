import AbstractView from '../framework/view/abstract-view.js';

function createNewEventButton() {

  return ('<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>');
}

export default class NewEventButton extends AbstractView {
  #handleAddEventButton;

  constructor({ onClick }) {
    super();
    this.#handleAddEventButton = onClick;
    this.element.addEventListener('click', this.#AddEventButtonHandler);
  }

  get template() {
    return createNewEventButton();
  }

  #AddEventButtonHandler = (evt) => {
    evt.preventDefault();
    this.#handleAddEventButton();
  };
}
