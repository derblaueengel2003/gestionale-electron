import jsPDF from 'jspdf';
import { imgLogo } from './img/ImageLogo';
import { ivdLogo } from './img/IvdLogo';
import { formattaPrezzo } from '../common/utils';

export const expose = (oggetto, firma, utente, ceo, lingua) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  doc.setFont('times');
  const fontStart = 10;
  let traduzione = {};
  if (lingua === 'de') {
    traduzione = {
      ansprechpartner: 'Ihr Ansprechpartner',
      oeffnungszeiten: 'Öffnungszeiten',
      saluti: 'Mit freundlichen Grüßen',
      titolo: oggetto.titoloDe,
      bagni: 'Badezimmer',
      piano: 'Etage',
      baujahr: 'Baujahr',
      heizungsart: 'Heizungsart',
      energieAusweisTyp: 'Energieausweis-Typ',
      energieAusweisBis: 'Energieausweis gültig bis',
      energieBedarf: 'Energieverbrauch KWh/(m²*a)',
      energieTraeger: 'Wesentliche Energieträger',
      wohngeld: 'Hausgeld',
      affittoNetto: 'Kaltmiete',
      provvigione: 'Käuferprovision (inkl. MWSt.)',
      balcone: 'Balkon',
      ascensore: 'Aufzug',
      giardino: 'Garten',
      cantina: 'Keller',
      condizioni: 'Zustand',
      vani: 'Zimmer',
      m2: 'Größe',
      rifId: 'Ref. ID',
      descrizione: oggetto.descrizioneDe,
    };
  } else if (lingua === 'it') {
    traduzione = {
      ansprechpartner: 'Il Suo referente',
      oeffnungszeiten: 'Orari di apertura',
      saluti: 'Cordiali saluti',
      titolo: oggetto.titolo,
      bagni: 'Bagni',
      piano: 'Piano',
      baujahr: 'Anno di costruzione',
      heizungsart: 'Tipo di riscaldamento',
      energieAusweisTyp: 'Certificato energetico basato sul',
      energieAusweisBis: 'Valido fino al',
      energieBedarf: 'Consumo energetico KWh/(m²*a)',
      energieTraeger: 'Fonte energetica primaria',
      wohngeld: 'Condominio',
      affittoNetto: 'Affitto netto',
      provvigione: "Provvigione per l'acquirente (IVA inclusa)",
      balcone: 'Balcone',
      ascensore: 'Ascensore',
      giardino: 'Giardino',
      cantina: 'Cantina',
      condizioni: 'Condizioni',
      vani: 'Vani',
      m2: 'Ampiezza',
      rifId: 'Rif. ID',
      descrizione: oggetto.descrizione,
    };
  } else if (lingua === 'en') {
    traduzione = {
      ansprechpartner: 'Your Agent',
      oeffnungszeiten: 'Opening hours',
      saluti: 'Best regards',
      titolo: oggetto.titoloEn,
      bagni: 'Bathrooms',
      piano: 'Floor No.',
      baujahr: 'Year built',
      heizungsart: 'Heating type',
      energieAusweisTyp: 'Energy pass based on',
      energieAusweisBis: 'Valid until',
      energieBedarf: 'Energy consumption KWh/(m²*a)',
      energieTraeger: 'Primary energy carrier',
      wohngeld: 'Monthly costs',
      affittoNetto: 'Net monthly rent',
      provvigione: 'Agency fee for buyer (VAT included)',
      balcone: 'Balcony',
      ascensore: 'Elevator',
      giardino: 'Garden',
      cantina: 'Cellar',
      condizioni: 'Condition',
      vani: 'Rooms',
      m2: 'Size',
      rifId: 'Ref. ID',
      descrizione: oggetto.descrizioneEn,
    };
  }
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
    doc.addImage(ivdLogo, 'JPEG', 161, 270, 30, 12, undefined, 'SLOW');
  };
  const frontpage = () => {
    //Frontpage
    cartaIntestata();
    const cover = new Image();
    cover.src = oggetto.downloadURLsCover;
    doc.addImage(cover, 'JPEG', 30, 35, 0, 70, undefined, 'SLOW');

    if (
      oggetto.downloadURLsGrundriss &&
      oggetto.downloadURLsGrundriss.length > 0
    ) {
      const grundriss = new Image();
      grundriss.src = oggetto.downloadURLsGrundriss[0];
      let xPos = 90;
      let yPos = 65;
      if (grundriss.width < grundriss.height) {
        xPos = 65;
        yPos = 90;
      }
      doc.addImage(grundriss, 'JPEG', 115, 130, xPos, yPos, undefined, 'SLOW');
    }

    //riquadro contatti
    doc.setDrawColor(215, 240, 245);
    doc.setLineWidth(70);
    doc.line(146, 70, 199, 70);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(fontStart);
    doc.setFontType('normal');
    doc.text(traduzione.ansprechpartner, 149, 40);
    doc.setFontType('bold');
    doc.text(`${utente.name}`, 149, 44);
    doc.setFontType('normal');
    doc.text(`${utente.email}`, 149, 48);
    doc.text(`Tel. ${utente.telefon}`, 149, 52);
    doc.text(`${firma.website}`, 149, 56);
    doc.setFontType('bold');
    doc.text(traduzione.oeffnungszeiten, 149, 68);
    doc.setFontType('normal');
    doc.text(`${firma.open}`, 149, 72);
    doc.setFontType('bold');
    doc.text(`${firma.name2 ? firma.name2 : firma.name}`, 149, 84);
    doc.setFontType('normal');
    doc.text(`${firma.motto}`, 149, 88);
    doc.text(`${firma.adresse}`, 149, 92);
    doc.text(`${firma.plz} ${firma.stadt}`, 149, 96);
    doc.text(`${firma.staat}`, 149, 100);

    //Titolo
    doc.setFontSize(fontStart + 10);
    doc.setFontType('bold');
    //per centrare il titolo uso poco più della metà della larghezza di pagina e il tag 'center'
    // doc.text(traduzione.titolo, 107, 120, 'center');

    const linesTitolo = doc.splitTextToSize(traduzione.titolo, 180);
    doc.text(15, 120 + 12 / 110, linesTitolo);

    //Prezzo e indirizzo
    doc.setFontSize(fontStart + 8);
    doc.setFontType('normal');
    doc.setTextColor(145, 0, 0);
    doc.text(`${formattaPrezzo(oggetto.kaufpreis, true)}`, 15, 135);
    doc.setFontSize(fontStart + 5);
    doc.setTextColor(0, 0, 0);
    doc.text(`${oggetto.via} ${oggetto.numeroCivico}`, 15, 145);
    doc.text(`${oggetto.cap} ${oggetto.citta}`, 15, 150);
    doc.text(`${oggetto.quartiere}`, 15, 155);
    //linea di separazione
    doc.setDrawColor(143, 143, 143);
    doc.setLineWidth(0.05);
    doc.line(15, 160, 60, 160);

    //Dettagli tecnici
    let acapo = 160;
    doc.setFontSize(fontStart + 2);
    if (oggetto.rifId.length > 0) {
      acapo += 5;
      doc.text(`${traduzione.rifId}: ${oggetto.rifId}`, 15, acapo);
    }

    if (oggetto.m2.length > 0) {
      acapo += 5;
      doc.text(`${traduzione.m2}: ${oggetto.m2} m2`, 15, acapo);
    }

    if (oggetto.vani.length > 0) {
      acapo += 5;
      doc.text(`${traduzione.vani}: ${oggetto.vani}`, 15, acapo);
    }

    if (oggetto.bagni.length > 0) {
      acapo += 5;
      doc.text(`${traduzione.bagni}: ${oggetto.bagni}`, 15, acapo);
    }

    if (oggetto.piano.length > 0) {
      acapo += 5;
      doc.text(`${traduzione.piano}: ${oggetto.piano}`, 15, acapo);
    }

    if (oggetto.baujahr.length > 0) {
      acapo += 5;
      doc.text(`${traduzione.baujahr}: ${oggetto.baujahr}`, 15, acapo);
    }

    if (oggetto.heizungsart.length > 0) {
      let heizungsArt = oggetto.heizungsart;
      if (lingua === 'it') {
        if (
          heizungsArt === 'Zentralheizung' ||
          heizungsArt === 'heating_central'
        ) {
          heizungsArt = 'centralizzato';
        } else if (
          heizungsArt === 'Etagenheizung' ||
          heizungsArt === 'heating_floor'
        ) {
          heizungsArt = 'indipendente';
        }
      } else if (lingua === 'en') {
        if (
          heizungsArt === 'Zentralheizung' ||
          heizungsArt === 'heating_central'
        ) {
          heizungsArt = 'central';
        } else if (
          heizungsArt === 'Etagenheizung' ||
          heizungsArt === 'heating_floor'
        ) {
          heizungsArt = 'floor heating';
        }
      } else if (lingua === 'de') {
        if (heizungsArt === 'heating_central') {
          heizungsArt = 'Zentralheizung';
        } else if (heizungsArt === 'heating_floor') {
          heizungsArt = 'Etagenheizung';
        }
      }
      acapo += 5;
      doc.text(`${traduzione.heizungsart}: ${heizungsArt}`, 15, acapo);
    }

    if (oggetto.energieAusweisTyp.length > 0) {
      let energieausweis = oggetto.energieAusweisTyp;
      if (lingua === 'it') {
        if (
          energieausweis === 'Verbrauchsausweis' ||
          energieausweis === 'based_on_consumption'
        ) {
          energieausweis = 'consumo';
        } else if (
          energieausweis === 'Bedarfsausweis' ||
          energieausweis === 'based_on_requirement'
        ) {
          energieausweis = 'fabbisogno';
        }
      } else if (lingua === 'en') {
        if (
          energieausweis === 'Verbrauchsausweis' ||
          energieausweis === 'based_on_consumption'
        ) {
          energieausweis = 'consumption';
        } else if (
          energieausweis === 'Bedarfsausweis' ||
          energieausweis === 'based_on_requirement'
        ) {
          energieausweis = 'requirement';
        }
      } else if (lingua === 'de') {
        if (energieausweis === 'based_on_consumption') {
          energieausweis = 'Verbrauchsausweis';
        } else if (energieausweis === 'based_on_requirement') {
          energieausweis = 'Bedarfsausweis';
        }
      }

      acapo += 5;
      doc.text(`${traduzione.energieAusweisTyp}: ${energieausweis}`, 15, acapo);
    }

    if (oggetto.energieAusweisBis.length > 0) {
      acapo += 5;
      doc.text(
        `${traduzione.energieAusweisBis}: ${oggetto.energieAusweisBis}`,
        15,
        acapo
      );
    }

    if (oggetto.energieBedarf.length > 0) {
      acapo += 5;
      doc.text(
        `${traduzione.energieBedarf}: ${oggetto.energieBedarf}`,
        15,
        acapo
      );
    }

    if (oggetto.energieTraeger.length > 0) {
      let energietraeger = oggetto.energieTraeger;
      if (lingua === 'it') {
        if (energietraeger === 'Erdgas' || energietraeger === 'heating_gas') {
          energietraeger = 'gas';
        } else if (
          energietraeger === 'Öl' ||
          energietraeger === 'heating_oil'
        ) {
          energietraeger = 'olio combustibile';
        } else if (
          energietraeger === 'Fernwärme' ||
          energietraeger === 'heating_district'
        ) {
          energietraeger = 'teleriscaldamento';
        }
      } else if (lingua === 'en') {
        if (energietraeger === 'Erdgas' || energietraeger === 'heating_gas') {
          energietraeger = 'gaz';
        } else if (
          energietraeger === 'Öl' ||
          energietraeger === 'heating_oil'
        ) {
          energietraeger = 'fuel oil';
        } else if (
          energietraeger === 'Fernwärme' ||
          energietraeger === 'heating_district'
        ) {
          energietraeger = 'district heating';
        }
      } else if (lingua === 'de') {
        if (energietraeger === 'heating_gas') {
          energietraeger = 'Erdgas';
        } else if (energietraeger === 'heating_oil') {
          energietraeger = 'Öl';
        } else if (energietraeger === 'heating_district') {
          energietraeger = 'Fernwärme';
        }
      }

      acapo += 5;
      doc.text(`${traduzione.energieTraeger}: ${energietraeger}`, 15, acapo);
    }

    if (oggetto.wohngeld > 0) {
      acapo += 5;
      doc.text(
        `${traduzione.wohngeld}: ${formattaPrezzo(oggetto.wohngeld, true)}`,
        15,
        acapo
      );
    }

    if (oggetto.affittoNetto > 0) {
      acapo += 5;
      doc.text(
        `${traduzione.affittoNetto}: ${formattaPrezzo(
          oggetto.affittoNetto,
          true
        )}`,
        15,
        acapo
      );
    }

    if (oggetto.balcone) {
      acapo += 5;
      doc.text(`${traduzione.balcone}`, 15, acapo);
    }

    if (oggetto.ascensore) {
      acapo += 5;
      doc.text(`${traduzione.ascensore}`, 15, acapo);
    }

    if (oggetto.giardino) {
      acapo += 5;
      doc.text(`${traduzione.giardino}`, 15, acapo);
    }

    if (oggetto.cantina) {
      acapo += 5;
      doc.text(`${traduzione.cantina}`, 15, acapo);
    }

    if (oggetto.condizioni.length > 0) {
      let oggettoCondizioni = oggetto.condizioni;
      if (lingua === 'it') {
        if (oggettoCondizioni === 'new') {
          oggettoCondizioni = 'nuovo';
        } else if (oggettoCondizioni === 'good') {
          oggettoCondizioni = 'buone';
        } else if (oggettoCondizioni === 'to_renovate') {
          oggettoCondizioni = 'da ristrutturare';
        }
      } else if (lingua === 'de') {
        if (oggettoCondizioni === 'new') {
          oggettoCondizioni = 'neu';
        } else if (oggettoCondizioni === 'good') {
          oggettoCondizioni = 'gut';
        } else if (oggettoCondizioni === 'to_renovate') {
          oggettoCondizioni = 'renovierungsbedürftig';
        }
      } else if (lingua === 'en') {
        if (oggettoCondizioni === 'to_renovate') {
          oggettoCondizioni = 'needs refurbishment';
        }
      }

      acapo += 5;
      doc.text(`${traduzione.condizioni}: ${oggettoCondizioni}`, 15, acapo);
    }

    if (oggetto.provvigione > 0) {
      acapo += 5;
      doc.text(
        `${traduzione.provvigione}: ${formattaPrezzo(
          oggetto.provvigione,
          false
        )}%`,
        15,
        acapo
      );
    }
  };
  const paginaDescrizione = () => {
    //Pagina Descrizione
    doc.addPage();
    cartaIntestata();
    doc.setFontSize(fontStart + 4);
    doc.setFontType('normal');
    doc.setTextColor(0, 0, 0);
    let descrizione = 'Beschreibung';
    if (lingua === 'it') {
      descrizione = 'Descrizione';
    } else if (lingua === 'en') {
      descrizione = 'Description';
    }
    doc.text(descrizione, 15, 36);
    doc.setFontSize(fontStart + 2);

    const lines = doc
      .setFontSize(12)
      .splitTextToSize(traduzione.descrizione, 180);
    doc.text(15, 45 + 12 / 110, lines);
  };
  const foto = () => {
    //Pagina Foto
    if (oggetto.downloadURLs.length > 0) {
      doc.addPage();
      cartaIntestata();
      let pictureYPosition = 35;
      let pictureXPosition = 15;
      let alternate = true;
      let count = 0;
      // stabilisco se ho un array di urls o un array di array di urls
      let payload = Array.isArray(oggetto.downloadURLs[0])
        ? oggetto.downloadURLs[0]
        : oggetto.downloadURLs;
      payload.map((url) => {
        if (count === 6) {
          doc.addPage();
          cartaIntestata();
          pictureYPosition = 35;
          pictureXPosition = 15;
          alternate = true;
          count = 0;
        }
        const picture = new Image();
        picture.src = url;
        doc.addImage(
          picture,
          'JPEG',
          pictureXPosition,
          pictureYPosition,
          90,
          65,
          undefined,
          'SLOW'
        );
        if (alternate) {
          pictureXPosition += 94;
        } else {
          pictureXPosition = 15;
          pictureYPosition += 70;
        }
        alternate = !alternate;
        count++;
      });
    }
  };
  const mappa = () => {
    //Pagina Mappa
    doc.addPage();
    cartaIntestata();

    const mappa = new Image();
    mappa.src = `https://maps.googleapis.com/maps/api/staticmap?center=${oggetto.via}+${oggetto.numeroCivico},+${oggetto.cap}+${oggetto.citta}&zoom=15&size=800x800&maptype=roadmap
&markers=color:blue%7Clabel:A%7C${oggetto.latitude},${oggetto.longitude}
&key=AIzaSyBlElUhBRSKAy_GooSEN7uZaA1dLtjzfzE`;
    doc.addImage(mappa, 'PNG', 15, 50, 180, 180, undefined, 'SLOW');
  };

  const agb = () => {
    // AGBs
    doc.addPage();
    cartaIntestata();
    let spazio = 40;
    doc.setFontSize(fontStart + 4);
    doc.setFontType('bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Allgemeine Vertragsbedingungen', 15, spazio);
    spazio += 10;

    doc.setFontType('bold');
    doc.setFontSize(fontStart + 2);
    doc.text('1. Weitergabeverbot', 15, spazio);
    spazio += 10;
    doc.setFontType('normal');
    const linesAGB1 = doc
      .setFontSize(12)
      .splitTextToSize(
        'Die Informationen über die Vertragsgelegenheit sind nur für Sie bestimmt. Eine Weitergabe der Informationen ist nicht gestattet. Für den Fall der Weitergabe und Vertragsschluss durch den Dritten sind Sie ebenfalls provisionsverpflichtet.',
        180
      );
    doc.text(15, spazio + 12 / 110, linesAGB1);
    spazio += 20;

    doc.setFontType('bold');
    doc.setFontSize(fontStart + 2);
    doc.text('2. Gegenstand des Auftrags', 15, spazio);
    spazio += 10;

    doc.setFontType('normal');
    const linesAGB2 = doc
      .setFontSize(12)
      .splitTextToSize(
        'Gegenstand des Auftrags ist der Nachweis und/oder die Vermittlung zu der jeweiligen Vertragsgelegenheit.',
        180
      );
    doc.text(15, spazio + 12 / 110, linesAGB2);
    spazio += 15;

    doc.setFontType('bold');
    doc.setFontSize(fontStart + 2);
    doc.text('3. Erlaubte Doppeltätigkeit', 15, spazio);
    spazio += 10;

    doc.setFontType('normal');
    const linesAGB3 = doc
      .setFontSize(12)
      .splitTextToSize(
        'Der Eigentümer der Immobilie hat uns mit dem Vertrieb beauftragt. Es ist uns daher erlaubt, sowohl für Sie, als auch für den Eigentümer vermittelnd provisionspflichtig tätig zu werden.',
        180
      );
    doc.text(15, spazio + 12 / 110, linesAGB3);
    spazio += 15;

    doc.setFontType('bold');
    doc.setFontSize(fontStart + 2);
    doc.text('4. Inhalt der Angebote, Haftung', 15, spazio);
    spazio += 10;

    doc.setFontType('normal');
    const linesAGB4 = doc
      .setFontSize(12)
      .splitTextToSize(
        'Die Informationen zu unseren Immobilienangeboten erhalten wir vom Eigentümer oder anderen Auskunftsbefugten. Diese Angaben geben wir ohne Übernahme einer Haftung für deren Richtigkeit an Sie weiter. Sämtliche Angebote sind freibleibend, ein Zwischenverkauf bleibt vorbehalten. Verbindliche Zusagen des Maklers zur Vertragsgelegenheit bedürfen zu ihrer Wirksamkeit der Textform.',
        180
      );
    doc.text(15, spazio + 12 / 110, linesAGB4);
    spazio += 25;

    doc.setFontType('bold');
    doc.setFontSize(fontStart + 2);
    doc.text('5. Vorkenntnis', 15, spazio);
    spazio += 10;
    doc.setFontType('normal');
    const linesAGB5 = doc
      .setFontSize(12)
      .splitTextToSize(
        'Ist Ihnen ein von uns angebotenes Objekt bereits anderweitig bekannt ist, ist uns diese Vorkenntnis innerhalb einer Woche Tagen mitzuteilen. Anderenfalls sind Sie verpflichtet, uns im Wege des Schadensersatzes die Aufwendungen zu ersetzen, die uns dadurch entstanden sind, dass Sie uns in Unkenntnis über die bestehende Vorkenntnis gelassen haben.',
        180
      );
    doc.text(15, spazio + 12 / 110, linesAGB5);
    spazio += 25;

    doc.setFontType('bold');
    doc.setFontSize(fontStart + 2);
    doc.text('6. Gerichtsstand', 15, spazio);
    spazio += 10;
    doc.setFontType('normal');
    const linesAGB6 = doc
      .setFontSize(12)
      .splitTextToSize(
        'Ist unser Kunde Kaufmann oder unterhält er keinen Wohnsitz in Deutschland, gilt als Gerichtsstand und Erfüllungsort der Geschäftssitz des Maklers.',
        180
      );
    doc.text(15, spazio + 12 / 110, linesAGB6);
  };
  const widerrufsBelehrung = () => {
    //Wiedderrufsbelehrung
    doc.addPage();
    cartaIntestata();
    //box
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.2);
    doc.line(13, 260, 200, 260);
    doc.line(13, 170, 200, 170);
    doc.line(13, 170, 13, 260);
    doc.line(200, 170, 200, 260);

    //corpo
    doc.setTextColor(0, 0, 0);
    let spazioW = 35;
    doc.setFontType('bold');
    doc.setFontSize(fontStart);
    doc.text('Widerrufsrecht für Verbraucher', 15, spazioW);
    spazioW += 5;
    doc.setFontType('normal');
    const linesW1 = doc
      .setFontSize(10)
      .splitTextToSize(
        'Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses. Um Ihr Widerrufsrecht auszuüben, müssen Sie uns:',
        180
      );
    doc.text(15, spazioW + 10 / 110, linesW1);
    spazioW += 10;

    doc.text(
      `${firma.name} ${firma.name2 && ` - ${firma.name2}`}`,
      15,
      spazioW
    );
    spazioW += 5;
    doc.text(`${firma.adresse}, ${firma.plz} ${firma.stadt}`, 15, spazioW);
    spazioW += 5;
    doc.text(`Tel: ${firma.telefon}`, 15, spazioW);
    spazioW += 5;
    doc.text(`Fax: ${firma.fax}`, 15, spazioW);
    spazioW += 5;
    doc.text(`E-Mail: ${firma.email}`, 15, spazioW);
    spazioW += 5;

    const linesW2 = doc
      .setFontSize(10)
      .splitTextToSize(
        'mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief, Telefax oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster- Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.',
        180
      );
    doc.text(15, spazioW + 10 / 110, linesW2);
    spazioW += 20;

    doc.setFontType('bold');
    doc.setFontSize(fontStart);
    doc.text('Folgen des Widerrufs', 15, spazioW);
    spazioW += 5;
    doc.setFontType('normal');
    const linesW3 = doc
      .setFontSize(10)
      .splitTextToSize(
        'Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.',
        180
      );
    doc.text(15, spazioW + 10 / 110, linesW3);
    spazioW += 30;
    const linesW4 = doc
      .setFontSize(10)
      .splitTextToSize(
        'Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen soll, so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistung entspricht.',
        180
      );
    doc.text(15, spazioW + 10 / 110, linesW4);
    spazioW += 20;

    doc.setFontType('bold');
    doc.setFontSize(fontStart);
    doc.text(
      'Hinweis zum vorzeitigen Erlöschen des Widerrufsrechts',
      15,
      spazioW
    );
    spazioW += 5;
    doc.setFontType('normal');
    const linesW5 = doc
      .setFontSize(10)
      .splitTextToSize(
        'Ihr Widerrufsrecht erlischt bei einem Vertrag zur Erbringung von Dienstleistungen vorzeitig, wenn wir die Dienstleistung vollständig erbracht haben und mit der Ausführung der Dienstleistung erst begonnen haben, nachdem Sie dazu Ihre ausdrückliche Zustimmung gegeben haben und gleichzeitig Ihre Kenntnis davon bestätigt haben, dass Sie Ihr Widerrufsrecht bei vollständiger Vertragserfüllung durch uns verlieren.',
        180
      );
    doc.text(15, spazioW + 10 / 110, linesW5);
    spazioW += 20;

    doc.setFontType('bold');
    doc.setFontSize(fontStart);
    doc.text('Anlage - Muster-Widerrufsformular', 15, spazioW);
    spazioW += 5;
    doc.setFontType('normal');
    const linesW6 = doc
      .setFontSize(10)
      .splitTextToSize(
        '(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück)',
        180
      );
    doc.text(15, spazioW + 10 / 110, linesW6);
    spazioW += 5;
    doc.text('An:', 15, spazioW);
    spazioW += 5;
    doc.text(
      `${firma.name} ${firma.name2 && ` - ${firma.name2}`}`,
      15,
      spazioW
    );
    spazioW += 5;
    doc.text(`${firma.adresse}, ${firma.plz} ${firma.stadt}`, 15, spazioW);
    spazioW += 5;
    doc.text(`Tel: ${firma.telefon}`, 15, spazioW);
    spazioW += 5;
    doc.text(`Fax: ${firma.fax}`, 15, spazioW);
    spazioW += 5;
    doc.text(`E-Mail: ${firma.email}`, 15, spazioW);
    spazioW += 10;

    const linesW7 = doc
      .setFontSize(10)
      .splitTextToSize(
        'Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Erbringung von Maklerdienstleistungen vom:                            über:',
        180
      );
    doc.text(15, spazioW + 10 / 110, linesW7);
    spazioW += 10;
    doc.text('Name des/der Verbraucher(s):', 15, spazioW);
    spazioW += 5;
    doc.text('Anschrift des/der Verbraucher(s):', 15, spazioW);
    spazioW += 5;
    doc.text(
      'Datum:                                               Unterschrift des/der Verbraucher(s)**: ______________________________________',
      15,
      spazioW
    );
    spazioW += 10;
    doc.text('(*)Unzutreffendes streichen', 15, spazioW);
    spazioW += 5;
    doc.text('** nur bei Mitteilung auf Papier', 15, spazioW);
  };

  //RENDER
  frontpage();
  paginaDescrizione();
  foto();
  mappa();
  agb();
  widerrufsBelehrung();

  //Save
  doc.save(`${oggetto.rifId}-Exposé-${lingua}.pdf`);
};
