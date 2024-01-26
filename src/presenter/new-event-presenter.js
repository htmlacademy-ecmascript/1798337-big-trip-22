import { v4 as uuidv4 } from 'uuid';
import { remove, render, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType, DefaultType } from '../const.js';
import FormEdit from '../view/form-edit.js';

export default class NewEventPresenter {

  #pointListContainer;
  #handleDataChange;
  #handleDestroy;
  #point;
  #destinations;
  #offers;

  #formComponent = null;

  constructor({ eventsListComponent, onDataChange, onDestroy, destinations, offers }) {
    this.#pointListContainer = eventsListComponent;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  init() {
    if (this.#formComponent !== null) {
      return;
    }

    // ({point, destinations, offers, onFormEditSubmit, onDeleteClick})

    const DefaultPointMock =
      {
        id: '',
        basePrice: 0,
        dateFrom: '2024-01-20T06:57:04.116Z',
        dateTo: '2024-01-25T17:50:04.116Z',
        destination: '',
        isFavorite: false,
        offers: [],
        type: DefaultType,
      };

    this.#formComponent = new FormEdit({
      point: DefaultPointMock,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });


    render(this.#formComponent, this.#pointListContainer.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#formComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#formComponent);
    this.#formComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_YPOINT,
      UpdateType.MINOR,
      { ...point, id: uuidv4() },
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
