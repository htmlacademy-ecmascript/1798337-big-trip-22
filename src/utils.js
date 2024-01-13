import dayjs from 'dayjs';
import { FilterType } from './const';

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

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.PAST]: (points) => points.filter((point) => isPointExpired(point.dateTo)),
  [FilterType.PRESENT]: (points) => points.filter((point) =>isPointPresent(point.dateFrom, point.dateTo)),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateFrom)),
};

function isPointExpired(dateTo) {
  return dateTo && dayjs().isAfter(dateTo, 'D');
}

function isPointFuture(dateFrom) {
  return dateFrom && dayjs().isBefore(dateFrom, 'D');
}

function isPointPresent(dataFrom, dataTo) {
  return dataFrom && dataTo && (dayjs().isAfter(dataFrom, 'D') || dayjs().isSame(dataFrom, 'D')) && (dayjs().isBefore(dataTo, 'D') || dayjs().isSame(dataTo, 'D'));
}

export { getRandomArrayElement, humanizeTaskDueDate, DATE_FORMAT, TIME_FORMAT, FULL_DATE_FORMAT, getRandomInt, isEscapeKey, updateItem, filter };
