import dayjs from 'dayjs';

const DATE_FORMAT = 'D MMM';
const TIME_FORMAT = 'HH:m';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeTaskDueDate(dueDate, format) {
  return dueDate ? dayjs(dueDate).format(format) : '';
}

export {getRandomArrayElement, humanizeTaskDueDate, DATE_FORMAT, TIME_FORMAT};
