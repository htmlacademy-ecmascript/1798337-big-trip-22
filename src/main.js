import TripPresenter from './presenter/trip-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import { trip } from './mock/trip.js';
import TripModel from './model/trip-model.js';

const siteMainElement = document.querySelector('.trip-events');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const tripModel = new TripModel();

const tripPresenter = new TripPresenter ({
  mainContainer: siteMainElement,
  tripModel,
});

const headerPresenter = new HeaderPresenter (siteFiltersElement);

tripPresenter.init();
headerPresenter.init();

trip();
