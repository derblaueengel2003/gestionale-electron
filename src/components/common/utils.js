import numeral from 'numeral';

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
