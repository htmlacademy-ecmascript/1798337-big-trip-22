const ITINERARY = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const WAYPOINTS = ['Voronezh', 'Tambov', 'Sahalin', 'Karelia', 'Murmansk', 'Arhiz', 'Sochi', 'Rostov', 'Kazan',];

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const SortColumns = ['day', 'event', 'time', 'price', 'offers'];

const FilterType = {
  EVERYTHING: 'everything',
  PAST: 'past',
  PRESENT: 'present',
  FUTURE: 'future',
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

const DefaultType = 'flight';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
  CREATE_NEW: 'CREATE_NEW',
};

export { ITINERARY, WAYPOINTS, FilterType, NoEventsMessage, SortType, UserAction, UpdateType, DefaultType, Mode, SortColumns };
