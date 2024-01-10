const ITINERARY = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const WAYPOINTS = ['Voronezh', 'Tambov', 'Sahalin', 'Karelia', 'Murmansk', 'Arhiz', 'Sochi', 'Rostov', 'Kazan',];

const FilterType = {
  EVERYTHING: 'everything',
  PAST: 'past',
  PRESENT: 'present',
  FUTURE: 'future',
};

const NoEventsMessege = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
};

export { ITINERARY, WAYPOINTS, FilterType, NoEventsMessege };
