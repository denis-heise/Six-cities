import dayjs from 'dayjs';

export function getDateMounthYear (date: string) {
  return dayjs(date).format('MMMM YYYY');
}

export function getDateReviews (date: string) {
  return dayjs(date).format('DDMMYYYY');
}
