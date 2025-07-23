import { format, isToday, isThisWeek, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';

export const formatDate = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  return format(dateObj, 'dd MMMM yyyy', { locale: tr });
};

export const formatTime = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  return format(dateObj, 'HH:mm', { locale: tr });
};

export const isDateToday = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (isNaN(dateObj.getTime())) {
    return false;
  }
  return isToday(dateObj);
};

export const isDateThisWeek = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (isNaN(dateObj.getTime())) {
    return false;
  }
  return isThisWeek(dateObj);
};