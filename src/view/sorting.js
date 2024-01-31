import AbstractView from '../framework/view/abstract-view';
import { SortType } from '../const';

function createSorting (sorting) {
  const sortable = Object.values(SortType);
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sorting.map((item) => `<div div class="trip-sort__item  trip-sort__item--${item.value}" >
      <input id="sort-${item.value}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${item.value}" ${sortable.includes(item.value) ? `data-sort-type="${item.value}"` : ''} ${item.isSelected ? 'checked' : ''} ${item.isDisabled ? 'disabled' : ''}>
        <label class="trip-sort__btn" for="sort-${item.value}">${item.value}</label>
      </div>`).join('')}
    </form>`);
}

export default class Sorting extends AbstractView {
  #sortingElements = null;
  #handleSortTypeChange = null;

  constructor({ onSortTypeChange, sortingElements }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#sortingElements = sortingElements;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSorting(this.#sortingElements);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
