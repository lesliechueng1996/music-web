import dayjs from 'dayjs';

export default function toDateString(time: Date) {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
}
