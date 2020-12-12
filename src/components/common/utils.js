import numeral from 'numeral';
import moment from 'moment';
import axios from 'axios';

export const trasformaInNumero = (valore, nonMoltiplicarePerCento) => {
  const perCento = nonMoltiplicarePerCento ? 1 : 100;
  return valore ? parseFloat(valore.replace(/,/, '.'), 10) * perCento : 0;
};

export const formattaPrezzo = (valore, isEuro) => {
  if (isEuro) {
    return numeral(valore / 100).format('0,0[.]00 $');
  } else {
    return numeral(valore / 100).format('0,0[.]00');
  }
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

export const formattaData = (data) => moment(data).format('DD MMMM, YYYY');
