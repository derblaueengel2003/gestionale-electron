import jsPDF from 'jspdf';
import { imgLogo } from './ImageLogo';
import { ivdLogo } from './IvdLogo';
import numeral from 'numeral';

export const doc = new jsPDF('p', 'mm', 'a4');

export const expose = (oggetto, firma, utente, ceo, lingua) => {
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
      descrizione: oggetto.descrizioneDe
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
      descrizione: oggetto.descrizione
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
      descrizione: oggetto.descrizioneEn
    };
  }
  const cartaIntestata = () => {
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
    doc.setFontSize(fontStart + 1);
    doc.setTextColor(255, 255, 255);
    doc.setFont('times');
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
    doc.addImage(ivdLogo, 'JPEG', 161, 270, 30, 12);
  };

  cartaIntestata();

  const cover = new Image();
  cover.src = oggetto.downloadURLsCover;
  doc.addImage(cover, 'JPEG', 15, 35, 131, 70);

  if (oggetto.downloadURLsGrundriss.length > 0) {
    const grundriss = new Image();
    grundriss.src = oggetto.downloadURLsGrundriss[0];
    let xPos = 90;
    let yPos = 65;
    if (grundriss.width < grundriss.height) {
      xPos = 65;
      yPos = 90;
    }
    doc.addImage(grundriss, 'JPEG', 115, 130, xPos, yPos);
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
  doc.text(traduzione.titolo, 107, 120, 'center');

  //Prezzo e indirizzo
  doc.setFontSize(fontStart + 8);
  doc.setFontType('normal');
  doc.setTextColor(145, 0, 0);
  doc.text(`${numeral(oggetto.kaufpreis / 100).format('0,0[.]00 $')}`, 15, 135);
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
      if (heizungsArt === 'Zentralheizung') {
        heizungsArt = 'centralizzato';
      } else if (heizungsArt === 'Etagenheizung') {
        heizungsArt = 'indipendente';
      }
    } else if (lingua === 'en') {
      if (heizungsArt === 'Zentralheizung') {
        heizungsArt = 'central';
      } else if (heizungsArt === 'Etagenheizung') {
        heizungsArt = 'floor heating';
      }
    }
    acapo += 5;
    doc.text(`${traduzione.heizungsart}: ${heizungsArt}`, 15, acapo);
  }

  if (oggetto.energieAusweisTyp.length > 0) {
    let energieausweis = oggetto.energieAusweisTyp;
    if (lingua === 'it') {
      if (energieausweis === 'Verbrauchsausweis') {
        energieausweis = 'consumo';
      } else if (energieausweis === 'Bedarfsausweis') {
        energieausweis = 'fabbisogno';
      }
    } else if (lingua === 'en') {
      if (energieausweis === 'Verbrauchsausweis') {
        energieausweis = 'consumption';
      } else if (energieausweis === 'Bedarfsausweis') {
        energieausweis = 'requirement';
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
      if (energietraeger === 'Erdgas') {
        energietraeger = 'gas';
      } else if (energietraeger === 'Öl') {
        energietraeger = 'olio combustibile';
      } else if (energietraeger === 'Fernwärme') {
        energietraeger = 'teleriscaldamento';
      }
    } else if (lingua === 'en') {
      if (energietraeger === 'Erdgas') {
        energietraeger = 'gaz';
      } else if (energietraeger === 'Öl') {
        energietraeger = 'fuel oil';
      } else if (energietraeger === 'Fernwärme') {
        energietraeger = 'district heating';
      }
    }
    acapo += 5;
    doc.text(`${traduzione.energieTraeger}: ${energietraeger}`, 15, acapo);
  }

  if (oggetto.wohngeld.length > 0) {
    acapo += 5;
    doc.text(`${traduzione.wohngeld}: ${oggetto.wohngeld}`, 15, acapo);
  }

  if (oggetto.affittoNetto.length > 0) {
    acapo += 5;
    doc.text(`${traduzione.affittoNetto}: ${oggetto.affittoNetto}`, 15, acapo);
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
      if (oggettoCondizioni === 'neu') {
        oggettoCondizioni = 'nuovo';
      } else if (oggettoCondizioni === 'gut') {
        oggettoCondizioni = 'buone';
      } else if (oggettoCondizioni === 'renovierunsgbedürftig') {
        oggettoCondizioni = 'da ristrutturare';
      }
    } else if (lingua === 'en') {
      if (oggettoCondizioni === 'neu') {
        oggettoCondizioni = 'new';
      } else if (oggettoCondizioni === 'gut') {
        oggettoCondizioni = 'good';
      } else if (oggettoCondizioni === 'renovierunsgbedürftig') {
        oggettoCondizioni = 'needs refurbishment';
      }
    }

    acapo += 5;
    doc.text(`${traduzione.condizioni}: ${oggettoCondizioni}`, 15, acapo);
  }

  if (oggetto.provvigione.length > 0) {
    acapo += 5;
    doc.text(`${traduzione.provvigione}: ${oggetto.provvigione}`, 15, acapo);
  }

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

  //Pagina Foto
  if (oggetto.downloadURLs.length > 0) {
    doc.addPage();
    cartaIntestata();
    let pictureYPosition = 35;
    let pictureXPosition = 15;
    let alternate = true;
    let count = 0;
    oggetto.downloadURLs.map(url => {
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
      doc.addImage(picture, 'JPEG', pictureXPosition, pictureYPosition, 90, 65);
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

  //Pagina Mappa
  if (oggetto.downloadURLsMap.length > 0) {
    doc.addPage();
    cartaIntestata();

    const map = new Image();
    map.src = oggetto.downloadURLsMap;
    doc.addImage(map, 'JPEG', 25, 35, 150, 150);
  }

  doc.save(`${oggetto.rifId}-Exposé.pdf`);
};
