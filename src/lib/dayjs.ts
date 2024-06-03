import dayjs, { extend } from 'dayjs'; 
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

extend(relativeTime);
extend(updateLocale);  
dayjs.updateLocale('pt-br', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seg',
    m: 'a min',
    mm: '%d min',
    h: 'an Hora',
    hh: '%d Horas',
    d: 'a Dia',
    dd: '%d Dias',
    M: 'a Mês',
    MM: '%d Meses',
    y: 'a Ano',
    yy: '%d Anos',
  },
});

export { dayjs };
