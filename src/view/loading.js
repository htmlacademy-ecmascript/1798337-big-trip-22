import AbstractView from '../framework/view/abstract-view.js';

function createNoTaskTemplate(isError) {
  return (
    `<p class="trip-events__msg">
    ${isError ? 'Failed to load latest route information' : 'Loading...'}
    </p>`
  );
}

export default class Loading extends AbstractView {
  #isError = null;

  constructor({isError}) {
    super();
    this.#isError = isError;
  }

  get template() {
    return createNoTaskTemplate(this.#isError);
  }
}
