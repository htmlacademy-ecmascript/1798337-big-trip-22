import TripPresenter from './presenter/trip-presentor.js';


// const mainElement = document.querySelector('.main');
// const headerElement = document.querySelector('.page-header__container');
const siteMainElement = document.querySelector('.trip-events');
const siteFiltersElement = document.querySelector('.trip-controls__filters');

const presenter = new TripPresenter (siteFiltersElement, siteMainElement);
presenter.init();
