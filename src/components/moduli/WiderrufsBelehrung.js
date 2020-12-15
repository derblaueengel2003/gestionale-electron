import jsPDF from 'jspdf';
import { imgLogo } from './img/ImageLogo';
import { imgData, imgData2 } from './img/widerrufsBelehrungBG';

export const widerrufsBelehrung = (
  acquirente,
  acquirente2,
  dataPrenotazione,
  oggetto,
  firma
) => {
  const doc = new jsPDF();
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
  doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);
  doc.addImage(imgLogo, 'JPEG', 20, 10, 35, 8);

  if (acqNome.length > 70 || acqInd.length > 70 || acqNome.length > 70) {
    doc.setFontSize(10);
  } else if (
    acqNome.length > 100 ||
    acqInd.length > 100 ||
    acqNome.length > 100
  )
    doc.setFontSize(8);
  else {
    doc.setFontSize(12);
  }
  doc.text(`${firma.name} ${firma.name2 && ` - ${firma.name2}`}`, 61, 38);
  doc.text(`${firma.adresse}, ${firma.plz} ${firma.stadt}`, 61, 43);
  // doc.text(acqNome, 61, 63)
  // doc.text(acqInd, 61, 68)
  // nuovo
  doc.setFontSize(10);
  if (!acquirente2) {
    doc.text(acqNome, 61, 63);
    doc.text(acqInd, 61, 68);
  } else {
    doc.text(`1. ${acqNome}, ${acqInd}`, 61, 63);
    doc.text(`2. ${acqNome2}, ${acqInd2}`, 61, 68);
  }

  //fine nuovo
  doc.text(`Maklervertrag`, 61, 86);
  doc.text(`${dataPrenotazione}`, 61, 95);
  doc.text(
    `${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`,
    61,
    101
  );
  doc.setFontSize(10);
  doc.text(`${firma.name} ${firma.name2 && ` - ${firma.name2}`}`, 64, 148);
  doc.text(`${firma.adresse}, ${firma.plz} ${firma.stadt}`, 64, 154);
  doc.text(`per E-Mail: ${firma.email}`, 64, 160);
  doc.text(`per Fax: ${firma.fax}`, 64, 166);
  doc.text(`Bei Fragen errichen Sie uns unter: ${firma.telefon}`, 64, 172);

  doc.addPage();
  doc.addImage(imgData2, 'JPEG', 0, 0, 210, 297);

  doc.save(`${acquirente.cognome} Widerrufsbelehrung.pdf`);
};
