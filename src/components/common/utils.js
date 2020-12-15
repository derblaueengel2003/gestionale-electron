import numeral from 'numeral';
import moment from 'moment';
import axios from 'axios';

moment.locale('de');

// load a locale
numeral.register('locale', 'de', {
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't',
  },
  ordinal: function (number) {
    return number === 1 ? 'er' : '°';
  },
  currency: {
    symbol: '€',
  },
});
// switch between locales
numeral.locale('de');

export const trasformaInNumero = (valore, nonMoltiplicarePerCento) => {
  const perCento = nonMoltiplicarePerCento ? 1 : 100;
  return valore ? parseFloat(valore.replace(/,/, '.'), 10) * perCento : 0;
};

export const formattaPrezzo = (
  valore,
  isEuro,
  nonDividerePerCento,
  isPercent
) => {
  let risultato = '';
  valore = nonDividerePerCento ? valore : valore / 100;
  if (isEuro) {
    risultato = numeral(valore).format('0,0[.]00 $');
  } else if (isPercent) {
    risultato = numeral(valore).format('0.00%');
  } else {
    risultato = numeral(valore).format('0,0[.]00');
  }
  return risultato;
};

export const visualizzaDecimaleConVirgola = (valore) =>
  (valore / 100).toString().replace(/\./, ',');

export const riordinaImmagini = (array, from, to) =>
  array.splice(to, 0, array.splice(from, 1)[0]);

export const generaToken = () => {
  axios
    .post(`${process.env.REACT_APP_WPAPI}/wp-json/jwt-auth/v1/token`, {
      username: `${process.env.WPAPI_USERNAME}`,
      password: `${process.env.WPAPI_PASSWORD}`,
    })
    .then((res) => localStorage.setItem('token', res.data.token));
};

export const formattaData = (data) => moment(data).format('DD.MM.YYYY');
