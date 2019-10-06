import jsPDF from 'jspdf'
import { imgLogo } from './ImageLogo'
import { ivdLogo } from './IvdLogo'
import moment from 'moment'
import numeral from 'numeral'

export const doc = new jsPDF("p", "mm", "a4")

export const notarDatenblatt = (acquirente, acquirente2, venditore, venditore2, oggetto, notaio, verwalter, belastungsVollmacht, prezzoDiVendita) => {

    doc.addImage(imgLogo, 'JPEG', 130, 10, 55, 12)

    //linea rossa
    doc.setDrawColor(145, 0, 0);
    doc.setLineWidth(7);
    doc.line(146, 26, 199, 26);
    //linea grigia
    doc.setDrawColor(143, 143, 143);
    doc.setLineWidth(7);
    doc.line(11, 26, 146, 26);

    //Header
    doc.setFontSize(11)
    doc.setTextColor(255, 255, 255)
    doc.setFont("times")
    doc.setFontType("bold")
    doc.text('m2Square - Arboscello & Fornari GbR – Kastanienallee 2, 10435 Berlin', 15, 27)

    //riquadro contatti
    doc.setDrawColor(215, 240, 245);
    doc.setLineWidth(70);
    doc.line(146, 70, 199, 70);
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.setFontType("normal")
    doc.text('Ihr Ansprechpartner', 149, 40)
    doc.setFontType("bold")
    doc.text('Annalisa Fornari', 149, 44)
    doc.setFontType("normal")
    doc.text('info@m2square.eu', 149, 48)
    doc.text('Tel. +49 (30) 54482958', 149, 52)
    doc.text('www.m2square.eu', 149, 56)
    doc.setFontType("bold")
    doc.text('Öffnungszeiten', 149, 68)
    doc.setFontType("normal")
    doc.text('Mo.-Fr. 10:00 bis 17:00 Uhr', 149, 72)
    doc.setFontType("bold")
    doc.text('Arboscello & Fornari GbR', 149, 84)
    doc.setFontType("normal")
    doc.text('Immobilienmakler', 149, 88)
    doc.text('Kastanienallee 2', 149, 92)
    doc.text('10435 Berlin', 149, 96)
    doc.text('Deutschland', 149, 100)

   if (notaio) {
       //Intestazione Datenblatt
       doc.setFontSize(12)
       doc.setFontType("normal")
       doc.text(notaio.ditta, 11, 38)
       doc.text(`${notaio.titolo} ${notaio.nome} ${notaio.cognome}`, 11, 43)
       doc.text(`${notaio.indirizzo} ${notaio.indirizzo2}`, 11, 48)
       doc.text(`${notaio.cap} ${notaio.comune}`, 11, 53)
   }


    //Data e titolo
    doc.setFontSize(14)
    doc.setFontType("bold")
    doc.text(`Datenblatt zur Vorbereitung eines Kaufvertragsentwurfs`, 11, 70)

    //Objekt
    doc.setFontSize(14)
    doc.setFontType("bold")
    doc.text(`Objekt`, 11, 85)
    doc.setFontSize(12)
    doc.setFontType("normal")
    doc.text(`Adresse: ${oggetto.via} ${oggetto.numeroCivico}, ${oggetto.cap} ${oggetto.citta}`, 11, 90)
    doc.text(`WE Nr. ${oggetto.numeroAppartamento}`, 11, 95)
    oggetto.grundbuch !== '' && doc.text(`Grundbuch von ${oggetto.grundbuch}, Blatt Nr. ${oggetto.grundbuchBlatt}`, 11, 100)
    doc.text(`m2: ${oggetto.m2}`, 11, 105)
    doc.text(`Etage: ${oggetto.piano}`, 11, 110)
    doc.text(`Status: ${oggetto.stato}`, 11, 115)
    oggetto.stato === 'vermietet' && doc.text(`Kaltmiete: ${numeral(oggetto.affittoNetto / 100).format('0,0[.]00 $')}`, 11, 120)
    doc.text(`Wohngeld: ${numeral(oggetto.wohngeld / 100).format('0,0[.]00 $')}`, 11, 125)
    doc.text(`Kaufpreis: ${numeral(prezzoDiVendita / 100).format('0,0[.]00 $')}`, 11, 130)
    doc.text(`Belastungsvollmacht: ${belastungsVollmacht ? `Ja` : `Nein`}`, 11, 135)
    oggetto.mobilio && doc.text(`Einrichtung: siehe Liste`, 11, 140)

    //Verkäufer
    doc.setFontSize(14)
    doc.setFontType("bold")
    doc.text(`Verkäufer`, 11, 150)
    doc.setFontSize(12)
    doc.setFontType("normal")
    doc.text(`${venditore.titolo} ${venditore.nome} ${venditore.cognome} ${venditore.ditta && ` - Firma: ${venditore.ditta}`}`, 11, 155)
    doc.text(`${venditore.indirizzo} ${venditore.cap} ${venditore.comune}, ${venditore.nazione}`, 11, 160)
    doc.text(`Tel.: ${venditore.telefono1} - E-Mail: ${venditore.email}`, 11, 165)
    venditore2 && doc.text(`${venditore2.titolo} ${venditore2.nome} ${venditore2.cognome} ${venditore2.ditta && ` - Firma: ${venditore2.ditta}`}`, 11, 172)
    venditore2 && doc.text(`${venditore2.indirizzo} ${venditore2.cap} ${venditore2.comune}, ${venditore2.nazione}`, 11, 177)
    venditore2 && doc.text(`Tel.: ${venditore2.telefono1} - E-Mail: ${venditore2.email}`, 11, 182)
   
    let asse = 175
    if (venditore2) {
        asse = 192
    }

    //Käufer
    doc.setFontSize(14)
    doc.setFontType("bold")
    doc.text(`Käufer`, 11, asse)
    doc.setFontSize(12)
    doc.setFontType("normal")
    doc.text(`${acquirente.titolo} ${acquirente.nome} ${acquirente.cognome} ${acquirente.ditta && ` - Firma: ${acquirente.ditta}`}`, 11, asse + 5)
    doc.text(`${acquirente.indirizzo} ${acquirente.cap} ${acquirente.comune}, ${acquirente.nazione}`, 11, asse + 10)
    doc.text(`Tel.: ${acquirente.telefono1} - E-Mail: ${acquirente.email}`, 11, asse + 15)
    acquirente2 && doc.text(`${acquirente2.titolo} ${acquirente2.nome} ${acquirente2.cognome} ${acquirente2.ditta && ` - Firma: ${acquirente2.ditta}`}`, 11, asse + 22)
    acquirente2 && doc.text(`${acquirente2.indirizzo} ${acquirente2.cap} ${acquirente2.comune}, ${acquirente2.nazione}`, 11, asse + 27)
    acquirente2 && doc.text(`Tel.: ${acquirente2.telefono1} - E-Mail: ${acquirente2.email}`, 11, asse + 32)
    
    if (acquirente2) {
        asse += 15
    }

    //Verwalter
    verwalter && doc.setFontSize(14)
    verwalter && doc.setFontType("bold")
    verwalter && doc.text(`Verwalter`, 11, asse + 25)
    verwalter && doc.setFontSize(12)
    verwalter &&  doc.setFontType("normal")
    verwalter && doc.text(verwalter.ditta, 11, asse + 30)
    verwalter && doc.text(`${verwalter.titolo} ${verwalter.nome}, ${verwalter.cognome}`, 11, asse + 35)
    verwalter && doc.text(`${verwalter.indirizzo}, ${verwalter.cap} ${verwalter.comune}`, 11, asse + 40)
    verwalter && doc.text(`Tel.: ${verwalter.telefono1} - E-Mail: ${verwalter.email}`, 11, asse + 45)

    //Footer
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.2);
    doc.line(11, 267, 11, 282);
    doc.line(50, 267, 50, 282);
    doc.line(110, 267, 110, 282);
    // doc.line(160, 267, 160, 282); 
    doc.setFontSize(10)
    doc.setTextColor(143, 143, 143)
    doc.text('Geschäftsführer:', 12, 270)
    doc.text('Angelo Arboscello', 12, 274)
    doc.text('Annalisa Fornari', 12, 278)
    doc.text('Telefon: +49 (30) 54482958', 51, 270)
    doc.text('Telefax: +49 (30) 54482959', 51, 274)
    doc.text('E-Mail: info@m2square.eu', 51, 278)
    doc.text('Web: www.m2square.eu', 51, 282)
    doc.text('Steuernummer: 31/429/00375', 111, 270)
    doc.text('Ust.-IdNr.: DE278130647', 111, 274)

    //Logo IVD
    doc.addImage(ivdLogo, 'JPEG', 161, 270, 30, 12)

    if (oggetto.mobilio) {
        doc.addPage()
        doc.addImage(imgLogo, 'JPEG', 130, 10, 55, 12)

        //linea rossa
        doc.setDrawColor(145, 0, 0);
        doc.setLineWidth(7);
        doc.line(146, 26, 199, 26);
        //linea grigia
        doc.setDrawColor(143, 143, 143);
        doc.setLineWidth(7);
        doc.line(11, 26, 146, 26);

        //Header
        doc.setFontSize(11)
        doc.setTextColor(255, 255, 255)
        doc.setFont("times")
        doc.setFontType("bold")
        doc.text('m2Square - Arboscello & Fornari GbR – Kastanienallee 2, 10435 Berlin', 15, 27)

        //Objekt
        doc.setTextColor(0, 0, 0)
        doc.setFontSize(12)
        doc.setFontType("bold")
        doc.text(`Einrichtung`, 11, 38)
        doc.setFontSize(10)
        doc.setFontType("normal")
        doc.text(oggetto.mobilio, 11, 43)


    }
    doc.save(`Notar Danteblatt.pdf`)
}