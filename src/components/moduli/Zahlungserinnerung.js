import jsPDF from 'jspdf';
import { imgLogo } from './img/ImageLogo';
// import { ivdLogo } from './img/IvdLogo';
import { formattaPrezzo, formattaData } from '../common/utils';

export const zahlungserinnerung = (
  cliente,
  cliente2,
  numeroFattura,
  dataFattura,
  dataZahlungserinnerung,
  amount,
  firma,
  utente,
  ceo,
  importoNetto,
  iva
) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  let importo = importoNetto || amount;
  const acqNome = `${cliente.titolo} ${cliente.nome} ${cliente.cognome}`;
  const acqInd = `${cliente.indirizzo} ${
    cliente.indirizzo2 && cliente.indirizzo2
  }`;
  const acqNome2 =
    cliente2 && `${cliente2.titolo} ${cliente2.nome} ${cliente2.cognome}`;
  const acqInd2 =
    cliente2 &&
    `${cliente2.indirizzo} ${cliente2.indirizzo2 && cliente2.indirizzo2}`;
  let formulaSaluto = 'Sehr geehrte Damen und Herren';
  if (cliente.titolo === 'Herr') {
    formulaSaluto = 'Sehr geehrter Herr';
  } else if (cliente.titolo === 'Frau') {
    formulaSaluto = 'Sehr geehrte Frau';
  }
  let formulaSaluto2 = 'Sehr geehrte Damen und Herren';
  if (cliente2) {
    if (cliente2.titolo === 'Herr') {
      formulaSaluto2 = 'Sehr geehrter Herr';
    } else if (cliente2.titolo === 'Frau') {
      formulaSaluto2 = 'Sehr geehrte Frau';
    }
  }
  const corpoFattura = `für die oben aufgeführte Rechnung konnten wir bis heute leider keine Zahlungseingang feststellen. 
Sicherlich handelt es sich um ein Versehen. Eine Kopie der Rechnung vom ${formattaData(
    dataFattura
  )} haben wir dem Schreiben beigelegt. \n
Um Mahnungsgebühren zu vermeiden, überweisen Sie bitte den fälligen Beitrag von ${formattaPrezzo(
    importo,
    true
  )}  innerhalb von 7 Tagen ohne Abzüge auf das untenstehende Bankkonto. \n
Sofern Sie die Zahlung zwischenzeitlich veranlasst haben, bitten wir Sie, dieses Schreiben als gegenstandlos zu betrachten.`;

  doc.addImage(imgLogo, 'JPEG', 130, 10, 55, 12);

  //linea rossa
  doc.setDrawColor(145, 0, 0);
  doc.setLineWidth(7);
  doc.line(146, 26, 199, 26);
  //linea grigia
  doc.setDrawColor(143, 143, 143);
  doc.setLineWidth(7);
  doc.line(15, 26, 146, 26);

  //Header
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.setFont('times');
  doc.setFontType('bold');
  doc.text(
    `${firma.name} ${firma.name2 && ` - ${firma.name2}`} - ${firma.adresse}, ${
      firma.plz
    } ${firma.stadt}`,
    19,
    27
  );

  //riquadro contatti
  doc.setDrawColor(215, 240, 245);
  doc.setLineWidth(70);
  doc.line(146, 70, 199, 70);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFontType('normal');
  doc.text('Ihr Ansprechpartner', 149, 40);
  doc.setFontType('bold');
  doc.text(`${utente.name}`, 149, 44);
  doc.setFontType('normal');
  doc.text(`${utente.email}`, 149, 48);
  doc.text(`Tel. ${utente.telefon}`, 149, 52);
  doc.text(`${firma.website}`, 149, 56);
  doc.setFontType('bold');
  doc.text('Öffnungszeiten', 149, 68);
  doc.setFontType('normal');
  doc.text(`${firma.open}`, 149, 72);
  doc.setFontType('bold');
  doc.text(`${firma.name2 ? firma.name2 : firma.name}`, 149, 84);
  doc.setFontType('normal');
  doc.text(`${firma.motto}`, 149, 88);
  doc.text(`${firma.adresse}`, 149, 92);
  doc.text(`${firma.plz} ${firma.stadt}`, 149, 96);
  doc.text(`${firma.staat}`, 149, 100);

  let acapo = 38;
  //Intestazione fattura
  doc.setFontSize(12);
  doc.setFontType('normal');
  doc.text(cliente.ditta, 15, acapo);
  acapo += 5;
  doc.text(acqNome, 15, acapo);
  acapo += 5;
  doc.text(acqInd, 15, acapo);
  acapo += 5;
  doc.text(`${cliente.cap} ${cliente.comune}`, 15, acapo);
  acapo += 5;
  doc.text(`${cliente.nazione}`, 15, acapo);
  acapo += 7;
  cliente2 && doc.text(acqNome2, 15, acapo);
  acapo += 5;
  cliente2 && doc.text(acqInd2, 15, acapo);
  acapo += 5;
  cliente2 && doc.text(`${cliente2.cap} ${cliente2.comune}`, 15, acapo);
  acapo += 5;
  cliente2 && doc.text(`${cliente2.nazione}`, 15, acapo);

  acapo += 10;
  // Linea per piegare
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.1);
  doc.line(5, acapo, 10, acapo);
  acapo += 6;
  //Dati fattura
  doc.setFontType('bold');
  doc.text(
    `Zahlungserinnerung
Rechnung Nr. ${numeroFattura}`,
    15,
    acapo
  );
  doc.setFontType('normal');
  doc.text(`Berlin, ${formattaData(dataZahlungserinnerung)}`, 100, acapo);
  acapo += 14;
  //Corpo
  doc.text(
    `${formulaSaluto}${cliente.titolo && ` ${cliente.cognome}`},`,
    15,
    acapo
  );
  acapo += 5;
  cliente2 &&
    doc.text(
      `${formulaSaluto2}${cliente2.titolo && ` ${cliente2.cognome}`},`,
      15,
      acapo
    );
  acapo += 10;
  const lines = doc.setFontSize(12).splitTextToSize(corpoFattura, 150);
  doc.text(15, acapo + 12 / 110, lines);
  //Coordinate pagamento
  acapo += 55;
  doc.text('Kontoverbindung:', 15, acapo);
  acapo += 5;
  doc.text(`Kontoinhaber: ${firma.kontoInhaber}`, 15, acapo);
  acapo += 5;
  doc.text(`Bankinstitut: ${firma.bank}`, 15, acapo);
  acapo += 5;
  doc.text(`IBAN: ${firma.iban}`, 15, acapo);
  acapo += 5;
  doc.text(`BIC: ${firma.bic}`, 15, acapo);
  acapo += 5;
  doc.text(`Verwendungszweck: Rechnung Nr. ${numeroFattura}`, 15, acapo);
  acapo += 15;

  //Saluti finali
  doc.text(
    'Sollten Sie noch Fragen haben, so stehen wir auch weiterhin gerne zur Verfügung.',
    15,
    acapo
  );
  acapo += 10;
  doc.text('Mit freundlichen Grüßen', 15, acapo);
  acapo += 5;
  doc.text(`${utente.name}`, 15, acapo);

  //Footer
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.2);
  doc.line(15, 267, 15, 282);
  doc.line(55, 267, 55, 282);
  doc.line(110, 267, 110, 282);
  // doc.line(160, 267, 160, 282);
  doc.setFontSize(10);
  doc.setTextColor(143, 143, 143);
  doc.text('Inhaberin:', 16, 270);
  let position = 274;

  ceo.forEach((eachCeo) => {
    doc.text(`${eachCeo.name}`, 16, position);
    position += 4;
  });
  doc.text(`Telefon: ${firma.telefon}`, 56, 270);
  doc.text(`Telefax: ${firma.fax}`, 56, 274);
  doc.text(`E-Mail: ${firma.email}`, 56, 278);
  doc.text(`Web: ${firma.website}`, 56, 282);
  doc.text(`Steuernummer: ${firma.steuerNr}`, 111, 270);
  doc.text(`${firma.ustIdNr && `Ust.-IdNr.: ${firma.ustIdNr}`}`, 111, 274);

  //Logo IVD
  // doc.addImage(ivdLogo, 'JPEG', 161, 270, 30, 12);

  doc.save(
    `Zahlungserinnerung - Rechnung ${numeroFattura.replace('/', '-')} ${
      cliente.cognome
    }.pdf`
  );
};
