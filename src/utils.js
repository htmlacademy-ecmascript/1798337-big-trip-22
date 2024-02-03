import dayjs from 'dayjs';
import { FilterType, SortColumns} from './const';

// YEAR: 'DD/MM/YY HH:mm',
// FULL_DATE: 'YYYY-MM-DD',

const DATE_FORMAT = 'D MMM';
const FULL_DATE_FORMAT = 'DD/MM/YY HH:mm';
const TIME_FORMAT = 'HH:mm';
// const HOURS_COUNT = 24;
// const MINUTES_COUNT = 60;

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

// function formatNames(items) {
//   items = structuredClone(items);
//   if (items.length > 3) {
//     items.splice(1, items.length - 2, '...');
//   }
//   return items.join(' — ');
// }

const getDuration = (dateFrom, dateTo) => {
  // const duration = dayjs.duration(dayjs(dateFrom).diff(dayjs(dateTo)));
  // const totalDays = duration.asDays();
  // const days = Math.floor(totalDays);
  // let hours = Math.floor((totalDays - days) * HOURS_COUNT);
  // let minutes = Math.floor(duration.asMinutes() - days * HOURS_COUNT * MINUTES_COUNT - hours * MINUTES_COUNT);
  // if (minutes === 60) {
  //   hours++;
  //   minutes = 0;
  // }

  const formatDurationToTwoSymbol = (durationElement) => {
    const isTwoCharacters = String(durationElement).length < 2;
    if (isTwoCharacters) {
      return `0${durationElement}`;
    } else {
      return durationElement;
    }
  };

  const calculateDurationOfStay = () => dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));
  const durationOfStay = calculateDurationOfStay(dateTo, dateFrom);
  const daysDutation = Math.trunc(durationOfStay.asDays());

  // console.log(durationOfStay.days());

  // const durationOfStayFormat = `${durationOfStay.days() > 0 ?
  //   `${formatDuratioToTwoCharacters(daysDutation)}D` : ''}
  //   ${durationOfStay.hours() > 0 ?
  //   `${formatDuratioToTwoCharacters(durationOfStay.hours())}H` : ''}
  //    ${formatDuratioToTwoCharacters(durationOfStay.minutes())}M`;

  const durationOfStayFormat =
   `${durationOfStay.days() > 0 ? `${formatDurationToTwoSymbol(daysDutation)}D ${formatDurationToTwoSymbol(durationOfStay.hours())}H ${formatDurationToTwoSymbol(durationOfStay.minutes())}M`
     : `${durationOfStay.hours() > 0 ? `${formatDurationToTwoSymbol(durationOfStay.hours())}H` : ''}
     ${formatDurationToTwoSymbol(durationOfStay.minutes())}M`}`;

  return durationOfStayFormat;

  // return `${days.toString().padStart(2, '0')}D ${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
};


export { getRandomArrayElement, humanizeTaskDueDate, DATE_FORMAT, TIME_FORMAT, FULL_DATE_FORMAT, getRandomInt, isEscapeKey, filter, sortPointsByTime, sortPointByDate, sortPointByPrice, generateSorting, getDuration};
