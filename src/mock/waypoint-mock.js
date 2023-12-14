import { getRandomArrayElement } from '../utils';
import { ITINERARY, WAYPOINTS, STATUS } from '../const';

const mockWaypoints = [
  {
    itinerary: getRandomArrayElement(ITINERARY),
    destination: getRandomArrayElement(WAYPOINTS),
    // icon: 'https://loremflickr.com/248/152?random=случайное_число',
    isFavorite: true,
    date: new Date('2014-01-01'),
    startTime: new Date('2014-01-01T02:48'),
    endTime: new Date('2014-01-02T14:48'),
    time:'',
    price: '150',
    offers: {
      'Order Uber': 20,
      'Add luggag': 50,
    },
    duration: '', // день/месяц/год часы:минуты (например «25/12/19 16:00»).
    description: 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    status: getRandomArrayElement(STATUS),
  },

  {
    itinerary: getRandomArrayElement(ITINERARY),
    destination: getRandomArrayElement(WAYPOINTS),
    // icon: 'https://loremflickr.com/248/152?random=случайное_число',
    isFavorite: false,
    date: new Date('2023-12-12'),
    startTime: new Date('2014-01-01T14:48'),
    endTime: new Date('2014-01-01T15:48'),
    time:'',
    price: '250',
    offers: {
      'Order Uber': 20,
      'Add luggag': 50,
    },
    duration: '', // день/месяц/год часы:минуты (например «25/12/19 16:00»).
    description: 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    status: getRandomArrayElement(STATUS),
  },
];

function getRandomWaypoint() {
  return getRandomArrayElement(mockWaypoints);
}


export {getRandomWaypoint};
