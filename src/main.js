import TripPresenter from './presenter/trip-presenter.js';
import PointModel from './model/point-model.js';
import OffersModel from './model/offers-model.js';
import DestinationModel from './model/destination-model.js';


import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import FilterModel from './model/filter-model.js';

dayjs.extend(duration);

const siteMainElement = document.querySelector('.trip-events');
const siteFiltersElement = document.querySelector('.trip-controls__filters');

const pointModel = new PointModel();
const offersModel = new OffersModel();
const destinationModel = new DestinationModel();
const filterModel = new FilterModel();


const tripPresenter = new TripPresenter (
  siteMainElement,
  siteFiltersElement,
  pointModel,
  offersModel,
  destinationModel,
  filterModel,
);

tripPresenter.init();
