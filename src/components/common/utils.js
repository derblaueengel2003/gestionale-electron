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

export const indirizzoCompleto = (contatto) =>
  contatto &&
  `${contatto.indirizzo}, ${contatto.cap} ${contatto.comune}${
    contatto.nazione && `, ${contatto.nazione}`
  }`;
export const nomeCompleto = (contatto) =>
  contatto && `${contatto.titolo} ${contatto.nome} ${contatto.cognome}`;

export const indirizzoOggetto = (oggetto) =>
  `${oggetto.via} ${oggetto.numeroCivico}${
    oggetto.numeroAppartamento &&
    `, ${
      oggetto.tipologia
        ? oggetto.tipologia === 'Eigentumswohnung' ||
          oggetto.tipologia === 'property_apt'
          ? 'WE'
          : 'TE'
        : 'WE'
    } ${oggetto.numeroAppartamento}`
  }, ${oggetto.cap} ${oggetto.citta}`;

export const ditta = (contatto) =>
  contatto && `${contatto.ditta && `${contatto.ditta}`}`;

export const contattiFirma = (firma) =>
  `${firma.name} ${firma.name2 && ` - ${firma.name2}`}\n${firma.adresse}, ${
    firma.plz
  } ${firma.stadt}`;

export const ripulisciTesto = (text, textToCut) => {
  const textToCutIndex = text.indexOf(textToCut);

  if (textToCutIndex === -1) return text;

  return text.substring(0, textToCutIndex);
};
