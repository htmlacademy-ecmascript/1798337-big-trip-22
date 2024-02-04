import { remove, render, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType, DefaultPointMock} from '../const.js';
import FormEdit from '../view/form-edit.js';

export default class NewEventPresenter {

  #pointListContainer;
  #handleDataChange;
  #handleDestroy;
  #destinations;
  #offers;
  #formComponent = null;
  #offersModel = null;
  #destinationModel = null;

  constructor({ eventsListComponent, onDataChange, onDestroy, destinationModel, offersModel }) {
    this.#pointListContainer = eventsListComponent;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;
  }

  init() {
    this.#destinations = this.#destinationModel.destinations;
    this.#offers = this.#offersModel.offers;

    if (this.#formComponent !== null) {
      return;
    }

    this.#formComponent = new FormEdit({
      point: DefaultPointMock,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormEditSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      isNewEvent: true,
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

  setSaving() {
    this.#formComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#formComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#formComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
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
