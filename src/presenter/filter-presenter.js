import { render, replace, remove } from '../framework/render.js';
import Filter from '../view/filter.js';
import { filter } from '../utils.js';
import { FilterType, UpdateType } from '../const.js';


export default class FilterPresenter {
  #filterContainer;
  #filterModel;
  #pointModel;
  #filterComponent = null;

  constructor({ filterContainer, filterModel, pointModel }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = [...this.#pointModel.points];

    return Object.values(FilterType).map((type) => ({
      type,
      count: filter[type](points).length
    }));
  }

  init() {
    const filters = this.filters;
    // console.log(filters);
    console.log(this.#filterModel.filter);
    console.log(this.#filterModel);
    const prevFilterComponent = this.#filterComponent;
    this.#filterComponent = new Filter({
      filters,
      currentFilterType: this.#filterModel.filter,
      // currentFilterType: FilterType.EVERYTHING,
      onFilterTypeChange: this.#handleFilterTypeChange,
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
