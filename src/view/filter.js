import AbstractView from '../framework/view/abstract-view';

function createFilterItem(filter, currentFilterType) {
  const {type, count} = filter;

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}"
      ${type === currentFilterType ? 'checked' : ''}
      ${count === 0 ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`
  );
}

function createFilter(filterItems, currentFilterType) {
  const filterItemsTemplate = filterItems.map((filter) => createFilterItem(filter, currentFilterType)).join('');

  return (
    `<div class="trip-main__trip-controls  trip-controls">
    <div class="trip-controls__filters">
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>
  </div>`
  );
}

export default class Filter extends AbstractView {
  #filters = null;
  #currentFilterType;
  #handleFilterTypeChange;


  constructor ({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilter(this.#filters, this.#currentFilterType);
  }

  #filterTypeChangeHandler = (evt) => {
    // evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
