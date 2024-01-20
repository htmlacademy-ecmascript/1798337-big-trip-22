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
  #handlerPointChange = null;
  #handlerModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({tripEventsListComponent, onPointChange, onModeChange}) {
    this.#tripEventsListComponent = tripEventsListComponent;
    this.#handlerPointChange = onPointChange;
    this.#handlerModeChange = onModeChange;
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
      onEditButtonClick: this.#EditButtonClickHandler,
      onFavoriteButtonClick: this.#FavoriteButtonClickHandler,

    });

    this.#formEditComponent = new FormEdit({
      point,
      destinations,
      offers,
      onFormEditSubmit: this.#FormEditSubmitHandler,
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
      this.#formEditComponent.reset({point: this.#point, offers: this.#offers, destinations: this.#destinations});
      this.#replaceFormToPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#formEditComponent);
  }

  #replacePointToForm() {
    replace(this.#formEditComponent, this.#pointComponent);
    this.#handlerModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#formEditComponent);
    this.#mode = Mode.DEFAULT;
    document.removeEventListener('keydown', this.#escKeyDownButton);
  }

  #EditButtonClickHandler = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escKeyDownButton);
  };

  #FormEditSubmitHandler = () => {
    this.#formEditComponent.reset({point: this.#point, offers: this.#offers, destinations: this.#destinations});
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownButton);
  };

  #escKeyDownButton = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#formEditComponent.reset({point: this.#point, offers: this.#offers, destinations: this.#destinations});
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownButton);
    }
  };

  #FavoriteButtonClickHandler = () => {
    this.#point.isFavorite = !this.#point.isFavorite;
    this.#handlerPointChange(this.#point);
  };
}
