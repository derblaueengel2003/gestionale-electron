import jsPDF from 'jspdf';
import { imgLogo } from './img/ImageLogo';
import { ivdLogo } from './img/IvdLogo';
import { formattaPrezzo } from '../common/utils';
import { imgData } from './img/provisionsbestaetigungBG';

export const creaPrenotazione = (
  acquirente,
  acquirente2,
  venditore,
  venditore2,
  oggetto,
  provvPercentuale,
  prezzoDiVendita,
  firma
) => {
  const doc = new jsPDF();
  const acqDitta = `${acquirente.ditta && `${acquirente.ditta}`}`;
  const acqNome = `${acquirente.titolo} ${acquirente.nome} ${acquirente.cognome}`;
  const acqInd = `${acquirente.indirizzo}, ${acquirente.cap} ${acquirente.comune}, ${acquirente.nazione}`;
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
  const vendInd = `${venditore.indirizzo}, ${venditore.cap} ${venditore.comune}, ${venditore.nazione}`;
  const vendDitta2 =
    venditore2 && `${venditore2.ditta && `${venditore2.ditta}`}`;
  const vendNome2 =
    venditore2 &&
    `${venditore2.titolo} ${venditore2.nome} ${venditore2.cognome}`;

  doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);
  doc.addImage(imgLogo, 'JPEG', 28, 11, 35, 8);
  //Logo IVD
  doc.addImage(ivdLogo, 'JPEG', 165, 10, 30, 12, undefined, 'SLOW');

  //cancello frase che dice che gli abbiamo mandato exposé oggi. Metto una riga bianca sopra

  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(7);
  doc.line(20, 250, 200, 250);

  doc.setFontSize(10);
  // nuovo
  if (!acquirente2) {
    if (acqDitta.length > 0) {
      doc.text(acqDitta, 61, 30);
      doc.text(acqNome, 61, 35);
      doc.text(acqInd, 61, 40);
    } else {
      doc.text(acqNome, 61, 30);
      doc.text(acqInd, 61, 35);
    }
  } else {
    if (acqDitta.length > 0) {
      doc.text(acqDitta, 61, 30);
      doc.text(`1. ${acqNome}, ${acqInd}`, 61, 35);
      doc.text(`2. ${acqNome2}, ${acqInd2}`, 61, 40);
    } else {
      doc.text(`1. ${acqNome}, ${acqInd}`, 61, 30);
      doc.text(`2. ${acqNome2}, ${acqInd2}`, 61, 35);
    }
  }

  doc.text(`${firma.name} ${firma.name2 && ` - ${firma.name2}`}`, 61, 52);
  doc.text(`${firma.adresse}, ${firma.plz} ${firma.stadt}`, 61, 57);
  doc.text(provvPercentuale, 93, 86);

  //Oggetto
  doc.setFontSize(10);
  doc.text(oggetto.rifId, 25, 136);

  doc.text(
    `${
      oggetto.tipologia
        ? oggetto.tipologia === 'property_apt'
          ? 'Eigentumswohnung'
          : 'Gewerbe'
        : 'Eigentumswohnung'
    }`,
    41,
    136
  );
  doc.text(
    `${
      oggetto.stato
        ? oggetto.stato === 'vacant' || oggetto.stato === 'leerstehend'
          ? 'leerstehend'
          : 'vermietet'
        : ''
    }`,
    41,
    141
  );
  doc.text(`Etage: ${oggetto.piano}`, 41, 146);
  doc.text(`m2: ${oggetto.m2}`, 41, 151);
  doc.text(`Kaufpreis: ${formattaPrezzo(prezzoDiVendita, true)}`, 41, 156);

  doc.text(`${oggetto.via} ${oggetto.numeroCivico}`, 95, 136);
  doc.text(`WE ${oggetto.numeroAppartamento}`, 95, 141);
  doc.text(`${oggetto.cap} ${oggetto.citta}`, 95, 146);

  if (vendDitta.length > 25 || vendInd.length > 25 || vendNome.length > 25) {
    doc.setFontSize(10);
  } else if (
    vendDitta.length > 50 ||
    vendInd.length > 50 ||
    vendNome.length > 50
  )
    doc.setFontSize(8);
  else {
    doc.setFontSize(12);
  }
  if (vendDitta.length > 0) {
    const venditoreAddress = `${vendDitta} \n${vendNome} \n${
      venditore.indirizzo
    } ${venditore.indirizzo2 && venditore.indirizzo2}\n${venditore.cap} ${
      venditore.comune
    }\n${venditore.nazione}`;
    const lines = doc.splitTextToSize(venditoreAddress, 50);
    doc.text(148, 136, lines);
  } else {
    const venditoreAddress = `${vendNome} \n${venditore.indirizzo} ${
      venditore.indirizzo2 && venditore.indirizzo2
    }\n${venditore.cap} ${venditore.comune}\n${venditore.nazione}`;
    const lines = doc.splitTextToSize(venditoreAddress, 50);
    doc.text(148, 136, lines);
  }

  if (venditore2) {
    doc.text(vendDitta2, 148, 161);
    doc.text(vendNome2, 148, 166);
    doc.text(venditore2.indirizzo, 148, 171);
    venditore2.indirizzo2 && doc.text(venditore2.indirizzo2, 148, 176);
    doc.text(`${venditore2.cap} ${venditore2.comune}`, 148, 181);
    doc.text(`${venditore2.nazione}`, 148, 186);
  }

  doc.save(`${acquirente.cognome} Provisionsbestätigung.pdf`);
};
