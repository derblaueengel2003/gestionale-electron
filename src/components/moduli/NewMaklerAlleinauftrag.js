import jsPDF from 'jspdf';
import { imgLogo } from './img/ImageLogo';
import { ivdLogo } from './img/IvdLogo';
import { imgData, imgData2 } from './img/maklerAlleinAuftragBG';
import { formattaData, formattaPrezzo } from '../common/utils';
import {
  nomeCompleto,
  indirizzoCompleto,
  indirizzoOggetto,
  contattiFirma,
  ditta,
} from '../common/utils';

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
  const vendDitta = ditta(venditore);
  const vendNome = nomeCompleto(venditore);
  const vendInd = indirizzoCompleto(venditore);
  const vendInd2 = indirizzoCompleto(venditore2);
  const vendNome2 = nomeCompleto(venditore2);
  doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);
  doc.addImage(imgLogo, 'JPEG', 20, 10, 35, 8);
  //nascondo il logo ivd con un quadrato bianco
  doc.addImage(ivdLogo, 'JPEG', 175, 5, 30, 12, undefined, 'SLOW');

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

  doc.text(contattiFirma(firma), 56, 46);

  doc.text(indirizzoOggetto(oggetto), 56, 72);

  prezzoDiVendita &&
    doc.text(formattaPrezzo(prezzoDiVendita, true, true), 56, 82);
  prezzoDiVendita2 &&
    doc.text(`- ${formattaPrezzo(prezzoDiVendita2, true, true)}`, 80, 82);

  doc.setFontSize(10);
  startDate && doc.text(formattaData(startDate), 83, 104);
  endDate && doc.text(formattaData(endDate), 129, 104);

  doc.text('X', 55, 181);
  maklerProvision && doc.text(maklerProvision, 65, 190);

  //linea per cassare il punto 7 (richiesto da annalisa)
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(1);
  doc.line(55, 250, 200, 250);
  doc.line(55, 265, 200, 250);
  doc.line(55, 265, 200, 265);
  

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
