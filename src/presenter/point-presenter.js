import {render, replace, remove} from '../framework/render.js';
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
  #id = null;

  constructor({tripEventsListComponent}) {
    this.#tripEventsListComponent = tripEventsListComponent;
  }

  init(point, destinations, offers, id) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#id = id;

    const prevPointComponent = this.#pointComponent;
    const prevFormEditComponent = this.#formEditComponent;

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

    if (prevPointComponent === null || prevFormEditComponent === null) {
      render(this.#pointComponent, this.#tripEventsListComponent.element);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#tripEventsListComponent.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#tripEventsListComponent.contains(prevFormEditComponent.element)) {
      replace(this.#formEditComponent, prevFormEditComponent);
    }

    remove(prevPointComponent);
    remove(prevFormEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#formEditComponent);

    // render(this.#pointComponent, this.#tripEventsListComponent.element);
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
