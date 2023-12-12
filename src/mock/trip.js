import { getRandomArrayElement } from '../utils';
import { ITINERARY, DESTINATION, STATUS } from '../const';

const mockRoutePoints = [
  {
    itinerary: getRandomArrayElement(ITINERARY),
    destination: getRandomArrayElement(DESTINATION),
    // icon: 'https://loremflickr.com/248/152?random=случайное_число',
    favorite: true,
    data: '',
    time:'',
    price: '50',
    offers: {
      'Order Uber': 20,
      'Add luggag': 50,
    },
    duration: '', // день/месяц/год часы:минуты (например «25/12/19 16:00»).
    description: 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    status: getRandomArrayElement(STATUS),
  },
];

function getRandomTrip() {
  return getRandomArrayElement(mockRoutePoints);
}


function trip () {
  console.log(mockRoutePoints);
}

export {trip, getRandomTrip};
