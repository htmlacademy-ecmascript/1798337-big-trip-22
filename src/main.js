import TripPresenter from './presenter/trip-presenter.js';
import PointModel from './model/point-model.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const siteMainElement = document.querySelector('.trip-events');
const siteFiltersElement = document.querySelector('.trip-controls__filters');

const pointModel = new PointModel();

const tripPresenter = new TripPresenter (
  siteMainElement,
  siteFiltersElement,
  pointModel
);

tripPresenter.init();
