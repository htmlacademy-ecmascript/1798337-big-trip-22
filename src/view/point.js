import { DATE_FORMAT, humanizeTaskDueDate, TIME_FORMAT } from '../utils';
import AbstractView from '../framework/view/abstract-view';
import { getDuration} from '../utils';
function createEventData(dateFrom) {
  const convertedDataStartDay = humanizeTaskDueDate(dateFrom, DATE_FORMAT);
  return `<time class="event__date" datetime="">${convertedDataStartDay}</time>`;
}

function createTypeIcon(type) {
  return `<div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
  </div>`;
}

function createTitle(type, name) {
  return `<h3 class="event__title"> ${type} ${name}</h3>`;
}

function createPrice(basePrice) {
  return `<p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
  </p>`;
}

function createSchedule(dateFrom, dateTo) {
  const convertedDateFrom = humanizeTaskDueDate(dateFrom, TIME_FORMAT);
  const convertedDateTo = humanizeTaskDueDate(dateTo, TIME_FORMAT);

  return `<div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${dateFrom}">${convertedDateFrom}</time>
      &mdash;
      <time class="event__end-time" datetime="${dateTo}">${convertedDateTo}</time>
    </p>
    <p class="event__duration">${getDuration(dateFrom, dateTo)}</p>
  </div>`;
}

{/* <p class="event__duration">${convertedDurationData}</p> */}
function createOffers({offers, point}) {
  const pointOffersType = offers.find((offer) => offer.type === point.type).offers;

  const pointOffersChoose = pointOffersType.length ? (pointOffersType.filter((offer) => point.offers.includes(offer.id))) : '';
  if (pointOffersChoose.length !== 0) {
    return (`<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${pointOffersChoose.map((offer) => (
        `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`
      )).join('')}
    </ul>`);
  }
  return '';
}

function createFavoriteButton(point) {
  const {isFavorite} = point;
  const favoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  return `<button class="event__favorite-btn ${favoriteClassName}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>`;
}

function createPoint (point, destinations, offers) {

  const { basePrice, dateFrom, dateTo, type } = point;
  const pointDestination = destinations.find((destination) => destination.id === point.destination);
  const {name} = pointDestination;

  return `<div class="event">
    ${createEventData(dateFrom)}
    ${createTypeIcon(type)}
    ${createTitle(type, name)}
    ${createSchedule(dateFrom, dateTo)}
    ${createPrice(basePrice)}
    ${createOffers({offers, point})}
    ${createFavoriteButton(point)}
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>`;
}

export default class Point extends AbstractView {

  #point = null;
  #destinations = null;
  #offers = null;
  #handleEditButtonClick = null;
  #handleFavoriteButtonClick = null;

  constructor({
    point: point,
    destinations: destinations,
    offers: offers,
    onEditButtonClick: onEditButtonClick,
    onFavoriteButtonClick: onFavoriteButtonClick,
  }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleEditButtonClick = onEditButtonClick;
    this.#handleFavoriteButtonClick = onFavoriteButtonClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editButtonHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#isFavoriteButtonHandler);
  }

  get template() {
    return createPoint(this.#point, this.#destinations, this.#offers);
  }

  #editButtonHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditButtonClick();
  };

  #isFavoriteButtonHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteButtonClick();
  };
}
