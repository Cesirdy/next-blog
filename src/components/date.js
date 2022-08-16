import { parseISO, format } from 'date-fns';

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return <time className='font-mono' dateTime={dateString}>{format(date, 'LLLL dd, yyyy')}</time>;
}