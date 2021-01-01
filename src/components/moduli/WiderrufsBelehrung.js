import jsPDF from 'jspdf';
import { imgLogo } from './img/ImageLogo';
import { imgData, imgData2 } from './img/widerrufsBelehrungBG';
import {
  nomeCompleto,
  indirizzoCompleto,
  indirizzoOggetto,
  contattiFirma,
} from '../common/utils';

export const widerrufsBelehrung = (
  acquirente,
  acquirente2,
  dataPrenotazione,
  oggetto,
  firma
) => {
  const doc = new jsPDF();

  const nomeCompletoAcquirente = nomeCompleto(acquirente);
  const indirizzoCompletoAcquirente = indirizzoCompleto(acquirente);
  const nomeCompletoAcquirente2 = nomeCompleto(acquirente2);
  const indirizzoCompletoAcquirente2 = indirizzoCompleto(acquirente2);

  doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);
  doc.addImage(imgLogo, 'JPEG', 20, 10, 35, 8);

  if (
    nomeCompletoAcquirente.length > 100 ||
    indirizzoCompletoAcquirente.length > 100 ||
    nomeCompleto(acquirente2 || acquirente).length > 100
  ) {
    doc.setFontSize(8);
  } else if (
    nomeCompletoAcquirente.length > 70 ||
    indirizzoCompletoAcquirente.length > 70 ||
    nomeCompleto(acquirente2 || acquirente).length > 70
  )
    doc.setFontSize(10);
  else {
    doc.setFontSize(12);
  }
  doc.text(contattiFirma(firma), 61, 38);

  // nuovo
  if (!acquirente2) {
    doc.text(nomeCompletoAcquirente, 61, 63);
    doc.text(indirizzoCompletoAcquirente, 61, 68);
  } else {
    doc.text(
      `1. ${nomeCompletoAcquirente}, ${indirizzoCompletoAcquirente}`,
      61,
      63
    );
    doc.text(
      `2. ${nomeCompletoAcquirente2}, ${indirizzoCompletoAcquirente2}`,
      61,
      68
    );
  }

  //fine nuovo
  doc.text(`Maklervertrag`, 61, 86);
  doc.text(`${dataPrenotazione}`, 61, 95);
  doc.text(indirizzoOggetto(oggetto), 61, 101);
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
