import AbstractView from '../framework/view/abstract-view';

function createFilterItem(filter, isChecked) {
  const {type, count} = filter;

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}"
      ${isChecked ? 'checked' : ''}
      ${count === 0 ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`
  );
}

function createFilter(filterItems) {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItem(filter, index === 0))
    .join('');

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

  constructor (filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilter(this.#filters);
  }
}
