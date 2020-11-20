import jsPDF from 'jspdf';
import { imgLogo } from './ImageLogo';
import moment from 'moment';
import numeral from 'numeral';
import { imgData, imgData2 } from './img/maklerAlleinAuftragBG';

export const maklerAlleinauftrag = (
  venditore,
  venditore2,
  oggetto,
  startDate,
  endDate,
  prezzoDiVendita,
  prezzoDiVendita2,
  maklerProvision,
  sonstige,
  firma
) => {
  const doc = new jsPDF();
  const vendDitta = `${venditore.ditta && `${venditore.ditta}`}`;
  const vendNome = `${venditore.titolo} ${venditore.nome} ${venditore.cognome}`;
  const vendInd = `${venditore.indirizzo} ${
    venditore.indirizzo2 && venditore.indirizzo2
  }, ${venditore.cap} ${venditore.comune}, ${venditore.nazione}`;
  const vendInd2 =
    venditore2 &&
    `${venditore2.indirizzo} ${venditore.indirizzo2}, ${venditore2.cap} ${venditore2.comune}, ${venditore2.nazione}`;
  const vendNome2 =
    venditore2 &&
    `${venditore2.titolo} ${venditore2.nome} ${venditore2.cognome}`;

  doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);
  doc.addImage(imgLogo, 'JPEG', 20, 10, 35, 8);
  doc.setFontSize(12);

  if (!venditore2) {
    if (vendDitta.length > 0) {
      doc.text(vendDitta, 56, 22);
      doc.text(vendNome, 56, 27);
      doc.text(vendInd, 56, 32);
    } else {
      doc.text(vendNome, 56, 22);
      doc.text(vendInd, 56, 27);
    }
  } else {
    if (vendDitta.length > 0) {
      doc.text(vendDitta, 56, 22);
      doc.text(`1. ${vendNome}, ${vendInd}`, 56, 27);
      doc.text(`2. ${vendNome2}, ${vendInd2}`, 56, 32);
    } else {
      doc.text(`1. ${vendNome}, ${vendInd}`, 56, 22);
      doc.text(`2. ${vendNome2}, ${vendInd2}`, 56, 27);
    }
  }

  doc.text(`${firma.name} ${firma.name2 && ` - ${firma.name2}`}`, 56, 46);
  doc.text(`${firma.adresse}, ${firma.plz} ${firma.stadt}`, 56, 51);

  doc.text(
    `${oggetto.via} ${oggetto.numeroCivico}, ${
      oggetto.tipologia
        ? oggetto.tipologia === 'Eigentumswohnung'
          ? 'WE'
          : 'TE'
        : 'WE'
    } ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`,
    56,
    72
  );

  prezzoDiVendita &&
    doc.text(numeral(prezzoDiVendita).format('0,0[.]00 $'), 56, 82);
  prezzoDiVendita2 &&
    doc.text(`- ${numeral(prezzoDiVendita2).format('0,0[.]00 $')}`, 80, 82);

  doc.setFontSize(10);
  startDate && doc.text(moment(startDate).format('DD.MM.YYYY'), 83, 104);
  endDate && doc.text(moment(endDate).format('DD.MM.YYYY'), 129, 104);

  doc.text('X', 55, 181);
  maklerProvision && doc.text(maklerProvision, 65, 190);

  // seconda pagina
  doc.addPage();
  doc.addImage(imgData2, 'JPEG', 0, 0, 210, 297);
  doc.addImage(imgLogo, 'JPEG', 20, 10, 35, 8);
  doc.setFontSize(12);

  const lines = doc.splitTextToSize(sonstige, 170);
  doc.text(23, 60 + 12 / 110, lines);

  // sonstige && doc.text(sonstige, 25, 60);
  doc.text('X', 23, 232);
  doc.text('X', 68, 232);

  //Salvataggio finale
  doc.save(`${venditore.cognome} Makler Alleinauftrag.pdf`);
};
