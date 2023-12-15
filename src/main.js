import TripPresenter from './presenter/trip-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
// import PointModel from './model/point-model.js';

const siteMainElement = document.querySelector('.trip-events');
const siteFiltersElement = document.querySelector('.trip-controls__filters');

// const pointModel = new PointModel();
// pointModel.init();

const tripPresenter = new TripPresenter (
  siteMainElement
  // pointModel: pointModel,
);


const headerPresenter = new HeaderPresenter (siteFiltersElement);
headerPresenter.init();

tripPresenter.init();
