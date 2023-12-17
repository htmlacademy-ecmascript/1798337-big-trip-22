import { createElement } from '../render.js';
import { ITINERARY} from '../const.js';
import { humanizeTaskDueDate, FULL_DATE_FORMAT } from '../utils';

function createFormEdit (point, destinations, offers) {

  const {id, type, basePrice, dateTo, dateFrom, offers : checkedOffers} = point;
  const pointDestination = destinations.find((d) => d.id === point.destination);
  const {name, description, pictures} = pointDestination;

  // const typeOffers = offers.length ? (offers.find((offer) => offer.type === type)).offers : '';
  // console.log(typeOffers);

  // const checkedOffers =

  // console.log(checkedOffers);

  // addedOffers = checkedOffers.map((offer) => typeOffers.find((typeOfferElement) => typeOfferElement.id === offer));

  // function addedOffers(checkedOffers) {
  //   const typeOffers = offers.length ? (offers.find((offer) => offer.type === type)).offers : '';
  //   checkedOffers.map((offer) => console.log(offer));

  // }

  // addedOffers(checkedOffers);

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
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${name}" list="destination-list-1">
          <datalist id="destination-list-${id}">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeTaskDueDate(dateFrom, FULL_DATE_FORMAT)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="1${humanizeTaskDueDate(dateTo, FULL_DATE_FORMAT)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${id}">
            <span class="visually-hidden">Price</span>
            &euro;${basePrice}
          </label>
          <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${id}" type="checkbox" name="event-offer-luggage" checked>
              <label class="event__offer-label" for="event-offer-luggage-${id}">
                <span class="event__offer-title">Add luggage</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">30</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
              <label class="event__offer-label" for="event-offer-comfort-1">
                <span class="event__offer-title">Switch to comfort class</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">100</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
              <label class="event__offer-label" for="event-offer-meal-1">
                <span class="event__offer-title">Add meal</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">15</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
              <label class="event__offer-label" for="event-offer-seats-1">
                <span class="event__offer-title">Choose seats</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">5</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
              <label class="event__offer-label" for="event-offer-train-1">
                <span class="event__offer-title">Travel by train</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">40</span>
              </label>
            </div>
          </div>
        </section>
        ${pointDestination ? (
      `<section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>
          ${pictures.length ? (
        `<div class="event__photos-container">
            <div class="event__photos-tape">
            ${pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}"></img>`)}
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
