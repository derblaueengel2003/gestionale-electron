import jsPDF from 'jspdf';
import { imgLogo } from './img/ImageLogo';
// import { ivdLogo } from './img/IvdLogo';
import { formattaData, formattaPrezzo } from '../common/utils';

export const fattura = (
  cliente,
  cliente2,
  numeroFattura,
  dataFattura,
  descrizioneProdotto,
  importoNetto,
  iva = 19,
  dataPrestazione,
  oggetto,
  prezzoDiVendita = '0',
  dataRogito,
  amount = '0',
  dataPrenotazione = null,
  dealType = '',
  acquirente,
  acquirente2,
  firma,
  utente,
  ceo = []
) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const acqNome =
    cliente && `${cliente.titolo} ${cliente.nome} ${cliente.cognome}`;
  const acqInd =
    cliente &&
    `${cliente.indirizzo} ${cliente.indirizzo2 && cliente.indirizzo2}`;
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
  const provvPercentuale = importoNetto
    ? formattaPrezzo(importoNetto / prezzoDiVendita, false, true, true)
    : formattaPrezzo(amount / prezzoDiVendita, false, true, true);
  let corpoFattura;
  if (dealType === 'Kauf Eigentumswohnung' || dealType === 'Kauf Gewerbe') {
    corpoFattura = `entsprechend dem rechtskräftigen Kaufvertrag vom ${formattaData(
      dataRogito
    )} sowie unserer Vereinbarung berechnen wir Ihnen für unsere Nachweis- bzw. Vermittlungstätigkeit zum Verkauf des Objekts ${
      oggetto.via
    } ${oggetto.numeroCivico}, ${
      dealType === 'Kauf Eigentumswohnung' ? 'WE' : 'TE'
    } ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}:`;
  } else if (dealType === 'APH') {
    corpoFattura = `Objekt: ${oggetto.via} ${oggetto.numeroCivico}, ${
      oggetto.cap
    } ${oggetto.citta}
Wohneinheit: ${oggetto.numeroAppartamento}
Makler: Angelo Arboscello
Kunde: ${acquirente.nome} ${acquirente.cognome}
Notartermin: ${formattaData(dataRogito)}`;
  } else {
    corpoFattura = `hier ist die Rechnung für Ihre gewählten Leistungen.`;
  }

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
  doc.text(`Rechnung Nr. ${numeroFattura}`, 15, 96);
  doc.setFontType('normal');
  doc.text(`Berlin, ${formattaData(dataFattura)}`, 100, 96);

  // Linea per piegare
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.1);
  doc.line(5, 90, 10, 90);

  //Corpo
  dealType !== 'APH' &&
    doc.text(
      `${formulaSaluto}${cliente.titolo && ` ${cliente.cognome}`},`,
      15,
      110
    );
  cliente2 &&
    doc.text(
      `${formulaSaluto2}${cliente2.titolo && ` ${cliente2.cognome}`},`,
      15,
      115
    );
  const lines = doc.setFontSize(12).splitTextToSize(corpoFattura, 150);
  dealType !== 'APH'
    ? doc.text(15, 125 + 12 / 110, lines)
    : doc.text(corpoFattura, 15, 110);

  if (dealType !== '') {
    //Cifre
    doc.text(
      `${provvPercentuale} Provision aus Kaufpreis ${formattaPrezzo(
        prezzoDiVendita,
        true
      )}`,
      15,
      150
    );
    importoNetto
      ? doc.text(formattaPrezzo(importoNetto, true), 120, 150)
      : doc.text(formattaPrezzo(amount, true), 120, 150);

    doc.text(`${iva}% MWSt.`, 15, 155);
    importoNetto
      ? doc.text(formattaPrezzo((importoNetto / 100) * iva, true), 120, 155)
      : doc.text(formattaPrezzo((amount / 100) * iva, true), 120, 155);
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.2);
    doc.line(15, 157, 146, 157);
    doc.text(`Rechnungsbetrag inkl. ${iva}% MWSt.`, 15, 162);
    doc.setFontType('bold');
    importoNetto
      ? doc.text(
          formattaPrezzo(importoNetto * parseFloat(`1.${iva}`), true),
          120,
          162
        )
      : doc.text(
          formattaPrezzo(amount * parseFloat(`1.${iva}`), true),
          120,
          162
        );

    //Zeitraum
    doc.setFontType('normal');
    doc.text(
      `Leistungszeitraum: vom ${formattaData(
        dataPrenotazione
      )} bis ${formattaData(dataRogito)}`,
      15,
      175
    );
  } else {
    //Cifre
    doc.text(`${descrizioneProdotto}`, 15, 150);
    doc.text(formattaPrezzo(importoNetto, true), 120, 150);
    doc.text(`${iva}% MWSt.`, 15, 155);
    doc.text(formattaPrezzo((importoNetto / 100) * iva, true), 120, 155);
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.2);
    doc.line(15, 157, 146, 157);
    doc.text(`Rechnungsbetrag inkl. ${iva}% MWSt.`, 15, 162);
    doc.setFontType('bold');
    doc.text(
      formattaPrezzo(importoNetto * parseFloat(`1.${iva}`), true),
      120,
      162
    );

    //Zeitraum
    doc.setFontType('normal');
    doc.text(`Leistungszeitraum: ${formattaData(dataPrestazione)}`, 15, 175);
  }

  //Coordinate pagamento
  doc.text(
    'Bitte zahlen Sie den Rechnungsbetrag innerhalb von 7 Tagen ohne Abzug per',
    15,
    185
  );
  doc.text('Überweisung auf unser Konto:', 15, 190);
  doc.text(`Kontoinhaber: ${firma.kontoInhaber}`, 15, 200);
  doc.text(`Bankinstitut: ${firma.bank}`, 15, 205);
  doc.text(`IBAN: ${firma.iban}`, 15, 210);
  doc.text(`BIC: ${firma.bic}`, 15, 215);
  doc.text(`Verwendungszweck: Rechnung Nr. ${numeroFattura}`, 15, 220);

  //Saluti finali
  doc.text(
    'Sollten Sie noch Fragen haben, so stehen wir auch weiterhin gerne zur Verfügung.',
    15,
    230
  );
  doc.text('Mit freundlichen Grüßen', 15, 240);
  doc.text(`${utente.name}`, 15, 245);

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
  doc.text(`Ust.-IdNr.: ${firma.ustIdNr}`, 111, 274);

  //Logo IVD
  // doc.addImage(ivdLogo, 'JPEG', 161, 270, 30, 12);

  doc.save(
    `Rechnung ${numeroFattura.replace('/', '-')} ${cliente.cognome}.pdf`
  );
};
