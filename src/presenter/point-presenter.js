import {render, replace, remove} from '../framework/render.js';
import FormEdit from '../view/form-edit.js';
import Point from '../view/point.js';
import { isEscapeKey } from '../utils.js';
import {UserAction, UpdateType} from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #tripEventsListComponent = null;
  #pointComponent = null;
  #formEditComponent = null;
  #point = null;
  // #pointModel = null;
  #offersModel = null;
  #destinationModel = null;
  #destination = null;
  #destinations = null;
  #offers = null;
  #offersType = null;
  #handlerPointChange = null;
  #handlerModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({tripEventsListComponent, offersModel, destinationModel, onPointChange, onModeChange}) {
    this.#tripEventsListComponent = tripEventsListComponent;
    // this.#pointModel = pointModel;
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;
    this.#handlerPointChange = onPointChange;
    this.#handlerModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;
    this.#destinations = this.#destinationModel.destinations;
    this.#offers = [...this.#offersModel.offers];
    this.#offersType = this.#offersModel.getOffersByType(point.type);
    // this.#destination = this.#destinationModel.getDestinationsById(point.destination);

    const prevPointComponent = this.#pointComponent;
    const prevFormEditComponent = this.#formEditComponent;

    this.#pointComponent = new Point({
      point: this.#point,
      // destination: this.#destination,
      destinations: this.#destinations,
      // offers: [...this.#offersModel.getOffersById(point.type, point.offersId)],
      offers: [...this.#offers],
      onEditButtonClick: this.#EditButtonClickHandler,
      onFavoriteButtonClick: this.#FavoriteButtonClickHandler,

    });

    this.#formEditComponent = new FormEdit({
      point: this.#point,

      destinations: this.#destinationModel.destinations,
      offers: [...this.#offersModel.offers],
      // offersType: this.#offersType,
      // destination: this.#destination,
      // destinationAll: this.#destinationModel.destinations,
      // offersAll: [...this.#offersModel.offers],
      onFormEditSubmit: this.#FormEditSubmitHandler,
      onDeleteClick: this.#handleDeleteClick,
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
      this.#formEditComponent.reset({point: this.#point, offers: this.#offersType, destinations: this.#destination});
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

  #FormEditSubmitHandler = (point) => {
    this.#handlerPointChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point,
    );
    this.#formEditComponent.reset({point: this.#point, offers: this.#offers, destinations: this.#destinations}); // нужно или нет
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownButton);
  };

  #handleDeleteClick = (point) => {
    this.#handlerPointChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #escKeyDownButton = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#formEditComponent.reset({point: this.#point, offers: this.#offersType, destinations: this.#destination});
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownButton);
    }
  };

  #FavoriteButtonClickHandler = () => {
    this.#handlerPointChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };
}
