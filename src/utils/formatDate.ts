import { format, utcToZonedTime } from 'date-fns-tz';

const formatStringToDateAndMinute = (value: Date): string => {
  const spTimeZone = 'America/Sao_Paulo';
  const spDate = utcToZonedTime(value, spTimeZone);
  return format(spDate, 'dd-MM-yyyy', {
    timeZone: 'America/Sao_Paulo',
  });
};
export default formatStringToDateAndMinute;
