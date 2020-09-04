import jsPDF from 'jspdf';
import { imgLogo } from '../moduli/ImageLogo';
import { ivdLogo } from '../moduli/IvdLogo';
import numeral from 'numeral';
import moment from 'moment';

// se c'é già l'oggetto uso la foto come copertina altrimenti uso una foto generica
const evaluationPdf = (evaluation, firma, utente, ceo, lingua, oggetto) => {
  const doc = new jsPDF('p', 'mm', 'a4', true);
  doc.setFont('helvetica');
  let fontStart = 14;
  let xPos = 15;
  let yPos = 15;
  let traduzione = {};
  if (lingua === 'De') {
    traduzione = {
      apartment: 'Eigentumswohnung',

      evaluation: 'Immobilienbewertung',
      testoIntroduttivo:
        'Sehr geehrte Damen und Herren,\nvielen Dank für Ihre Bewertungsanfrage.\nWie versprochen, haben wir eine Bewertung der Immobilie durchgeführt, indem wir historische Daten, Marktdaten und Merkmale analysiert haben.\n',
      wohnlageText:
        'Wohnlagenkarte nach Adressen zum Berliner Mietspiegel 2019:',
      bodenrichtwertText:
        'Entwicklung des Bodenrichtwertes in der letzten 3 Jahren:',
      is24Text: 'Bewertungsergebnis des Portals ImmoScout24:',
      immobilienpreisText:
        'Verkaufspreise in der letzten 2 Jahren vergleichbarer Immobilie:',
      mietspiegelText: 'Mietspiegel:',
      mietendeckelText:
        'Laut Mietendeckel ist die maximale Nettokaltmiete jedoch ',
      datiIntroText:
        'Bei der Bewertung haben wir folgende Daten berücksichtigt:',
      testoFinale:
        'Selbstverständlich haben wir die Daten mit den Besonderheiten der Immobilie angepasst. Unsere Preisschätzung liegt bei',
      testoFinale2:
        'Wir hoffen, unsere Bewertung entspricht Ihre Preisvorstellung. Wir würden uns über einen Maklerauftrag freuen und stehen Ihnen weiterhin gerne zur Verfügung.\n\nBeste Grüße',
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
  } else if (lingua === 'It') {
    traduzione = {
      apartment: 'Appartamento',
      evaluation: 'Valutazione immobiliare',
      testoIntroduttivo:
        "Gentile Cliente,\nLa ringraziamo per la richiesta di valutazione del Suo immobile.\nCome promesso, abbiamo effettuato una valutazione dell'immobile analizzando i dati storici, i dati di mercato e le caratteristiche particolari dell'appartamento.\n",
      wohnlageText:
        'Classificazione della zona secondo il Berliner Mietspiegel 2019:',
      bodenrichtwertText:
        'Sviluppo del valore del terreno negli ultimi 3 anni:',
      is24Text: 'Risultati valutazione del portale immobiliare ImmoScout24:',
      immobilienpreisText:
        'Prezzi reali di vendita di immobili simili negli ultimi 2 anni:',
      mietspiegelText: 'Media degli affitti di zona:',
      mietendeckelText:
        'Secondo la nuova normativa sul tetto massimo degli affitti, il netto ammonta a  ',
      datiIntroText:
        'Per la valutazione abbiamo preso in considerazione i seguenti dati:',
      testoFinale:
        "Naturalmente abbiamo corretto la valutazione tenendo conto delle particolarità dell'immobile e siamo giunti a una valutazione di",
      testoFinale2:
        "Ci auguriamo che la nostra valutazione rispecchi le Sue aspettative. Siamo a Sua disposizione nel caso in cui desiderasse mettere in vendita l'immobile.\n\nCordiali saluti,",

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
  } else if (lingua === 'En') {
    traduzione = {
      apartment: 'Apartment',
      evaluation: 'Property Evaluation',
      testoIntroduttivo:
        'Dear Customer,\nthank you very much for your review request.\nAs promised, we have carried out a valuation of the property by analysing historical data, market data and features.\n',
      wohnlageText:
        'Area classification according to the Berliner Mietspiegel 2019:',
      bodenrichtwertText: 'Value of the land in the last 3 years:',
      is24Text: 'Evaluation result from the Real Estate portal ImmoScout24:',
      immobilienpreisText:
        'Actual selling prices of similar properties in the last 2 years:',
      mietspiegelText: 'Average renting prices:',
      mietendeckelText:
        'According to the new rentig law, the max net rent price is ',
      datiIntroText:
        'For the valuation we have taken the following data into account:',
      testoFinale:
        'We considered of course the features of the apartment and we calculated a selling price of',
      testoFinale2:
        'We hope, our evaluation match your expectations. We are at your disposal if you wish to sell the apartment.\n\nBest regards',

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

  const frontPage = (textArray, fontSize) => {
    doc.addImage(imgLogo, 'JPEG', 140, 10, 55, 12, undefined, 'FAST');
    const pdfWidth = doc.internal.pageSize.getWidth();

    if (oggetto.downloadURLsCover) {
      const cover = new Image();
      cover.src = oggetto.downloadURLsCover;
      const imgProps = doc.getImageProperties(cover);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(cover, 'JPEG', -100, 30, pdfWidth * 1.7, pdfHeight * 1.7);
    }

    // Titolo
    let lineYPos = 180;
    doc.setDrawColor(18, 52, 86);
    doc.setLineWidth(70);
    doc.line(0, 200, pdfWidth, 200);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(fontSize);
    doc.setFontType('normal');
    textArray.forEach((text, i) => {
      doc.text(text, 15, lineYPos);
      if (i === 0 || i === 5) {
        lineYPos += 20;
      } else {
        lineYPos += 10;
      }
    });
  };

  const wohnlagePage = () => {
    let wohnlage = () => {
      if (lingua === 'De') {
        if (evaluation.wohnlage === 'simple_area') return 'Einfache Lage';
        if (evaluation.wohnlage === 'average_area') return 'Mittlere Lage';
        if (evaluation.wohnlage === 'good_area') return 'Gute Lage';
        if (evaluation.wohnlage === 'top_area') return 'Sehr gute Lage';
      }
      if (lingua === 'En') {
        if (evaluation.wohnlage === 'simple_area') return 'Simple area';
        if (evaluation.wohnlage === 'average_area') return 'Average area';
        if (evaluation.wohnlage === 'good_area') return 'Good area';
        if (evaluation.wohnlage === 'top_area') return 'Very good area';
      }

      if (lingua === 'It') {
        if (evaluation.wohnlage === 'simple_area') return 'Zona semplice';
        if (evaluation.wohnlage === 'average_area') return 'Zona media';
        if (evaluation.wohnlage === 'good_area') return 'Zona buona';
        if (evaluation.wohnlage === 'top_area') return 'Zona ottima';
      }
    };
    doc.text(`${traduzione.wohnlageText} ${wohnlage()}`, xPos, yPos + 100);

    const wohnlageImg = new Image();
    wohnlageImg.src = evaluation.wohnlageSnippet;
    const imgProps = doc.getImageProperties(wohnlageImg);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(
      wohnlageImg,
      'JPEG',
      xPos,
      yPos + 110,
      pdfWidth * 0.8,
      pdfHeight * 0.8
    );
  };

  const introPage = () => {
    doc.addPage();
    doc.addImage(imgLogo, 'JPEG', 140, 10, 55, 12, undefined, 'FAST');
    doc.setTextColor(0, 0, 0);

    const text =
      evaluation[`testoIntroduttivo${lingua}`] || traduzione.testoIntroduttivo;

    const lines = doc.setFontSize(12).splitTextToSize(text, 180);
    doc.text(xPos, 45 + 12 / 110, lines);

    doc.text(traduzione.datiIntroText, xPos, yPos + 85);
    wohnlagePage();
  };

  const bodenrichtwertPage = () => {
    doc.addPage();
    doc.addImage(imgLogo, 'JPEG', 140, 10, 55, 12, undefined, 'FAST');
    yPos += 15;
    doc.text(traduzione.bodenrichtwertText, xPos, yPos);
    yPos += 15;

    evaluation.bodenrichtwertSnippet.map((img, i) => {
      const brwImg = new Image();
      brwImg.src = img;
      const imgProps = doc.getImageProperties(brwImg);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.text(moment().subtract(i, 'years').format('YYYY'), xPos, yPos);
      doc.addImage(
        brwImg,
        'JPEG',
        xPos + 30,
        yPos,
        pdfWidth * 0.5,
        pdfHeight * 0.5
      );
      yPos += pdfHeight * 0.5 + 10;
    });
  };

  const is24Page = () => {
    doc.addPage();
    doc.addImage(imgLogo, 'JPEG', 140, 10, 55, 12, undefined, 'FAST');
    yPos = 30;
    doc.text(traduzione.is24Text, xPos, yPos);
    yPos += 15;

    const is24Img = new Image();
    is24Img.src = evaluation.is24Snippet;
    const imgProps = doc.getImageProperties(is24Img);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(is24Img, 'JPEG', xPos, yPos, pdfWidth * 0.8, pdfHeight * 0.8);
  };

  const immobilienpreisPage = () => {
    doc.addPage();
    doc.addImage(imgLogo, 'JPEG', 140, 10, 55, 12, undefined, 'FAST');
    yPos = 30;
    doc.text(traduzione.immobilienpreisText, xPos, yPos);
    yPos += 15;

    const immobilienpreisImg = new Image();
    immobilienpreisImg.src = evaluation.immobilienPreisSnippet;
    const imgProps = doc.getImageProperties(immobilienpreisImg);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(
      immobilienpreisImg,
      'JPEG',
      xPos,
      yPos,
      pdfWidth * 0.8,
      pdfHeight * 0.8
    );
  };

  const mietspiegelPage = () => {
    doc.addPage();
    doc.addImage(imgLogo, 'JPEG', 140, 10, 55, 12, undefined, 'FAST');
    yPos = 30;
    doc.text(traduzione.mietspiegelText, xPos, yPos);
    yPos += 15;

    const mietspiegelImg = new Image();
    mietspiegelImg.src = evaluation.mietspiegelSnippet;
    const imgProps = doc.getImageProperties(mietspiegelImg);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(
      mietspiegelImg,
      'JPEG',
      xPos,
      yPos,
      pdfWidth * 0.8,
      pdfHeight * 0.8
    );
    yPos += pdfHeight * 0.8 + 20;

    evaluation.mietendeckel &&
      doc.text(
        `${traduzione.mietendeckelText}${numeral(
          evaluation.mietendeckel / 100
        ).format('0,0.00')}€/m2.`,
        xPos,
        yPos
      );
  };

  const resultPage = () => {
    doc.addPage();
    doc.addImage(imgLogo, 'JPEG', 140, 10, 55, 12, undefined, 'FAST');
    yPos = 30;
    const text =
      evaluation[`testoFinale${lingua}`] ||
      `${traduzione.testoFinale} ${numeral(
        (evaluation.result * parseFloat(oggetto.m2.replace(/,/, '.'), 10)) / 100
      ).format('0,0.00')} €.\n\n${traduzione.testoFinale2}\n\n${utente.name}\n${
        utente.email
      }\n${utente.telefon}`;

    const lines = doc.setFontSize(12).splitTextToSize(text, 180);
    doc.text(xPos, 45 + 12 / 110, lines);
  };

  //RENDER
  frontPage(
    [
      traduzione.evaluation,
      // traduzione.property,
      `${oggetto.via} ${oggetto.numeroCivico}`,
      `${oggetto.cap} ${oggetto.citta}`,
    ],
    22
  );

  introPage();
  bodenrichtwertPage();
  is24Page();
  immobilienpreisPage();
  mietspiegelPage();
  resultPage();

  //Quarta di copertina
  doc.addPage();
  let ceoList = ``;
  ceo.forEach((ceo, i) => {
    if (i < 1) {
      ceoList += `${ceo.name}`;
    } else {
      ceoList += `, ${ceo.name}`;
    }
  });
  frontPage(
    [
      `${firma.name} ${firma.name2 && ` - ${firma.name2}`}`,
      `${firma.adresse}, ${firma.plz} ${firma.stadt}`,
      `Telefon: ${firma.telefon} - Telefax: ${firma.fax}`,
      `${firma.website} - ${firma.email}`,
      `Geschäftsführer: ${ceoList}`,
    ],
    14
  );

  //Save
  doc.save(
    `${traduzione.evaluation} - ${oggetto.via} ${oggetto.numeroCivico}.pdf`
  );
};

export default evaluationPdf;
