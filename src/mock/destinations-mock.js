import { getRandomArrayElement, getRandomInt } from '../utils';

const DESTINATIONS = ['Voronezh', 'Tambov', 'Sahalin', 'Karelia', 'Murmansk', 'Arhiz', 'Sochi', 'Rostov', 'Kazan',];
const destinationsMock =
[
  {
    id: '1',
    description: 'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    name: getRandomArrayElement(DESTINATIONS),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInt(100)}`,
        description: 'parliament building',
      }]
  },

  {
    id: '2',
    description: 'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
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
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
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
