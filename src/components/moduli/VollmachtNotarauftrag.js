import jsPDF from 'jspdf';
import { imgLogo } from './img/ImageLogo';
import { formattaPrezzo } from '../common/utils';
import { imgData } from './img/vollmachtNotarauftragBG';

export const vollmachtNotarauftrag = (
  acquirente,
  acquirente2,
  venditore,
  venditore2,
  oggetto,
  notaio,
  prezzoDiVendita,
  firma
) => {
  const doc = new jsPDF();
  const acqDitta = `${acquirente.ditta && `${acquirente.ditta}`}`;
  const acqNome = `${acquirente.titolo} ${acquirente.nome} ${acquirente.cognome}`;
  const acqInd = `${acquirente.indirizzo} ${
    acquirente.indirizzo2 && acquirente.indirizzo2
  }, ${acquirente.cap} ${acquirente.comune}, ${acquirente.nazione}`;
  const acqNome2 =
    acquirente2 &&
    `${acquirente2.titolo} ${acquirente2.nome} ${acquirente2.cognome}`;
  const acqInd2 =
    acquirente2 &&
    `${acquirente2.indirizzo} ${
      acquirente2.indirizzo2 && acquirente2.indirizzo2
    }, ${acquirente2.cap} ${acquirente2.comune}, ${acquirente2.nazione}`;
  const vendDitta = `${venditore.ditta && `${venditore.ditta}`}`;
  const vendNome = `${venditore.titolo} ${venditore.nome} ${venditore.cognome}`;
  const vendInd = `${venditore.indirizzo} ${
    venditore.indirizzo2 && venditore.indirizzo2
  }, ${venditore.cap} ${venditore.comune}, ${venditore.nazione}`;
  const vendInd2 =
    venditore2 &&
    `${venditore2.indirizzo} ${
      venditore2.indirizzo2 && venditore2.indirizzo2
    }, ${venditore2.cap} ${venditore2.comune}, ${venditore2.nazione}`;
  const vendNome2 =
    venditore2 &&
    `${venditore2.titolo} ${venditore2.nome} ${venditore2.cognome}`;
  const notaioDitta = notaio && `${notaio.ditta && `${notaio.ditta}`}`;
  const notaioNome =
    notaio && `${notaio.titolo} ${notaio.nome} ${notaio.cognome}`;
  const notaioInd =
    notaio &&
    `${notaio.indirizzo} ${notaio.indirizzo2 && notaio.indirizzo2}, ${
      notaio.cap
    } ${notaio.comune}, ${notaio.nazione}`;

  doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);
  doc.addImage(imgLogo, 'JPEG', 165, 10, 35, 8);
  doc.setFontSize(12);

  if (!venditore2) {
    if (vendDitta.length > 0) {
      doc.text(vendDitta, 30, 36);
      doc.text(vendNome, 30, 41);
      doc.text(vendInd, 30, 46);
    } else {
      doc.text(vendNome, 30, 36);
      doc.text(vendInd, 30, 41);
    }
  } else {
    if (vendDitta.length > 0) {
      doc.text(vendDitta, 30, 36);
      doc.text(`1. ${vendNome}, ${vendInd}`, 30, 41);
      doc.text(`2. ${vendNome2}, ${vendInd2}`, 30, 46);
    } else {
      doc.text(`1. ${vendNome}, ${vendInd}`, 30, 36);
      doc.text(`2. ${vendNome2}, ${vendInd2}`, 30, 41);
    }
  }

  if (!acquirente2) {
    if (acqDitta.length > 0) {
      doc.text(acqDitta, 30, 63);
      doc.text(acqNome, 30, 68);
      doc.text(acqInd, 30, 73);
    } else {
      doc.text(acqNome, 30, 63);
      doc.text(acqInd, 30, 68);
    }
  } else {
    if (acqDitta.length > 0) {
      doc.text(acqDitta, 30, 63);
      doc.text(`1. ${acqNome}, ${acqInd}`, 30, 68);
      doc.text(`2. ${acqNome2}, ${acqInd2}`, 30, 73);
    } else {
      doc.text(`1. ${acqNome}, ${acqInd}`, 30, 63);
      doc.text(`2. ${acqNome2}, ${acqInd2}`, 30, 68);
    }
  }

  doc.text(
    `Rif. ID: ${oggetto.rifId} - ${
      oggetto.tipologia
        ? oggetto.tipologia === 'Eigentumswohnung' ||
          oggetto.tipologia === 'property_apt'
          ? 'Eigentumswohnung'
          : 'Gewerbe'
        : ''
    }`,
    30,
    111
  );
  doc.text(`Kaufpreis: ${formattaPrezzo(prezzoDiVendita, true)}`, 30, 116);
  doc.text(
    `${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`,
    30,
    135
  );
  oggetto.grundbuch &&
    doc.text(
      `Grundbuch von ${oggetto.grundbuch} - Blatt: ${oggetto.grundbuchBlatt}`,
      30,
      157
    );

  doc.text(`${firma.name} ${firma.name2 && ` - ${firma.name2}`}`, 30, 185);
  doc.text(`${firma.adresse}, ${firma.plz} ${firma.stadt}`, 30, 190);

  if (notaio) {
    doc.text(notaioDitta, 30, 217);
    doc.text(notaioNome, 30, 222);
    doc.text(notaioInd, 30, 227);
  }

  doc.save(`${acquirente.cognome} Vollmacht Notarauftrag.pdf`);
};
