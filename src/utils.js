import dayjs from 'dayjs';
import { FilterType, SORT_COLUMNS} from './const.js';

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

  if (getPointTimeBySort(pointA.dateFrom, pointA.dateTo) < getPointTimeBySort(pointB.dateFrom, pointB.dateTo)) {
    return 1;
  }

  if (getPointTimeBySort(pointA.dateFrom, pointA.dateTo) > getPointTimeBySort(pointB.dateFrom, pointB.dateTo)) {
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
  return SORT_COLUMNS.map((value) => ({
    value,
    isSelected: value === sortType,
    isDisabled: value === 'event' || value === 'offers',
  }));
}

const getDuration = (dateFrom, dateTo) => {

  const formatDurationToTwoSymbol = (durationElement) => {
    const isTwoCharacters = String(durationElement).length < 2;

    if (isTwoCharacters) {
      return `0${durationElement}`;
    }

    return durationElement;
  };

  const calculateDurationOfStay = () => dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));
  const durationOfStay = calculateDurationOfStay(dateTo, dateFrom);
  const daysDutation = Math.trunc(durationOfStay.asDays());

  const durationOfStayFormat =
   `${durationOfStay.days() > 0 ? `${formatDurationToTwoSymbol(daysDutation)}D ${formatDurationToTwoSymbol(durationOfStay.hours())}H ${formatDurationToTwoSymbol(durationOfStay.minutes())}M`
     : `${durationOfStay.hours() > 0 ? `${formatDurationToTwoSymbol(durationOfStay.hours())}H` : ''}
     ${formatDurationToTwoSymbol(durationOfStay.minutes())}M`}`;

  return durationOfStayFormat;
};


export { humanizeTaskDueDate, isEscapeKey, filter, sortPointsByTime, sortPointByDate, sortPointByPrice, generateSorting, getDuration};
