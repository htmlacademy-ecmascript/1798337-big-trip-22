import { createElement } from '../render.js';
import { ITINERARY, WAYPOINTS} from '../const.js';
import { humanizeTaskDueDate, FULL_DATE_FORMAT } from '../utils';

function createFormEdit (point, destinations, offers) {

  const {id, type, basePrice, dateTo, dateFrom, offers : checkedOffers} = point;
  const pointDestination = destinations.find((d) => d.id === point.destination);
  const {name, description, pictures} = pointDestination;

  const typeOffers = offers.length ? (offers.find((offer) => offer.type === type)).offers : '';

  return (`<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

      ${ITINERARY.map((itineraryPoint) =>
      `<div class="event__type-item">
      <input id="event-type-${itineraryPoint}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${itineraryPoint}" ${itineraryPoint.toLowerCase() === type.toLowerCase() ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${itineraryPoint}" for="event-type-${itineraryPoint}-${id}">${itineraryPoint.charAt(0).toUpperCase() + itineraryPoint.slice(1)}</label>
      </div>`).join('')}

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${id}">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${name}" list="destination-list-${id}">
          <datalist id="destination-list-${id}">
          ${WAYPOINTS.length ? (WAYPOINTS.map((waypoint) =>`<option value="${waypoint}"></option>`)) : ''}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${id}">From</label>
          <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${humanizeTaskDueDate(dateFrom, FULL_DATE_FORMAT)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-${id}">To</label>
          <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="1${humanizeTaskDueDate(dateTo, FULL_DATE_FORMAT)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${id}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
      ${typeOffers.length ? (
      `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">

          ${typeOffers.map((offerEl) =>
        `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${offerEl.id}" type="checkbox" name="event-offer-${type}"
              ${checkedOffers.map((checkedOffer) => checkedOffer).includes(offerEl.id) ? 'checked' : ''}>
              <label class="event__offer-label" for="event-offer-${type}-${offerEl.id}">
                <span class="event__offer-title">${offerEl.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${offerEl.price}</span>
              </label>
            </div>`)}
          </div>
        </section>`) : ''}

        ${pointDestination ? (
      `<section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>
          ${pictures.length ? (
        `<div class="event__photos-container">
            <div class="event__photos-tape">
            ${pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}"/>`)}
           </div>
          </div>`) : ''}
        </section>`) : ''}
      </section>
    </form>
</li>`);
}

export default class FormEdit {
  constructor(point, destinations, offers) {
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
  }

  getTemplate() {
    return createFormEdit(this.point, this.destinations, this.offers);
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
