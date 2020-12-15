import jsPDF from 'jspdf';
import { imgLogo } from './img/ImageLogo';
import { ivdLogo } from './img/IvdLogo';
import { formattaData, formattaPrezzo } from '../common/utils';

export const mahnung2 = (
  cliente,
  cliente2,
  numeroFattura,
  dataFattura,
  dataZahlungserinnerung,
  dataMahnung,
  dataMahnung2,
  amount,
  mahngebuehren,
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
  const corpoFattura = `trotz unserer Erinnerungen vom ${formattaData(
    dataZahlungserinnerung
  )} und vom ${formattaData(
    dataMahnung
  )} konnten wir bis zum heutigen Tag keinen Zahlungseingang feststellen.\n\nZur Zahlung offen sind folgende Beträge:`;

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

  //Intestazione fattura
  doc.setFontSize(12);
  doc.setFontType('normal');
  doc.text(cliente.ditta, 15, 38);
  doc.text(acqNome, 15, 43);
  doc.text(acqInd, 15, 48);
  doc.text(`${cliente.cap} ${cliente.comune}`, 15, 53);
  doc.text(`${cliente.nazione}`, 15, 58);
  cliente2 && doc.text(acqNome2, 15, 65);
  cliente2 && doc.text(acqInd2, 15, 70);
  cliente2 && doc.text(`${cliente2.cap} ${cliente2.comune}`, 15, 75);
  cliente2 && doc.text(`${cliente2.nazione}`, 15, 80);

  //Dati fattura
  doc.setFontType('bold');
  doc.text(
    `Letzte Mahnung\nRechnung Nr. ${numeroFattura}\nRechnungsdatum: ${formattaData(
      dataFattura
    )} \nRechnungsbetrag: ${formattaPrezzo(
      importo * parseFloat(`1.${iva}`),
      true
    )}`,
    15,
    96
  );
  doc.setFontType('normal');
  doc.text(`Berlin, ${formattaData(dataMahnung2)}`, 100, 96);

  // Linea per piegare
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.1);
  doc.line(5, 90, 10, 90);

  //Corpo

  doc.text(
    `${formulaSaluto}${cliente.titolo && ` ${cliente.cognome}`},`,
    15,
    120
  );
  cliente2 &&
    doc.text(
      `${formulaSaluto2}${cliente2.titolo && ` ${cliente2.cognome}`},`,
      15,
      125
    );
  const lines = doc.setFontSize(12).splitTextToSize(corpoFattura, 150);
  doc.text(15, 130 + 12 / 110, lines);

  //Cifre
  doc.text('Rechnungsbetrag', 15, 155);
  doc.text(formattaPrezzo(importo * parseFloat(`1.${iva}`), true), 120, 155);

  doc.text('Mahngebühren', 15, 160);
  doc.text(formattaPrezzo(mahngebuehren, true), 120, 160);
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.2);
  doc.line(15, 162, 146, 162);
  doc.setFontType('bold');
  doc.text('Zu zahlender Gesamtbetrag', 15, 167);
  doc.text(
    formattaPrezzo(importo * parseFloat(`1.${iva}`) + mahngebuehren, true),
    120,
    167
  );
  doc.setFontType('normal');

  //Coordinate pagamento
  doc.text(
    'Bitte zahlen Sie den offenen Gesamtbetrag innerhalb von 7 Tagen per',
    15,
    180
  );
  doc.text('Überweisung auf unser Konto:', 15, 185);
  doc.text(`Kontoinhaber: ${firma.kontoInhaber}`, 15, 195);
  doc.text(`Bankinstitut: ${firma.bank}`, 15, 200);
  doc.text(`IBAN: ${firma.iban}`, 15, 205);
  doc.text(`BIC: ${firma.bic}`, 15, 210);
  doc.text(`Verwendungszweck: Rechnung Nr. ${numeroFattura}`, 15, 215);

  //Saluti finali
  doc.text(
    'Sollten Sie auch diese letzte Frist ohne Zahlungseingang verstreichen lassen, sehen wir \nuns gezwungen, gerichtliche Schritte gegen Sie einzuleiten.\nSofern Sie die Zahlung zwischenzeitlich veranlasst haben, bitten wir Sie, dieses Schreiben \nals gegenstandlos zu betrachten.',
    15,
    225
  );
  doc.text('Mit freundlichen Grüßen', 15, 250);
  doc.text(`${utente.name}`, 15, 255);

  //Footer
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.2);
  doc.line(15, 267, 15, 282);
  doc.line(55, 267, 55, 282);
  doc.line(110, 267, 110, 282);
  // doc.line(160, 267, 160, 282);
  doc.setFontSize(10);
  doc.setTextColor(143, 143, 143);
  doc.text('Geschäftsführer:', 16, 270);
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
  doc.text(`Ust.-IdNr.: ${firma.ustIdNr}`, 111, 274);

  //Logo IVD
  doc.addImage(ivdLogo, 'JPEG', 161, 270, 30, 12);

  doc.save(
    `Rechnung ${numeroFattura.replace('/', '-')} ${cliente.cognome}.pdf`
  );
};
