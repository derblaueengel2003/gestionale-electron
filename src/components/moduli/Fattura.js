import jsPDF from 'jspdf'
import { imgLogo } from './ImageLogo'
import { ivdLogo } from './IvdLogo'
import moment from 'moment'
import numeral from 'numeral'

export const doc = new jsPDF("p", "mm", "a4")

export const fattura = (cliente, cliente2, numeroFattura, dataFattura, note, oggetto, prezzoDiVendita, dataRogito, amount, dataPrenotazione, dealType, acquirente, acquirente2) => {
    const acqNome = `${cliente.titolo} ${cliente.nome} ${cliente.cognome}`
    const acqInd = `${cliente.indirizzo} ${cliente.indirizzo2 && cliente.indirizzo2}`
    const acqNome2 = cliente2 && `${cliente2.titolo} ${cliente2.nome} ${cliente2.cognome}`
    const acqInd2 = cliente2 && `${cliente2.indirizzo} ${cliente2.indirizzo2 && cliente2.indirizzo2}`
    const formulaSaluto = cliente.titolo === 'Herr' ? `Sehr geehrter Herr` : `Sehr geehrte Frau`
    const formulaSaluto2 = cliente2 && cliente2.titolo === 'Herr' ? `Sehr geehrter Herr` : `Sehr geehrte Frau`    
    const provvPercentuale = numeral((amount / prezzoDiVendita)).format('0.00%')
    let corpoFattura
    if (dealType === 'Kauf Eigentumswohnung') {
        corpoFattura = (`entsprechend dem rechtskräftigen Kaufvertrag vom ${moment(dataRogito).format('DD.MM.YYYY')} sowie unserer Vereinbarung berechnen wir Ihnen für unsere Nachweis- bzw. Vermittlungstätigkeit zum Verkauf des Objekts ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}:`)

    } else if (dealType === 'APH') {
        corpoFattura = `Objekt: ${oggetto.via} ${oggetto.numeroCivico}, ${oggetto.cap} ${oggetto.citta}
Wohneinheit: ${oggetto.numeroAppartamento}
Makler: Angelo Arboscello
Kunde: ${acquirente.nome} ${acquirente.cognome}
Notartermin: ${moment(dataRogito).format('DD.MM.YYYY')}`
    } else {
        corpoFattura = `hier ist die Rechnung für Ihre gewählten Leistungen.


${note}`
    }
    


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
    doc.text('Angelo Arboscello', 149, 44)
    doc.setFontType("normal")
    doc.text('angelo.arboscello@m2square.eu', 149, 48)
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

    //Intestazione fattura
    doc.setFontSize(12)
    doc.setFontType("normal")
    doc.text(cliente.ditta, 11, 38)
    doc.text(acqNome, 11, 43)
    doc.text(acqInd, 11, 48)
    doc.text(`${cliente.cap} ${cliente.comune}`, 11, 53)
    doc.text(`${cliente.nazione}`, 11, 58)
    cliente2 && doc.text(acqNome2, 11, 65)
    cliente2 && doc.text(acqInd2, 11, 70)
    cliente2 && doc.text(`${cliente2.cap} ${cliente2.comune}`, 11, 75)
    cliente2 && doc.text(`${cliente2.nazione}`, 11, 80)

    //Dati fattura
    doc.setFontType("bold")
    doc.text(`Rechnung Nr. ${numeroFattura}`, 11, 96)
    doc.setFontType("normal")
    doc.text(`Berlin, ${moment(dataFattura).format('DD.MM.YYYY')}`, 100, 96)
 
    //Corpo
    dealType !== 'APH' && doc.text(`${formulaSaluto} ${cliente.cognome},`, 11, 110)
    cliente2 && doc.text(`${formulaSaluto2} ${cliente2.cognome},`, 11, 115)
    const lines = doc.setFontSize(12).splitTextToSize(corpoFattura, 150);
    dealType !== 'APH' ? doc.text(11, 125 + 12 / 110, lines) : doc.text(corpoFattura, 11, 110)   
    
    if (dealType !== '') {
        //Cifre
        doc.text(`${provvPercentuale} Provision aus Kaufpreis ${numeral(prezzoDiVendita / 100).format('0,0[.]00 $')}`, 11, 150)
        doc.text(numeral(amount / 100).format('0,0[.]00 $'), 120, 150)
        doc.text('+19% MWSt.', 11, 155)
        doc.text(numeral(amount / 10000 * 19).format('0,0[.]00 $'), 120, 155)
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.2);
        doc.line(11, 157, 146, 157);
        doc.text('Rechnungsbetrag inkl. 19% MWSt.', 11, 162)
        doc.setFontType("bold")
        doc.text(numeral((amount / 100) * 1.19).format('0,0[.]00 $'), 120, 162)

        //Zeitraum
        doc.setFontType("normal")
        doc.text(`Leistungszeitraum: vom ${moment(dataPrenotazione).format('DD.MM.YYYY')} bis ${moment(dataRogito).format('DD.MM.YYYY')}`, 11, 175)

    }
   
    //Coordinate pagamento
    doc.text('Bitte zahlen Sie den Rechnungsbetrag innerhalb von 8 Tagen ohne Abzug per', 11, 185)
    doc.text('Überweisung auf unser Konto:', 11, 190)
    doc.text('Kontoinhaber: Arboscello & Fornari GbR', 11, 200)
    doc.text('Bankinstitut: Landesbank Berlin - Berliner Sparkasse', 11, 205)
    doc.text('IBAN: DE14 1005 0000 0190 4232 18', 11, 210)
    doc.text('BIC: BELADEBEXXX', 11, 215)
    doc.text(`Verwendungszweck: Rechnung Nr. ${numeroFattura}`, 11, 220)

    //Saluti finali
    doc.text('Sollten Sie noch Fragen haben, so stehen wir auch weiterhin gerne zur Verfügung.', 11, 230)
    doc.text('Mit freundlichen Grüßen', 11, 240)
    doc.text('Angelo Arboscello', 11, 245)

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

    doc.save(`Rechnung ${numeroFattura.replace('/', '-')} ${cliente.cognome}.pdf`)
}