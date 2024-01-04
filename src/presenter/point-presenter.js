import {render, replace} from '../framework/render.js';
import FormEdit from '../view/form-edit.js';
import Point from '../view/point.js';
import { isEscapeKey } from '../utils.js';


export default class PointPresenter {
  #tripEventsListComponent = null;
  #pointComponent = null;
  #formEditComponent = null;
  #point = null;
  #destinations = null;
  #offers = null;

  constructor({tripEventsListComponent}) {
    this.#tripEventsListComponent = tripEventsListComponent;
  }

  init(point, destinations, offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    this.#pointComponent = new Point({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditButtonClick: this.#onEditButtonClick,
    });

    this.#formEditComponent = new FormEdit({
      point,
      destinations,
      offers,
      onFormEditSubmit: this.#onFormEditSubmit,
    });

    render(this.#pointComponent, this.#tripEventsListComponent.element);
  }

  #onEditButtonClick() {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escKeyDownButton);
  }

  #onFormEditSubmit() {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownButton);
  }

  #replacePointToForm() {
    replace(this.#formEditComponent, this.#pointComponent);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#formEditComponent);
  }

  #escKeyDownButton = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownButton);
    }
  };
}
