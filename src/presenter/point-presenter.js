import {render, replace, remove} from '../framework/render.js';
import FormEdit from '../view/form-edit.js';
import Point from '../view/point.js';
import { isEscapeKey } from '../utils.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #tripEventsListComponent = null;
  #pointComponent = null;
  #formEditComponent = null;
  #point = null;
  #destinations = null;
  #offers = null;
  #onPointChange = null;
  #onModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({tripEventsListComponent, onPointChange, handleModeChange}) {
    this.#tripEventsListComponent = tripEventsListComponent;
    this.#onPointChange = onPointChange;
    this.#onModeChange = handleModeChange;
  }

  init(point, destinations, offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    const prevPointComponent = this.#pointComponent;
    const prevFormEditComponent = this.#formEditComponent;

    this.#pointComponent = new Point({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditButtonClick: this.#onEditButtonClick,
      onFavoriteButtonClick: this.#onFavoriteButtonClick,

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

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#formEditComponent, prevFormEditComponent);
    }

    remove(prevPointComponent);
    remove(prevFormEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#formEditComponent);
  }

  #onEditButtonClick = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escKeyDownButton);
  };

  #onFormEditSubmit = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownButton);
  };

  #replacePointToForm() {
    replace(this.#formEditComponent, this.#pointComponent);
    this.#onModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#formEditComponent);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownButton = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownButton);
    }
  };

  #onFavoriteButtonClick = () => {
    this.#point.isFavorite = !this.#point.isFavorite;
    this.#onPointChange(this.#point);
  };
}
