const waypointsMock = [
  {
    id: '1',
    basePrice: 1100,
    dateFrom: '2023-07-10T22:55:56.845Z',
    dateTo: '2023-07-11T11:22:13.375Z',
    destination: [1,2],
    isFavorite: false,
    offers: [1,2],
    type: 'taxi'
  },
  {
    id: '2',
    basePrice: 1100,
    dateFrom: '2023-07-10T22:55:56.845Z',
    dateTo: '2023-07-11T11:22:13.375Z',
    destination: [1,2],
    isFavorite: false,
    offers: [1,3],
    type: 'bus'
  },
  {
    id: '3',
    basePrice: 1100,
    dateFrom: '2023-07-10T22:55:56.845Z',
    dateTo: '2023-07-11T11:22:13.375Z',
    destination: [1,2],
    isFavorite: false,
    offers: [2,4],
    type: 'train'
  },
  {
    id: '4',
    basePrice: 1100,
    dateFrom: '2023-07-09T22:55:56.845Z',
    dateTo: '2023-07-12T11:22:13.375Z',
    destination: [1,2],
    isFavorite: false,
    offers: [1],
    type: 'ship'
  },
  {
    id: '5',
    basePrice: 1100,
    dateFrom: '2023-07-10T22:55:56.845Z',
    dateTo: '2023-07-11T11:22:13.375Z',
    destination: [1,2],
    isFavorite: false,
    offers: [],
    type: 'drive'
  },
];

// function getRandomWaypoint() {
//   return getRandomArrayElement(waypointsMock);
// }


export {waypointsMock};
