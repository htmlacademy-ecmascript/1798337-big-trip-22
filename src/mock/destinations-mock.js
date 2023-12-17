import { getRandomArrayElement, getRandomInt } from '../utils';

const DESTINATIONS = ['Voronezh', 'Tambov', 'Sahalin', 'Karelia', 'Murmansk', 'Arhiz', 'Sochi', 'Rostov', 'Kazan',];
const destinationsMock =
[
  {
    id: '1',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: getRandomArrayElement(DESTINATIONS),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInt(100)}`,
        description: 'parliament building',
      }]
  },

  {
    id: '2',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: getRandomArrayElement(DESTINATIONS),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInt(100)}`,
        description: 'parliament building',
      }]
  },

  {
    id: '3',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: getRandomArrayElement(DESTINATIONS),
    pictures: []
  },

  {
    id: '4',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: getRandomArrayElement(DESTINATIONS),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInt(100)}`,
        description: 'parliament building',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInt(70)}`,
        description: 'parliament building',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInt(98)}`,
        description: 'parliament building',
      }]
  },
  {
    id: '5',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: getRandomArrayElement(DESTINATIONS),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInt(100)}`,
        description: 'parliament building',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInt(110)}`,
        description: 'parliament building',
      }]
  },
];


export { destinationsMock };
