import {render, replace} from '../framework/render.js';
import FormEdit from '../view/form-edit.js';
import Sorting from '../view/sorting.js';
import Point from '../view/point.js';
import TripEventsList from '../view/trip-events-list.js';
import { isEscapeKey } from '../utils.js';


export default class TripPresenter {

  #mainContainer = null;
  #pointModel = null;
  #tripEventsListComponent = null;

  constructor(mainContainer, pointModel) {
    this.#mainContainer = mainContainer;
    this.#pointModel = pointModel;
    this.#tripEventsListComponent = new TripEventsList();
  }

  init() {
    const waypoints = this.#pointModel.waypoints;
    const destinations = this.#pointModel.destinations;
    const offers = this.#pointModel.offers;

    render(new Sorting(), this.#mainContainer);
    render(this.#tripEventsListComponent, this.#mainContainer);

    for (const point of waypoints) {
      this.#renderPoint(point, destinations, offers);
    }
  }

  #renderPoint(point, destinations, offers) {
    const escKeyDownButton = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownButton);
      }
    };

    const pointElement = new Point({
      point,
      destinations,
      offers,
      onEditButtonClick:() => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownButton);
      }
    });

    const formEdit = new FormEdit({
      point,
      destinations,
      offers,
      onFormEditSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownButton);
      },
    });

    function replacePointToForm() {
      replace(formEdit, pointElement);
    }

    function replaceFormToPoint() {
      replace(pointElement, formEdit);
    }

    render(pointElement, this.#tripEventsListComponent.element);
  }
}
