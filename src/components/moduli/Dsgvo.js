import jsPDF from 'jspdf';
import { imgLogo } from './img/ImageLogo';
import { imgData, imgData2 } from './img/dsgvo';
import {
  nomeCompleto,
  indirizzoCompleto,
  indirizzoOggetto,
  contattiFirma,
} from '../common/utils';

export const DSGVO = (cliente, cliente2, dataDsgvo, oggetto, firma, seller) => {
  const doc = new jsPDF();

  const nomeCompletoCliente = nomeCompleto(cliente);
  const indirizzoCompletoCliente = indirizzoCompleto(cliente);
  const nomeCompletoCliente2 = nomeCompleto(cliente2);
  const indirizzoCompletoCliente2 = indirizzoCompleto(cliente2);

  doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);
  doc.addImage(imgLogo, 'JPEG', 20, 10, 35, 8);
  let pos = 35;
  if (
    nomeCompletoCliente.length > 100 ||
    indirizzoCompletoCliente.length > 100 ||
    nomeCompleto(cliente2 || cliente).length > 100
  ) {
    doc.setFontSize(8);
  } else if (
    nomeCompletoCliente.length > 70 ||
    indirizzoCompletoCliente.length > 70 ||
    nomeCompleto(cliente2 || cliente).length > 70
  )
    doc.setFontSize(10);
  else {
    doc.setFontSize(12);
  }
  doc.text(contattiFirma(firma), 61, pos);

  // nuovo
  pos += 25;
  if (!cliente2) {
    doc.text(nomeCompletoCliente, 61, pos);
    doc.text(indirizzoCompletoCliente, 61, pos + 5);
  } else {
    doc.text(`1. ${nomeCompletoCliente}, ${indirizzoCompletoCliente}`, 61, pos);
    doc.text(
      `2. ${nomeCompletoCliente2}, ${indirizzoCompletoCliente2}`,
      61,
      pos + 5
    );
  }
  pos += 19;
  //fine nuovo
  doc.text(`Maklervertrag`, 61, pos);
  pos += 9;
  doc.text(`${dataDsgvo}`, 61, pos);
  pos += 6;
  doc.text(indirizzoOggetto(oggetto), 61, pos);
  doc.setFontSize(10);

  //firma
  pos += 34;
  let xpos = 50;
  doc.text(`${firma.name} ${firma.name2 && ` - ${firma.name2}`}`, xpos, pos);
  pos += 6;
  doc.text('Annalisa Fornari', xpos, pos);
  pos += 6;
  doc.text(`${firma.adresse}`, xpos, pos);
  pos += 6;
  doc.text(`${firma.plz} ${firma.stadt}`, xpos, pos);
  pos += 6;
  doc.text(`${firma.telefon}`, xpos, pos);
  pos += 6;
  doc.text(`${firma.email}`, xpos, pos);

  //dsgvo beauftragter
  pos += 15;
  doc.text('Fornari, Annalisa', xpos, pos);
  pos += 6;
  doc.text(`${firma.adresse}`, xpos, pos);
  pos += 6;
  doc.text(`${firma.plz} ${firma.stadt}`, xpos, pos);
  pos += 6;
  doc.text(`${firma.telefon}`, xpos, pos);
  pos += 6;
  doc.text(`${firma.email}`, xpos, pos);

  /// X
  pos += 17;
  xpos = 21;
  doc.text('X', xpos, pos);
  pos += 25;
  doc.text('X', xpos, pos);

  doc.addPage();
  doc.addImage(imgData2, 'JPEG', 0, 0, 210, 297);
  pos = 37;
  doc.text('X', xpos, pos);
  pos += 18;
  // solo per acquirente spunto l'invio dati al venditore
  if (!seller) {
    doc.text('X', xpos, pos);
  }

  pos += 41;
  doc.text('X', xpos, pos);

  doc.save(`DSGVO.pdf`);
};
