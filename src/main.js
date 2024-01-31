import TripPresenter from './presenter/trip-presenter.js';
import PointModel from './model/point-model.js';
import OffersModel from './model/offers-model.js';
import DestinationModel from './model/destination-model.js';


import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import FilterModel from './model/filter-model.js';

import NewEventButton from './view/new-event-button.js';
import { render, RenderPosition } from './framework/render.js';

import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic mityamityamitya';
const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';

dayjs.extend(duration);

const siteMainElement = document.querySelector('.trip-events');
const siteFiltersElement = document.querySelector('.trip-controls__filters');

const pointModel = new PointModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});


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
  handleNewEventFormClose,
);

const newEventButtonComponent = new NewEventButton({
  onClick: handleNewEventButtonClick
});

pointModel.init()
  .finally(() => {
    render(newEventButtonComponent, siteFiltersElement, RenderPosition.AFTEREND);
  });

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  tripPresenter.createNewPoint();
  newEventButtonComponent.element.disabled = true;
}


tripPresenter.init();
