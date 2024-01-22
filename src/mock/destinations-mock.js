import { getRandomInt } from '../utils';

const destinationsMock =
[
  {
    id: '1',
    description: 'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    name: 'Voronezh',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInt(100)}`,
        description: 'parliament building',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInt(70)}`,
        description: 'parliament building',
      }]
  },

  {
    id: '2',
    description: 'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
    name: 'Tambov',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInt(100)}`,
        description: 'parliament building',
      }]
  },

  {
    id: '3',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Sahalin',
    pictures: []
  },

  {
    id: '4',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Karelia',
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
        src: `https://loremflickr.com/248/152?random=${getRandomInt(70)}`,
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
    name: 'Murmansk',
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
        src: `https://loremflickr.com/248/152?random=${getRandomInt(70)}`,
        description: 'parliament building',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInt(70)}`,
        description: 'parliament building',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInt(110)}`,
        description: 'parliament building',
      }]
  },
  {
    id: '6',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Arhiz',
    pictures: []
  },
  {
    id: '7',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Rostov',
    pictures: []
  },
  {
    id: '8',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Kazan',
    pictures: []
  },
  {
    id: '9',
    description: 'Sochi is the largest resort city in Russia. The city is situated on the Sochi River, along the Black Sea in Southern Russia, with a population of 466,078 residents',
    name: 'Sochi',
    pictures: []
  },
];

export { destinationsMock };