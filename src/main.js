import TripPresenter from './presenter/trip-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import { trip } from './mock/trip.js';

const siteMainElement = document.querySelector('.trip-events');
const siteFiltersElement = document.querySelector('.trip-controls__filters');

const tripPresenter = new TripPresenter (siteMainElement);
const headerPresenter = new HeaderPresenter (siteFiltersElement);

tripPresenter.init();
headerPresenter.init();

trip();
