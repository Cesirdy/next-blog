import { parseISO, format } from 'date-fns';

export default function Date({ dateString, formatString = 'LLLL dd, yyyy' }) {
  const date = parseISO(dateString);
  return <time className='font-mono' dateTime={dateString}>{format(date, formatString)}</time>;
}