import dayjs from 'dayjs';

const DATE_FORMAT = 'D MMM';
const FULL_DATE_FORMAT = 'DD/MM/YY H:mm';
const TIME_FORMAT = 'HH:m';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function humanizeTaskDueDate(dueDate, format) {
  return dueDate ? dayjs(dueDate).format(format) : '';
}

function isEscapeKey (evt) {
  return evt.key === 'Escape';
}

export { getRandomArrayElement, humanizeTaskDueDate, DATE_FORMAT, TIME_FORMAT, FULL_DATE_FORMAT, getRandomInt, isEscapeKey };
