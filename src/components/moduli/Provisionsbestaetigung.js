import jsPDF from 'jspdf';
import { imgLogo } from './img/ImageLogo';
import { ivdLogo } from './img/IvdLogo';
import { imgData } from './img/provisionsbestaetigungBG';
import {
  formattaPrezzo,
  contattiFirma,
  nomeCompleto,
  indirizzoCompleto,
  ditta,
} from '../common/utils';

export const creaPrenotazione = (
  acquirente,
  acquirente2,
  venditore,
  venditore2,
  oggetto,
  provvPercentuale,
  prezzoDiVendita,
  firma
) => {
  const doc = new jsPDF();

  doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);
  doc.addImage(imgLogo, 'JPEG', 28, 11, 35, 8);
  //Logo IVD
  doc.addImage(ivdLogo, 'JPEG', 165, 10, 30, 12, undefined, 'SLOW');

  //cancello frase che dice che gli abbiamo mandato exposé oggi. Metto una riga bianca sopra

  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(7);
  doc.line(20, 250, 200, 250);

  doc.setFontSize(10);
  // nuovo
  if (!acquirente2) {
    if (ditta(acquirente).length > 0) {
      doc.text(ditta(acquirente), 61, 30);
      doc.text(nomeCompleto(acquirente), 61, 35);
      doc.text(indirizzoCompleto(acquirente), 61, 40);
    } else {
      doc.text(nomeCompleto(acquirente), 61, 30);
      doc.text(indirizzoCompleto(acquirente), 61, 35);
    }
  } else {
    if (ditta(acquirente).length > 0) {
      doc.text(ditta(acquirente), 61, 30);
      doc.text(
        `1. ${nomeCompleto(acquirente)}, ${indirizzoCompleto(acquirente)}`,
        61,
        35
      );
      doc.text(
        `2. ${nomeCompleto(acquirente2)}, ${indirizzoCompleto(acquirente2)}`,
        61,
        40
      );
    } else {
      doc.text(
        `1. ${nomeCompleto(acquirente)}, ${indirizzoCompleto(acquirente)}`,
        61,
        30
      );
      doc.text(
        `2. ${nomeCompleto(acquirente2)}, ${indirizzoCompleto(acquirente2)}`,
        61,
        35
      );
    }
  }

  doc.text(contattiFirma(firma), 61, 52);
  doc.text(provvPercentuale, 93, 86);

  //Oggetto
  doc.setFontSize(10);
  doc.text(oggetto.rifId, 25, 136);

  doc.text(
    `${
      oggetto.tipologia
        ? oggetto.tipologia === 'property_apt'
          ? 'Eigentumswohnung'
          : 'Gewerbe'
        : 'Eigentumswohnung'
    }`,
    41,
    136
  );
  doc.text(
    `${
      oggetto.stato
        ? oggetto.stato === 'vacant' || oggetto.stato === 'leerstehend'
          ? 'leerstehend'
          : 'vermietet'
        : ''
    }`,
    41,
    141
  );
  doc.text(`Etage: ${oggetto.piano}`, 41, 146);
  doc.text(`m2: ${oggetto.m2}`, 41, 151);
  doc.text(`Kaufpreis: ${formattaPrezzo(prezzoDiVendita, true)}`, 41, 156);

  doc.text(`${oggetto.via} ${oggetto.numeroCivico}`, 95, 136);
  doc.text(
    `${
      oggetto.tipologia
        ? oggetto.tipologia === 'Eigentumswohnung' ||
          oggetto.tipologia === 'property_apt'
          ? 'WE'
          : 'TE'
        : 'WE'
    } ${oggetto.numeroAppartamento}`,
    95,
    141
  );
  doc.text(`${oggetto.cap} ${oggetto.citta}`, 95, 146);

  if (
    ditta(venditore).length > 25 ||
    indirizzoCompleto(venditore).length > 25 ||
    nomeCompleto(venditore).length > 25
  ) {
    doc.setFontSize(10);
  } else if (
    ditta(venditore).length > 50 ||
    indirizzoCompleto(venditore).length > 50 ||
    nomeCompleto(venditore).length > 50
  )
    doc.setFontSize(8);
  else {
    doc.setFontSize(12);
  }
  if (ditta(venditore).length > 0) {
    const venditoreAddress = `${ditta(venditore)} \n${nomeCompleto(
      venditore
    )} \n${venditore.indirizzo} ${
      venditore.indirizzo2 && venditore.indirizzo2
    }\n${venditore.cap} ${venditore.comune}\n${venditore.nazione}`;
    const lines = doc.splitTextToSize(venditoreAddress, 50);
    doc.text(148, 136, lines);
  } else {
    const venditoreAddress = `${nomeCompleto(venditore)} \n${
      venditore.indirizzo
    } ${venditore.indirizzo2 && venditore.indirizzo2}\n${venditore.cap} ${
      venditore.comune
    }\n${venditore.nazione}`;
    const lines = doc.splitTextToSize(venditoreAddress, 50);
    doc.text(148, 136, lines);
  }

  if (venditore2) {
    doc.text(ditta(venditore2), 148, 161);
    doc.text(nomeCompleto(venditore2), 148, 166);
    doc.text(venditore2.indirizzo, 148, 171);
    venditore2.indirizzo2 && doc.text(venditore2.indirizzo2, 148, 176);
    doc.text(`${venditore2.cap} ${venditore2.comune}`, 148, 181);
    doc.text(`${venditore2.nazione}`, 148, 186);
  }

  doc.save(`${acquirente.cognome} Provisionsbestätigung.pdf`);
};
