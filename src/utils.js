import dayjs from 'dayjs';
import { FilterType, SortColumns} from './const';

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

function sortPointsByTime(pointA, pointB) {

  const getPointTimeBySort = (startTime, endTime) => dayjs.duration(dayjs(endTime).diff(dayjs(startTime)));

  if (getPointTimeBySort(pointA.dateFrom, pointA.dateTo) > getPointTimeBySort(pointB.dateFrom, pointB.dateTo)) {
    return 1;
  }

  if (getPointTimeBySort(pointA.dateFrom, pointA.dateTo) < getPointTimeBySort(pointB.dateFrom, pointB.dateTo)) {
    return -1;
  }
  return 0;
}

function sortPointByDate(pointA, pointB) {
  if (pointA.dateFrom > pointB.dateFrom) {
    return 1;
  }
  if (pointA.dateFrom < pointB.dateFrom) {
    return -1;
  }
  return 0;
}

function sortPointByPrice(pointA, pointB) {
  if (Number(pointA.basePrice) < Number(pointB.basePrice)) {
    return 1;
  }
  if (Number(pointA.basePrice) > Number(pointB.basePrice)) {
    return -1;
  }
  return 0;
}


function generateSorting(sortType) {
  return SortColumns.map((value) => ({
    value,
    isSelected: value === sortType,
    isDisabled: value === 'event' || value === 'offers',
  }));
}

export { getRandomArrayElement, humanizeTaskDueDate, DATE_FORMAT, TIME_FORMAT, FULL_DATE_FORMAT, getRandomInt, isEscapeKey, filter, sortPointsByTime, sortPointByDate, sortPointByPrice, generateSorting};
