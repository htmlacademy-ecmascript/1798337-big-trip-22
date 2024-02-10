const ITINERARIES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];


const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const SORT_COLUMNS = ['day', 'event', 'time', 'price', 'offers'];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const NoEventsMessage = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
};

const UserAction = {
  UPDATE_POINT: 'update_point',
  ADD_POINT: 'add_point',
  DELETE_POINT: 'delete_point',
};

const UpdateType = {
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
  INIT: 'init',
};

const DEFAULT_TYPE = 'flight';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
  CREATE_NEW: 'CREATE_NEW',
};

const DEFAULT_POINT_MOCK = {
  'basePrice': 0,
  'dateFrom': '',
  'dateTo': '',
  'destination': '',
  'isFavorite': false,
  'offers': [],
  'type': DEFAULT_TYPE,
};

const DateFormat = {
  DATE_FORMAT : 'D MMM',
  FULL_DATE_FORMAT : 'DD/MM/YY HH:mm',
  TIME_FORMAT : 'HH:mm',
};

export { ITINERARIES, FilterType, NoEventsMessage, SortType, UserAction, UpdateType, Mode, SORT_COLUMNS, DEFAULT_POINT_MOCK, DateFormat };
