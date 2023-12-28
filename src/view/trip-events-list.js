import AbstractView from '../framework/view/abstract-view';


function createTripEventsList() {
  return(`<ul class="trip-events__list">
    </ul>`);
}

export default class TripEventsList extends AbstractView {
  get template() {
    return createTripEventsList();
  }
}
