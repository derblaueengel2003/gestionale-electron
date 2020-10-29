import jsPDF from 'jspdf';

export const delegaDocumenti = (cliente, cliente2, oggetto, firma) => {
  const doc = new jsPDF('p', 'mm', 'a4');

  const nome = `${cliente.nome} ${cliente.cognome}`;
  const residenza = `${cliente.cap} ${cliente.comune}, ${cliente.indirizzo}, ${cliente.nazione}`;
  const nome2 = cliente2 && `${cliente2.nome} ${cliente2.cognome}`;
  const residenza2 =
    cliente2 &&
    `${cliente2.cap} ${cliente2.comune}, ${cliente2.indirizzo}, ${cliente2.nazione}`;

  const indirizzo = `${oggetto.cap} ${oggetto.citta}, ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}`;
  const m2Square = `${firma.name} ${firma.name2 && ` - ${firma.name2}`}`;

  let corpoFattura;
  if (cliente2) {
    corpoFattura = `hiermit bevollmächtigen wir ${nome} wohnhaft in ${residenza} und ${nome2} wonhaft in ${residenza2}

die Firma ${m2Square}, geschäftsansässig in ${firma.plz} ${firma.stadt}, ${firma.adresse},

für uns alle Unterlagen zu unser Immobilieneinheit in ${indirizzo} von der Hausverwaltung anzufordern und zu empfangen.

Die Firma ${m2Square} ist auch berechtigt, allgemeine Informationen über das Haus und die Eigentümergemeinschaft nachzufragen, insbesondere Informationen über Instandhaltungsrücklage und eventuelle Sonderumlagen.

Die Kosten der Bereitstellung und Versand der Unterlagen werden wir tragen. Gültig ist die Vollmacht bis auf Widerruf.
`;
  } else {
    corpoFattura = `hiermit bevollmächtige ich ${nome} wohnhaft in ${residenza}

die Firma ${m2Square}, geschäftsansässig in ${firma.plz} ${firma.stadt}, ${firma.adresse},

für mich alle Unterlagen zu meiner Immobilieneinheit in ${indirizzo} von der Hausverwaltung anzufordern und zu empfangen.

Die Firma ${m2Square} ist auch berechtigt, allgemeine Informationen über das Haus und die Eigentümergemeinschaft nachzufragen, insbesondere Informationen über Instandhaltungsrücklage und eventuelle Sonderumlagen.

Die Kosten der Bereitstellung und Versand der Unterlagen werde ich tragen. Gültig ist die Vollmacht bis auf Widerruf.
`;
  }

  doc.setFontSize(12);
  doc.setFontType('bold');
  doc.text('Vollmacht zum Empfang von Unterlagen', 25, 25);

  doc.setFontType('normal');
  doc.text('Sehr geehrte Damen und Herren,', 25, 35);

  const lines = doc.splitTextToSize(corpoFattura, 150);
  doc.text(25, 45 + 12 / 110, lines);

  doc.text('_________________________', 25, 150);
  doc.text('Ort und Datum', 36, 155);
  doc.text('_________________________', 120, 150);
  doc.text(nome, nome.length / 2 + 125, 155);
  cliente2 && doc.text('_________________________', 120, 170);
  cliente2 && doc.text(nome2, nome2.length / 2 + 125, 175);

  doc.save(`Vollmacht ${cliente.cognome}.pdf`);
};
