export function getSeconds(current) {
  return current.getSeconds();
}

export function getMinutes(current) {
  return current.getMinutes();
}

export function getHours(current) {
  return current.getHours();
}

export function getWeekDay(current) {
  return current.getDay();
}

export function getMonth(current) {
  return current.getMonth();
}

export function getMonthDay(current) {
  return current.getDate();
}

export function getYear(current) {
  return current.getFullYear();
}

export function addWeekDay(value, weekDay = getWeekDay()) {
  return (weekDay + value) % 7;
}

export function getDaysInMonth(year = getYear(), month = getMonth()) {
  const currentDate = new Date(year, month, 1).getTime();
  const nextDate = new Date(year, month + 1, 1).getTime();
  return Math.round((nextDate - currentDate) / 1000 / 3600 / 24);
}

export function addSeconds(value = 0, seconds = getSeconds()) {
  return (seconds + value) % 60;
}

export function addMinutes(
  valueSeconds = 0, valueMinutes = 0,
  seconds = getSeconds(), minutes = 0,
) {
  if (valueSeconds + seconds >= 60) {
    return (minutes + valueMinutes + 1) % 60;
  }
  return (minutes + valueMinutes) % 60;
}

export function addHours(
  valueMinutes = 0, valueHours = 0,
  minutes = getMinutes(), hours = getHours(),
) {
  if (valueMinutes + minutes >= 60) {
    return (hours + valueHours + 1) % 24;
  }
  return (hours + valueHours) % 60;
}

export function addMonthDay(
  value, monthDay = getMonthDay(), daysInMonth = getDaysInMonth(),
) {
  if (monthDay + value > daysInMonth) {
    return (monthDay + value) % daysInMonth;
  }
  return monthDay + value;
}

export function addMonth(
  valueMonth = 0, valueDays = 0, monthDay = getMonthDay(),
  daysInMonth = getDaysInMonth(), month = getMonth(),
) {
  if (monthDay + valueDays > daysInMonth) {
    return (month + valueMonth + 1) % 12;
  }
  return (month + valueMonth) % 12;
}

export function getHoursFormat(hours = new Date().getHours()) {
  return hours < 10 ? `0${hours}` : `${hours}`;
}

export function getMinutesFormat(minutes = new Date().getMinutes()) {
  return minutes < 10 ? `0${minutes}` : `${minutes}`;
}

export function getSecondsFormat(seconds = new Date().getSeconds()) {
  return seconds < 10 ? `0${seconds}` : `${seconds}`;
}

export function getLastSundayMonthDate(
  year = getYear(), month = getMonth(), daysInMonth,
) {
  const currentDay = getWeekDay(new Date(year, month, 1));
  if (currentDay === 0) {
    return 1;
  }
  return daysInMonth - currentDay + 1;
}

export function getNameMonth(month) {
  const monthsNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];
  return monthsNames[month];
}

export function getNameDay(day) {
  const daysNames = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];
  return daysNames[day];
}
