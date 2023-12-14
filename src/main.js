import TripPresenter from './presenter/trip-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import WaypointModel from './model/waypoint-model.js';

const siteMainElement = document.querySelector('.trip-events');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const waypointModel = new WaypointModel();

const tripPresenter = new TripPresenter ({
  mainContainer: siteMainElement,
  waypointModel,
});

const headerPresenter = new HeaderPresenter (siteFiltersElement);

tripPresenter.init();
headerPresenter.init();
