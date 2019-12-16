import jsPDF from 'jspdf';
import { imgLogo } from './ImageLogo';
import { ivdLogo } from './IvdLogo';
import numeral from 'numeral';

export const notarDatenblatt = (
  acquirente,
  acquirente2,
  venditore,
  venditore2,
  oggetto,
  notaio,
  verwalter,
  belastungsVollmacht,
  utente,
  firma,
  ceo,
  prezzoDiVendita
) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  doc.setFont('times');
  const fontStart = 10;

  const cartaIntestata = () => {
    doc.addImage(imgLogo, 'JPEG', 130, 10, 55, 12, undefined, 'SLOW');
    //linea rossa
    doc.setDrawColor(145, 0, 0);
    doc.setLineWidth(7);
    doc.line(146, 26, 199, 26);
    //linea grigia
    doc.setDrawColor(143, 143, 143);
    doc.setLineWidth(7);
    doc.line(15, 26, 146, 26);

    //Header
    doc.setFontSize(fontStart + 1);
    doc.setTextColor(255, 255, 255);

    doc.setFontType('bold');
    doc.text(
      `${firma.name} ${firma.name2 && ` - ${firma.name2}`} - ${
        firma.adresse
      }, ${firma.plz} ${firma.stadt}`,
      19,
      27
    );
    //Footer
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.2);
    doc.line(15, 267, 15, 282);
    doc.line(55, 267, 55, 282);
    doc.line(110, 267, 110, 282);
    // doc.line(160, 267, 160, 282);
    doc.setFontSize(fontStart);
    doc.setTextColor(143, 143, 143);
    doc.text('Geschäftsführer:', 16, 270);
    let position = 274;

    ceo.forEach(eachCeo => {
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
    doc.addImage(ivdLogo, 'JPEG', 161, 270, 30, 12, undefined, 'SLOW');
  };

  cartaIntestata();
  //riquadro contatti
  doc.setDrawColor(215, 240, 245);
  doc.setLineWidth(70);
  doc.line(146, 70, 199, 70);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(fontStart);
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

  if (notaio) {
    //Intestazione Datenblatt
    doc.setFontSize(12);
    doc.setFontType('normal');
    doc.text(notaio.ditta, 15, 38);
    doc.text(`${notaio.titolo} ${notaio.nome} ${notaio.cognome}`, 15, 43);
    doc.text(`${notaio.indirizzo} ${notaio.indirizzo2}`, 15, 48);
    doc.text(`${notaio.cap} ${notaio.comune}`, 15, 53);
  }

  //Data e titolo
  doc.setFontSize(14);
  doc.setFontType('bold');
  doc.text(`Datenblatt zur Vorbereitung eines Kaufvertragsentwurfs`, 15, 70);

  //Objekt
  let acapo = 90;
  doc.setFontSize(14);
  doc.setFontType('bold');
  doc.text(`Objekt`, 15, 85);
  doc.setFontSize(12);
  doc.setFontType('normal');
  doc.text(
    `Adresse: ${oggetto.via} ${oggetto.numeroCivico}, ${oggetto.cap} ${oggetto.citta}`,
    15,
    acapo
  );
  acapo += 5;
  doc.text(`WE Nr. ${oggetto.numeroAppartamento}`, 15, acapo);

  if (oggetto.m2.length > 0) {
    acapo += 5;
    doc.text(`m2: ${oggetto.m2}`, 15, acapo);
  }
  if (oggetto.piano.length > 0) {
    acapo += 5;
    doc.text(`Etage: ${oggetto.piano}`, 15, acapo);
  }
  if (oggetto.stato.length > 0) {
    acapo += 5;
    doc.text(`Status: ${oggetto.stato}`, 15, acapo);
  }
  if (oggetto.stato === 'vermietet' > 0) {
    acapo += 5;
    doc.text(
      `Kaltmiete: ${numeral(oggetto.affittoNetto / 100).format('0,0[.]00 $')}`,
      15,
      acapo
    );
  }
  if (oggetto.wohngeld.length > 0) {
    acapo += 5;
    doc.text(
      `Wohngeld: ${numeral(oggetto.wohngeld / 100).format('0,0[.]00 $')}`,
      15,
      acapo
    );
  }

  acapo += 5;
  doc.text(
    `Kaufpreis: ${numeral(prezzoDiVendita / 100).format('0,0[.]00 $')}`,
    15,
    acapo
  );

  acapo += 5;
  doc.text(
    `Belastungsvollmacht: ${belastungsVollmacht ? `Ja` : `Nein`}`,
    15,
    acapo
  );

  if (oggetto.grundbuch.length > 0) {
    acapo += 5;
    doc.text(
      `Amtsgericht ${oggetto.amtsgericht}, Grundbuch von ${oggetto.grundbuch}, Blatt Nr. ${oggetto.grundbuchBlatt}`,
      15,
      acapo
    );
  }

  acapo += 5;
  oggetto.mobilio && doc.text(`Einrichtung: siehe Liste`, 15, acapo);

  //Verkäufer
  acapo += 10;
  doc.setFontSize(14);
  doc.setFontType('bold');
  doc.text(`Verkäufer`, 15, acapo);
  acapo += 5;
  doc.setFontSize(12);
  doc.setFontType('normal');
  doc.text(
    `${venditore.titolo} ${venditore.nome} ${
      venditore.cognome
    } ${venditore.ditta && ` - Firma: ${venditore.ditta}`}`,
    15,
    acapo
  );
  acapo += 5;
  doc.text(
    `${venditore.indirizzo} ${venditore.cap} ${venditore.comune}, ${venditore.nazione}`,
    15,
    acapo
  );
  acapo += 5;
  doc.text(
    `Tel.: ${venditore.telefono1} - E-Mail: ${venditore.email}`,
    15,
    acapo
  );

  if (
    venditore.bank.length > 0 ||
    venditore.iban.length > 0 ||
    venditore.bic.length > 0
  ) {
    acapo += 5;
    doc.text(
      `${venditore.bank && `Bank: ${venditore.bank}`} ${venditore.iban &&
        `- IBAN: ${venditore.iban}`} ${venditore.bic &&
        `- BIC/SWIFT: ${venditore.bic}`} `,
      15,
      acapo
    );
  }

  if (venditore2) {
    acapo += 10;
    doc.text(
      `${venditore2.titolo} ${venditore2.nome} ${
        venditore2.cognome
      } ${venditore2.ditta && ` - Firma: ${venditore2.ditta}`}`,
      15,
      acapo
    );
    acapo += 5;
    doc.text(
      `${venditore2.indirizzo} ${venditore2.cap} ${venditore2.comune}, ${venditore2.nazione}`,
      15,
      acapo
    );
    acapo += 5;
    doc.text(
      `Tel.: ${venditore2.telefono1} - E-Mail: ${venditore2.email}`,
      15,
      acapo
    );
    if (
      venditore2.bank.length > 0 ||
      venditore2.iban.length > 0 ||
      venditore2.bic.length > 0
    ) {
      acapo += 5;
      doc.text(
        `${venditore2.bank && `Bank: ${venditore2.bank}`} ${venditore2.iban &&
          `- IBAN: ${venditore2.iban}`} ${venditore2.bic &&
          `- BIC/SWIFT: ${venditore2.bic}`} `,
        15,
        acapo
      );
    }
  }

  //Käufer
  acapo += 10;
  doc.setFontSize(14);
  doc.setFontType('bold');
  doc.text(`Käufer`, 15, acapo);
  acapo += 5;
  doc.setFontSize(12);
  doc.setFontType('normal');
  doc.text(
    `${acquirente.titolo} ${acquirente.nome} ${
      acquirente.cognome
    } ${acquirente.ditta && ` - Firma: ${acquirente.ditta}`}`,
    15,
    acapo
  );
  acapo += 5;
  doc.text(
    `${acquirente.indirizzo} ${acquirente.cap} ${acquirente.comune}, ${acquirente.nazione}`,
    15,
    acapo
  );
  acapo += 5;
  doc.text(
    `Tel.: ${acquirente.telefono1} - E-Mail: ${acquirente.email}`,
    15,
    acapo
  );
  if (acquirente2) {
    acapo += 10;
    doc.text(
      `${acquirente2.titolo} ${acquirente2.nome} ${
        acquirente2.cognome
      } ${acquirente2.ditta && ` - Firma: ${acquirente2.ditta}`}`,
      15,
      acapo
    );
    acapo += 5;
    doc.text(
      `${acquirente2.indirizzo} ${acquirente2.cap} ${acquirente2.comune}, ${acquirente2.nazione}`,
      15,
      acapo
    );
    acapo += 5;
    doc.text(
      `Tel.: ${acquirente2.telefono1} - E-Mail: ${acquirente2.email}`,
      15,
      acapo
    );
  }

  //Verwalter
  acapo += 10;
  verwalter && doc.setFontSize(14);
  verwalter && doc.setFontType('bold');
  verwalter && doc.text(`Verwalter`, 15, acapo);
  acapo += 5;
  verwalter && doc.setFontSize(12);
  verwalter && doc.setFontType('normal');
  verwalter && doc.text(verwalter.ditta, 15, acapo);

  if (verwalter) {
    acapo += 5;
    doc.text(
      `${verwalter.titolo} ${verwalter.nome}, ${verwalter.cognome}`,
      15,
      acapo
    );
    acapo += 5;
    doc.text(
      `${verwalter.indirizzo}, ${verwalter.cap} ${verwalter.comune}`,
      15,
      acapo
    );
    acapo += 5;
    doc.text(
      `Tel.: ${verwalter.telefono1} - E-Mail: ${verwalter.email}`,
      15,
      acapo
    );
  }

  if (oggetto.mobilio) {
    doc.addPage();
    cartaIntestata();

    //Titolo per Einrichtungsliste
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFontType('bold');
    doc.text(`Einrichtung`, 15, 38);
    doc.setFontSize(10);
    doc.setFontType('normal');

    //questa funzione splitta il testo in array di linee di testo. Lo reitero e aggiungo margine dall'alto fino a 260 che è fondo pagina, dopodichè aggiungo pagina e reinizializzo il margine alto
    const lines = doc.splitTextToSize(oggetto.mobilio, 180);
    let y = 45;
    for (let i = 0; i < lines.length; i++) {
      if (y > 260) {
        y = 38;
        doc.addPage();
        cartaIntestata();
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFontType('normal');
      }
      doc.text(15, y, lines[i]);
      y = y + 5;
    }
  }

  doc.save(`Notar Danteblatt.pdf`);
};
