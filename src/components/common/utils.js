import numeral from 'numeral';

export const trasformaInNumero = (valore) =>
  parseFloat(valore.replace(/,/, '.'), 10) * 100;

export const formattaPrezzo = (valore, isEuro) => {
  if (isEuro) {
    return numeral(valore / 100).format('0,0[.]00 $');
  } else {
    return numeral(valore / 100).format('0,0[.]00');
  }
};
