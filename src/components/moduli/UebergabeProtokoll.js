import jsPDF from 'jspdf';
import { imgLogo } from './ImageLogo';
import { ivdLogo } from './IvdLogo';

export const doc = new jsPDF('p', 'mm', 'a4');

export const protocollo = (
  acquirente,
  acquirente2,
  venditore,
  venditore2,
  oggetto
) => {
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
    'm2Square - Arboscello & Fornari GbR – Kastanienallee 2, 10435 Berlin',
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
  doc.text('Angelo Arboscello', 149, 44);
  doc.setFontType('normal');
  doc.text('angelo.arboscello@m2square.eu', 149, 48);
  doc.text('Tel. +49 (30) 54482958', 149, 52);
  doc.text('www.m2square.eu', 149, 56);
  doc.setFontType('bold');
  doc.text('Öffnungszeiten', 149, 68);
  doc.setFontType('normal');
  doc.text('Mo.-Fr. 10:00 bis 17:00 Uhr', 149, 72);
  doc.setFontType('bold');
  doc.text('Arboscello & Fornari GbR', 149, 84);
  doc.setFontType('normal');
  doc.text('Immobilienmakler', 149, 88);
  doc.text('Kastanienallee 2', 149, 92);
  doc.text('10435 Berlin', 149, 96);
  doc.text('Deutschland', 149, 100);

  //Dati oggetto e parti
  const dati = 40;
  doc.setFontSize(16);
  doc.setFontType('bold');
  doc.text('Übergabeprotokoll', 15, dati);
  doc.setFontSize(10);
  doc.text(
    `Objekt: ${oggetto.via} ${oggetto.numeroCivico}, ${oggetto.cap} ${oggetto.citta}, WE ${oggetto.numeroAppartamento}`,
    15,
    dati + 10
  );
  doc.setFontType('normal');
  venditore.ditta
    ? doc.text(`Alter Eigentümer: ${venditore.ditta}`, 15, dati + 18)
    : doc.text(
        `Alter Eigentümer: ${venditore.nome} ${venditore.cognome}${
          venditore2 ? `, ${venditore2.nome} ${venditore2.cognome}` : ''
        }`,
        15,
        dati + 18
      );
  acquirente.ditta
    ? doc.text(`Neuer Eigentümer: ${acquirente.ditta}`, 15, dati + 24)
    : doc.text(
        `Neuer Eigentümer: ${acquirente.nome} ${acquirente.cognome}${
          acquirente2 ? `, ${acquirente2.nome} ${acquirente2.cognome}` : ''
        }`,
        15,
        dati + 24
      );

  //Schüssel
  doc.setFontType('bold');
  const chiavi = 75;
  doc.text(`Schlüsselübergabe`, 15, chiavi);

  doc.setFontType('normal');
  doc.text(
    `Hauseingangstür: ________________ - Wohnungstür: __________________`,
    15,
    chiavi + 8
  );
  doc.text(
    `Keller: ________________________ - Briefkasten: ____________________`,
    15,
    chiavi + 16
  );
  doc.text(
    `Sonstiges: ______________________________________________________`,
    15,
    chiavi + 24
  );

  //Heizkosten
  doc.setFontType('bold');
  const termosifoni = chiavi + 39;
  doc.text(`Heizkostenverteiler`, 15, termosifoni);

  doc.setFontType('normal');
  doc.text('Raum', 15, termosifoni + 7);
  doc.text('Zählernummer', 65, termosifoni + 7);
  doc.text('Zählerstand', 120, termosifoni + 7);
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.2);
  doc.line(15, termosifoni + 8, 170, termosifoni + 8);
  doc.line(15, termosifoni + 16, 170, termosifoni + 16);
  doc.line(15, termosifoni + 24, 170, termosifoni + 24);
  doc.line(15, termosifoni + 32, 170, termosifoni + 32);
  doc.line(15, termosifoni + 40, 170, termosifoni + 40);
  doc.line(15, termosifoni + 48, 170, termosifoni + 48);
  doc.line(15, termosifoni + 56, 170, termosifoni + 56);
  doc.line(15, termosifoni + 64, 170, termosifoni + 64);
  doc.line(15, termosifoni + 8, 15, termosifoni + 64);
  doc.line(55, termosifoni + 8, 55, termosifoni + 64);
  doc.line(110, termosifoni + 8, 110, termosifoni + 64);
  doc.line(170, termosifoni + 8, 170, termosifoni + 64);

  //Gas Elektro Wasser
  doc.setFontType('bold');
  const gas = termosifoni + 75;
  doc.text(`Gas`, 17, gas + 15);
  doc.text(`Elektro`, 17, gas + 23);
  doc.text(`Wasser Kalt`, 17, gas + 31);
  doc.text(`Wasser Warm`, 17, gas + 39);

  doc.setFontType('normal');
  doc.text('Zählernummer', 65, gas + 7);
  doc.text('Zählerstand', 120, gas + 7);
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.2);
  doc.line(15, gas + 8, 170, gas + 8);
  doc.line(15, gas + 16, 170, gas + 16);
  doc.line(15, gas + 24, 170, gas + 24);
  doc.line(15, gas + 32, 170, gas + 32);
  doc.line(15, gas + 40, 170, gas + 40);
  doc.line(15, gas + 8, 15, gas + 40);
  doc.line(55, gas + 8, 55, gas + 40);
  doc.line(110, gas + 8, 110, gas + 40);
  doc.line(170, gas + 8, 170, gas + 40);

  //Data
  doc.setFontType('normal');
  doc.text(`Berlin,`, 15, 240);

  //Firme

  doc.text('_____________________________', 15, 255);
  doc.text('Alter Eigentümer', 15, 260);
  doc.text('_____________________________', 110, 255);
  doc.text('Neuer Eigentümer', 110, 260);

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
  doc.text('Angelo Arboscello', 16, 274);
  doc.text('Annalisa Fornari', 16, 278);
  doc.text('Telefon: +49 (30) 54482958', 56, 270);
  doc.text('Telefax: +49 (30) 54482959', 56, 274);
  doc.text('E-Mail: info@m2square.eu', 56, 278);
  doc.text('Web: www.m2square.eu', 56, 282);
  doc.text('Steuernummer: 31/429/00375', 111, 270);
  doc.text('Ust.-IdNr.: DE278130647', 111, 274);

  //Logo IVD
  doc.addImage(ivdLogo, 'JPEG', 161, 270, 30, 12);

  doc.save(`Übergabeprotokoll Via.pdf`);
};
