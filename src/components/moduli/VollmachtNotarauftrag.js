import jsPDF from 'jspdf';
import { imgLogo } from './img/ImageLogo';
import { formattaPrezzo } from '../common/utils';
import { imgData } from './img/vollmachtNotarauftragBG';
import {
  ditta,
  nomeCompleto,
  indirizzoCompleto,
  indirizzoOggetto,
  contattiFirma,
} from '../common/utils';

export const vollmachtNotarauftrag = (
  acquirente,
  acquirente2,
  venditore,
  venditore2,
  oggetto,
  notaio,
  prezzoDiVendita,
  firma
) => {
  const doc = new jsPDF();

  const dittaAcquirente = ditta(acquirente);
  const nomeCompletoAcquirente = nomeCompleto(acquirente);
  const indirizzoCompletoAcquirente = indirizzoCompleto(acquirente);
  const nomeCompletoAcquirente2 = nomeCompleto(acquirente2);
  const indirizzoCompletoAcquirente2 = indirizzoCompleto(acquirente2);
  const nomeCompletoVenditore = nomeCompleto(venditore);
  const indirizzoCompletoVenditore = indirizzoCompleto(venditore);
  const nomeCompletoVenditore2 = nomeCompleto(venditore2);
  const indirizzoCompletoVenditore2 = indirizzoCompleto(venditore2);

  doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);
  doc.addImage(imgLogo, 'JPEG', 165, 10, 35, 8);
  doc.setFontSize(12);

  if (!venditore2) {
    if (ditta(venditore).length > 0) {
      doc.text(ditta(venditore), 30, 36);
      doc.text(nomeCompletoVenditore, 30, 41);
      doc.text(indirizzoCompletoVenditore, 30, 46);
    } else {
      doc.text(nomeCompletoVenditore, 30, 36);
      doc.text(indirizzoCompletoVenditore, 30, 41);
    }
  } else {
    if (ditta(venditore).length > 0) {
      doc.text(ditta(venditore), 30, 36);
      doc.text(
        `1. ${nomeCompletoVenditore}, ${indirizzoCompletoVenditore}`,
        30,
        41
      );
      doc.text(
        `2. ${nomeCompletoVenditore2}, ${indirizzoCompletoVenditore2}`,
        30,
        46
      );
    } else {
      doc.text(
        `1. ${nomeCompletoVenditore}, ${indirizzoCompletoVenditore}`,
        30,
        36
      );
      doc.text(
        `2. ${nomeCompletoVenditore2}, ${indirizzoCompletoVenditore2}`,
        30,
        41
      );
    }
  }

  if (!acquirente2) {
    if (dittaAcquirente.length > 0) {
      doc.text(dittaAcquirente, 30, 63);
      doc.text(nomeCompletoAcquirente, 30, 68);
      doc.text(indirizzoCompletoAcquirente, 30, 73);
    } else {
      doc.text(nomeCompletoAcquirente, 30, 63);
      doc.text(indirizzoCompletoAcquirente, 30, 68);
    }
  } else {
    if (dittaAcquirente.length > 0) {
      doc.text(dittaAcquirente, 30, 63);
      doc.text(
        `1. ${nomeCompletoAcquirente}, ${indirizzoCompletoAcquirente}`,
        30,
        68
      );
      doc.text(
        `2. ${nomeCompletoAcquirente2}, ${indirizzoCompletoAcquirente2}`,
        30,
        73
      );
    } else {
      doc.text(
        `1. ${nomeCompletoAcquirente}, ${indirizzoCompletoAcquirente}`,
        30,
        63
      );
      doc.text(
        `2. ${nomeCompletoAcquirente2}, ${indirizzoCompletoAcquirente2}`,
        30,
        68
      );
    }
  }

  doc.text(
    `Rif. ID: ${oggetto.rifId} - ${
      oggetto.tipologia
        ? oggetto.tipologia === 'Eigentumswohnung' ||
          oggetto.tipologia === 'property_apt'
          ? 'Eigentumswohnung'
          : 'Gewerbe'
        : ''
    }`,
    30,
    111
  );
  doc.text(`Kaufpreis: ${formattaPrezzo(prezzoDiVendita, true)}`, 30, 116);
  doc.text(indirizzoOggetto(oggetto), 30, 135);
  oggetto.grundbuch &&
    doc.text(
      `Grundbuch von ${oggetto.grundbuch} - Blatt: ${oggetto.grundbuchBlatt}`,
      30,
      157
    );

  doc.text(contattiFirma(firma), 30, 185);

  if (notaio) {
    doc.text(ditta(notaio), 30, 217);
    doc.text(nomeCompleto(notaio), 30, 222);
    doc.text(indirizzoCompleto(notaio), 30, 227);
  }

  doc.save(`${acquirente.cognome} Vollmacht Notarauftrag.pdf`);
};
