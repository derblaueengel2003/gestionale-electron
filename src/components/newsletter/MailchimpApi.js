import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import axios from 'axios';
import moment from 'moment';
import numeral from 'numeral';
import { storeActions } from '../../store/configureStore';
import CollectionItem from '../common/collectionItem';

class MailchimpAPI extends React.Component {
  constructor(props) {
    super(props);
    this.state = { spinner: false };
  }

  bodyText = (text, textToCut) => {
    const textToCutIndex = text.indexOf(textToCut);

    if (textToCutIndex === -1) return text;

    return text.substring(0, textToCutIndex);
  };

  sendNewsletter = (lingua) => {
    this.setState({
      spinner: true,
    });
    const { oggArray, newsletter } = this.props;
    const settings = {};
    if (lingua === 'De') {
      moment.locale('de');
      settings.language = 'de';
      settings.list_id = 'd760eee60a';
      settings.subject_line = 'Neue Immobilienangebote';
      settings.title = `Neswletter vom ${moment().format('DD MMMM, YYYY')}`;
      settings.from_name = 'm2Square - Immobilienmakler in Berlin';
      settings.btn_text = 'Details';
      settings.homepage = 'https://www.m2square.eu/';
      settings.ivdText = ''; //`Das IVD-Logo ist ein Gütesiegel für Kompetenz und Professionalität`;
      settings.footerText = `<em>Copyright © *|CURRENT_YEAR|* *|LIST:COMPANY|*, alle Rechte vorbehalten.</em><br>
*|IFNOT:ARCHIVE_PAGE|* *|LIST:DESCRIPTION|*<br>
<br>
<strong>Unsere Adresse:</strong><br>
*|HTML:LIST_ADDRESS_HTML|* *|END:IF|*<br>
<br>
Möchten Sie den E-Mail-Empfang ändern?<br>
Sie können&nbsp;<a href="*|UPDATE_PROFILE|*">die Einstellungen ändern</a>&nbsp;oder&nbsp;<a href="*|UNSUB|*">diese E-Mail abbestellen</a>.<br>
<br>`;
      settings.whyText = ``;
      settings.browserText = 'Schau Dir diese Newsletter im Browser';
      settings.aphTitle = 'Pflegeimmobilien als Kapitalanlage';
      settings.aphLink =
        'https://www.m2square.eu/sichere-vermoegensaufbau-mit-pflegeimmobilien/';
      settings.aphText = 'Sichere Vermögensaufbau mit Pflegeimmobilien';
      settings.evaluationLink =
        'https://www.m2square.eu/wohnung-verkaufen-in-berlin-kostenlose-bewertung-fuer-ihre-immobilie/';
      settings.evaluationLinkText = 'Jetzt starten!';

      settings.evaluationText = `<h1 class="null" style="text-align: center;">Möchten Sie Ihre Wohnung in Berlin verkaufen?</h1><h2 class="null" style="text-align: center;">Wir bieten Ihnen eine kostenlose Bewertung an!</h2>
&nbsp;<h3 class="null">1. Geben Sie die Eckdaten ein</h3><h4 class="null" style="text-align: left;"><span class="mc-toc-title">Füllen Sie das Formular auf unsere Webseite. Es dauert nur 2 Minuten.</span></h4>
&nbsp;<h3 class="null">2. Wir treffen uns vor Ort</h3><h4 class="null">Wir melden uns bei Ihnen um einen Besichtigungstermin zu vereinbaren.</h4>
&nbsp;<h3 class="null">3. Sie bekommen unsere Bewertung</h3><h4 class="null">In 1-2 Tagen bekommen Sie von uns eine kostenlose und unverbindliche Bewertung per E-Mail.</h4>`;
    } else if (lingua === 'En') {
      moment.locale('en');
      settings.language = 'en';
      settings.list_id = '12a251d472';
      settings.subject_line = 'New Real Estate Offers';
      settings.title = `Neswletter of ${moment().format('DD MMMM, YYYY')}`;
      settings.from_name = 'm2Square - Berlin Real Estate';
      settings.btn_text = 'Details';
      settings.homepage = 'https://www.m2square.eu/en';
      settings.ivdText = ''; //`The IVD logo is a seal of quality for competence and professionalism.<br /><br />m2Square is a member of the IVD, the most important German real estate association, and is committed to its guidelines.`;
      settings.footerText = `<em>Copyright © *|CURRENT_YEAR|* *|LIST:COMPANY|*, all rights reserved.</em><br>
*|IFNOT:ARCHIVE_PAGE|* *|LIST:DESCRIPTION|*<br>
<br>
<strong>Our Address is:</strong><br>
*|HTML:LIST_ADDRESS_HTML|* *|END:IF|*<br>
<br>
Do you want to change the way you receive this email?<br>
You can&nbsp;<a href="*|UPDATE_PROFILE|*">edit your settings</a>&nbsp;or&nbsp;<a href="*|UNSUB|*">unsubscribe from this list</a>.<br>
<br>`;
      settings.whyText = `<strong>Why m2Square?</strong><br />- we are certified professionals<br />- our fees are clear, competitive and VAT included<br />- we don't ask for unjustified advances<br />- we carefully select the properties<br />- we speak your language<br />`;
      settings.browserText = 'Watch this message in your browser';
      settings.aphTitle = 'Invest in nursing homes in Germany';
      settings.aphLink =
        'https://www.m2square.eu/en/invest-in-nursing-homes-in-germany-2/';
      settings.aphText = 'Good investment opportunity with 20 years contracts';
      settings.evaluationLink =
        'https://www.m2square.eu/en/sell-apartment-in-berlin-property-price-evaluation/';
      settings.evaluationLinkText = "Let's start!";

      settings.evaluationText = `<h1 class="null" style="text-align: center;">Do you want to sell your property in Berlin?</h1><h2 class="null" style="text-align: center;">We offer you a free evaluation!</h2>
&nbsp;<h3 class="null">1. Give us all relevant information</h3><h4 class="null" style="text-align: left;"><span class="mc-toc-title">Fill the form on our Website. It only takes 2 minutes.</span></h4>
&nbsp;<h3 class="null">2. We meet at the property</h3><h4 class="null">We will contact you and make an appointment for a visit of the Property.</h4>
&nbsp;<h3 class="null">3. You will receive our Evaluation</h3><h4 class="null">In 1 to 2 days we will send you our Evaluation per email.</h4>`;
    } else if (lingua === 'It') {
      moment.locale('it');
      settings.language = 'it';
      // settings.list_id = 'a475609b0e'; //per testare
      settings.list_id = 'd1a1c90e81';
      settings.subject_line = 'Occasioni immobiliari a Berlino';
      settings.title = `Neswletter del ${moment().format('DD MMMM, YYYY')}`;
      settings.from_name = 'm2Square - Occasioni immobiliari';
      settings.btn_text = 'Dettagli';
      settings.homepage = 'https://www.m2square.eu/it';
      settings.ivdText = ''; //`Il logo IVD è un marchio di qualità per competenza e professionalità.<br><br>m2Square è membro della IVD, la più importante associazione immobiliare tedesca, e si impegna nel rispetto delle sue linee guida.`;
      settings.footerText = `<em>Copyright © *|CURRENT_YEAR|* *|LIST:COMPANY|*, Tutti i diritti riservati.</em><br>
*|IFNOT:ARCHIVE_PAGE|* *|LIST:DESCRIPTION|*<br>
<br>
<strong>Il nostro indirizzo è:</strong><br>
*|HTML:LIST_ADDRESS_HTML|* *|END:IF|*<br>
<br>
Vuoi modificare la ricezione di queste email?<br>
Puoi&nbsp;<a href="*|UPDATE_PROFILE|*">aggiornare le tue preferenze</a>&nbsp;o&nbsp;<a href="*|UNSUB|*">cancellare l'iscrizione a questa lista</a>.<br>
<br>`;
      settings.whyText = `<strong>Perché m2Square?</strong><br>- perché siamo professionisti seri e certificati<br>- perché non gonfiamo i prezzi degli immobili<br>- perché le nostre commissioni sono chiare, competitive e IVA inclusa<br>- perché non richiediamo anticipi ingiustificati<br>- perché selezioniamo gli appartamenti da offrirvi`;
      settings.browserText = 'Guarda questa email dal tuo browser';
      settings.aphTitle =
        'Investimenti sicuri in Residenze per Anziani in Germania';
      settings.aphLink =
        'https://www.m2square.eu/it/investire-risparmi-in-modo-sicuro/';
      settings.aphText =
        'Rendite garantite per 20 anni. Formula senza pensieri';
      settings.evaluationLink =
        'https://www.m2square.eu/it/vendere-appartamento-a-berlino-valutazione-gratuita/';
      settings.evaluationLinkText = 'Iniziamo!';

      settings.evaluationText = `<h1 class="null" style="text-align: center;">Desidera vendere il Suo immobile a Berlino?</h1><h2 class="null" style="text-align: center;">Le offriamo una valutazione gratuita e senza impegno!</h2>
&nbsp;<h3 class="null">1. Ci indichi le caratteristiche principali</h3><h4 class="null" style="text-align: left;"><span class="mc-toc-title">Compili il nostro modulo online. Ci vogliono solo 2 minuti.</span></h4>
&nbsp;<h3 class="null">2. Organizziamo una visita</h3><h4 class="null">La contatteremo per concordare una visita dell'immobile.</h4>
&nbsp;<h3 class="null">3. Le inviamo la valutazione</h3><h4 class="null">Nel giro di due giorni riceverà la nostra valutazione per email.</h4>`;
    }

    let htmlOggetti;
    if (oggArray.length === 1) {
      settings.template = 'single';
      const oggetto = { ...oggArray[0] };
      const immagini = [...oggetto.downloadURLs[0]];
      htmlOggetti = `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <!-- NAME: 1:3 COLUMN - FULL WIDTH -->
        <!--[if gte mso 15]>
        <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>*|MC:SUBJECT|*</title>
        
    <style type="text/css">
		p{
			margin:10px 0;
			padding:0;
		}
		table{
			border-collapse:collapse;
		}
		h1,h2,h3,h4,h5,h6{
			display:block;
			margin:0;
			padding:0;
		}
		img,a img{
			border:0;
			height:auto;
			outline:none;
			text-decoration:none;
		}
		body,#bodyTable,#bodyCell{
			height:100%;
			margin:0;
			padding:0;
			width:100%;
		}
		.mcnPreviewText{
			display:none !important;
		}
		#outlook a{
			padding:0;
		}
		img{
			-ms-interpolation-mode:bicubic;
		}
		table{
			mso-table-lspace:0pt;
			mso-table-rspace:0pt;
		}
		.ReadMsgBody{
			width:100%;
		}
		.ExternalClass{
			width:100%;
		}
		p,a,li,td,blockquote{
			mso-line-height-rule:exactly;
		}
		a[href^=tel],a[href^=sms]{
			color:inherit;
			cursor:default;
			text-decoration:none;
		}
		p,a,li,td,body,table,blockquote{
			-ms-text-size-adjust:100%;
			-webkit-text-size-adjust:100%;
		}
		.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
			line-height:100%;
		}
		a[x-apple-data-detectors]{
			color:inherit !important;
			text-decoration:none !important;
			font-size:inherit !important;
			font-family:inherit !important;
			font-weight:inherit !important;
			line-height:inherit !important;
		}
		.templateContainer{
			max-width:600px !important;
		}
		a.mcnButton{
			display:block;
		}
		.mcnImage,.mcnRetinaImage{
			vertical-align:bottom;
		}
		.mcnTextContent{
			word-break:break-word;
		}
		.mcnTextContent img{
			height:auto !important;
		}
		.mcnDividerBlock{
			table-layout:fixed !important;
		}
	/*
	@tab Page
	@section Background Style
	@tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
	*/
		body,#bodyTable{
			/*@editable*/background-color:#FAFAFA;
		}
	/*
	@tab Page
	@section Background Style
	@tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
	*/
		#bodyCell{
			/*@editable*/border-top:0;
		}
	/*
	@tab Page
	@section Heading 1
	@tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
	@style heading 1
	*/
		h1{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:26px;
			/*@editable*/font-style:normal;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:125%;
			/*@editable*/letter-spacing:normal;
			/*@editable*/text-align:left;
		}
	/*
	@tab Page
	@section Heading 2
	@tip Set the styling for all second-level headings in your emails.
	@style heading 2
	*/
		h2{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:22px;
			/*@editable*/font-style:normal;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:125%;
			/*@editable*/letter-spacing:normal;
			/*@editable*/text-align:left;
		}
	/*
	@tab Page
	@section Heading 3
	@tip Set the styling for all third-level headings in your emails.
	@style heading 3
	*/
		h3{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:20px;
			/*@editable*/font-style:normal;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:125%;
			/*@editable*/letter-spacing:normal;
			/*@editable*/text-align:left;
		}
	/*
	@tab Page
	@section Heading 4
	@tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
	@style heading 4
	*/
		h4{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:18px;
			/*@editable*/font-style:normal;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:125%;
			/*@editable*/letter-spacing:normal;
			/*@editable*/text-align:left;
		}
	/*
	@tab Preheader
	@section Preheader Style
	@tip Set the background color and borders for your email's preheader area.
	*/
		#templatePreheader{
			/*@editable*/background-color:#FAFAFA;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:cover;
			/*@editable*/border-top:0;
			/*@editable*/border-bottom:0;
			/*@editable*/padding-top:9px;
			/*@editable*/padding-bottom:9px;
		}
	/*
	@tab Preheader
	@section Preheader Text
	@tip Set the styling for your email's preheader text. Choose a size and color that is easy to read.
	*/
		#templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
			/*@editable*/color:#656565;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:12px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:left;
		}
	/*
	@tab Preheader
	@section Preheader Link
	@tip Set the styling for your email's preheader links. Choose a color that helps them stand out from your text.
	*/
		#templatePreheader .mcnTextContent a,#templatePreheader .mcnTextContent p a{
			/*@editable*/color:#656565;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	/*
	@tab Header
	@section Header Style
	@tip Set the background color and borders for your email's header area.
	*/
		#templateHeader{
			/*@editable*/background-color:#FFFFFF;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:cover;
			/*@editable*/border-top:0;
			/*@editable*/border-bottom:0;
			/*@editable*/padding-top:9px;
			/*@editable*/padding-bottom:0;
		}
	/*
	@tab Header
	@section Header Text
	@tip Set the styling for your email's header text. Choose a size and color that is easy to read.
	*/
		#templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:16px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:left;
		}
	/*
	@tab Header
	@section Header Link
	@tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
	*/
		#templateHeader .mcnTextContent a,#templateHeader .mcnTextContent p a{
			/*@editable*/color:#007C89;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	/*
	@tab Body
	@section Body Style
	@tip Set the background color and borders for your email's body area.
	*/
		#templateBody{
			/*@editable*/background-color:#FFFFFF;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:cover;
			/*@editable*/border-top:0;
			/*@editable*/border-bottom:0;
			/*@editable*/padding-top:9px;
			/*@editable*/padding-bottom:9px;
		}
	/*
	@tab Body
	@section Body Text
	@tip Set the styling for your email's body text. Choose a size and color that is easy to read.
	*/
		#templateBody .mcnTextContent,#templateBody .mcnTextContent p{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:16px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:left;
		}
	/*
	@tab Body
	@section Body Link
	@tip Set the styling for your email's body links. Choose a color that helps them stand out from your text.
	*/
		#templateBody .mcnTextContent a,#templateBody .mcnTextContent p a{
			/*@editable*/color:#007C89;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	/*
	@tab Columns
	@section Column Style
	@tip Set the background color and borders for your email's columns.
	*/
		#templateColumns{
			/*@editable*/background-color:#ffffff;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:cover;
			/*@editable*/border-top:0;
			/*@editable*/border-bottom:2px solid #EAEAEA;
			/*@editable*/padding-top:0;
			/*@editable*/padding-bottom:9px;
		}
	/*
	@tab Columns
	@section Column Text
	@tip Set the styling for your email's column text. Choose a size and color that is easy to read.
	*/
		#templateColumns .columnContainer .mcnTextContent,#templateColumns .columnContainer .mcnTextContent p{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:16px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:left;
		}
	/*
	@tab Columns
	@section Column Link
	@tip Set the styling for your email's column links. Choose a color that helps them stand out from your text.
	*/
		#templateColumns .columnContainer .mcnTextContent a,#templateColumns .columnContainer .mcnTextContent p a{
			/*@editable*/color:#007C89;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	/*
	@tab Footer
	@section Footer Style
	@tip Set the background color and borders for your email's footer area.
	*/
		#templateFooter{
			/*@editable*/background-color:#fafafa;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:cover;
			/*@editable*/border-top:0;
			/*@editable*/border-bottom:0;
			/*@editable*/padding-top:9px;
			/*@editable*/padding-bottom:9px;
		}
	/*
	@tab Footer
	@section Footer Text
	@tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
	*/
		#templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
			/*@editable*/color:#656565;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:12px;
			/*@editable*/line-height:150%;
			/*@editable*/text-align:center;
		}
	/*
	@tab Footer
	@section Footer Link
	@tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
	*/
		#templateFooter .mcnTextContent a,#templateFooter .mcnTextContent p a{
			/*@editable*/color:#656565;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	@media only screen and (min-width:768px){
		.templateContainer{
			width:600px !important;
		}

}	@media only screen and (max-width: 480px){
		body,table,td,p,a,li,blockquote{
			-webkit-text-size-adjust:none !important;
		}

}	@media only screen and (max-width: 480px){
		body{
			width:100% !important;
			min-width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.columnWrapper{
			max-width:100% !important;
			width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnRetinaImage{
			max-width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImage{
			width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
			max-width:100% !important;
			width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnBoxedTextContentContainer{
			min-width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageGroupContent{
			padding:9px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
			padding-top:9px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
			padding-top:18px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageCardBottomImageContent{
			padding-bottom:9px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageGroupBlockInner{
			padding-top:0 !important;
			padding-bottom:0 !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageGroupBlockOuter{
			padding-top:9px !important;
			padding-bottom:9px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnTextContent,.mcnBoxedTextContentColumn{
			padding-right:18px !important;
			padding-left:18px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
			padding-right:18px !important;
			padding-bottom:0 !important;
			padding-left:18px !important;
		}

}	@media only screen and (max-width: 480px){
		.mcpreview-image-uploader{
			display:none !important;
			width:100% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 1
	@tip Make the first-level headings larger in size for better readability on small screens.
	*/
		h1{
			/*@editable*/font-size:22px !important;
			/*@editable*/line-height:125% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 2
	@tip Make the second-level headings larger in size for better readability on small screens.
	*/
		h2{
			/*@editable*/font-size:20px !important;
			/*@editable*/line-height:125% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 3
	@tip Make the third-level headings larger in size for better readability on small screens.
	*/
		h3{
			/*@editable*/font-size:18px !important;
			/*@editable*/line-height:125% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 4
	@tip Make the fourth-level headings larger in size for better readability on small screens.
	*/
		h4{
			/*@editable*/font-size:16px !important;
			/*@editable*/line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Boxed Text
	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px.
	*/
		.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
			/*@editable*/font-size:14px !important;
			/*@editable*/line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Preheader Visibility
	@tip Set the visibility of the email's preheader on small screens. You can hide it to save space.
	*/
		#templatePreheader{
			/*@editable*/display:block !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Preheader Text
	@tip Make the preheader text larger in size for better readability on small screens.
	*/
		#templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
			/*@editable*/font-size:14px !important;
			/*@editable*/line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Header Text
	@tip Make the header text larger in size for better readability on small screens.
	*/
		#templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
			/*@editable*/font-size:16px !important;
			/*@editable*/line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Body Text
	@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px.
	*/
		#templateBody .mcnTextContent,#templateBody .mcnTextContent p{
			/*@editable*/font-size:16px !important;
			/*@editable*/line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Column Text
	@tip Make the column text larger in size for better readability on small screens. We recommend a font size of at least 16px.
	*/
		#templateColumns .columnContainer .mcnTextContent,#templateColumns .columnContainer .mcnTextContent p{
			/*@editable*/font-size:16px !important;
			/*@editable*/line-height:150% !important;
		}

}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Footer Text
	@tip Make the footer content text larger in size for better readability on small screens.
	*/
		#templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
			/*@editable*/font-size:14px !important;
			/*@editable*/line-height:150% !important;
		}

}</style></head>
    <body>
        <!--*|IF:MC_PREVIEW_TEXT|*-->
        <!--[if !gte mso 9]><!----><span class="mcnPreviewText" style="display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;">*|MC_PREVIEW_TEXT|*</span><!--<![endif]-->
        <!--*|END:IF|*-->
        <center>
            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
                <tr>
                    <td align="center" valign="top" id="bodyCell">
                        <!-- BEGIN TEMPLATE // -->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td align="center" valign="top" id="templatePreheader">
                                    <!--[if (gte mso 9)|(IE)]>
                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                    <tr>
                                    <td align="center" valign="top" width="600" style="width:600px;">
                                    <![endif]-->
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                        <tr>
                                            <td valign="top" class="preheaderContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
              	<!--[if mso]>
				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				<tr>
				<![endif]-->
			    
				<!--[if mso]>
				<td valign="top" width="600" style="width:600px;">
				<![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px; text-align: center;">
                        
                            <a href="*|ARCHIVE|*" target="_blank">${
                              settings.browserText
                            }</a>
                        </td>
                    </tr>
                </tbody></table>
				<!--[if mso]>
				</td>
				<![endif]-->
                
				<!--[if mso]>
				</tr>
				</table>
				<![endif]-->
            </td>
        </tr>
    </tbody>
</table></td>
                                        </tr>
                                    </table>
                                    <!--[if (gte mso 9)|(IE)]>
                                    </td>
                                    </tr>
                                    </table>
                                    <![endif]-->
                                </td>
                            </tr>
                            <tr>
                                <td align="center" valign="top" id="templateHeader">
                                    <!--[if (gte mso 9)|(IE)]>
                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                    <tr>
                                    <td align="center" valign="top" width="600" style="width:600px;">
                                    <![endif]-->
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                        <tr>
                                            <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
    <tbody class="mcnImageBlockOuter">
            <tr>
                <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                        <tbody><tr>
                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">
                                
                                    <a href="${
                                      settings.homepage
                                    }" title="" class="" target="_blank">
                                        <img align="center" alt="" src="https://gallery.mailchimp.com/ed6049ff183a2d35eb41f16c2/images/33f6de11-5ea6-4513-b065-5a3a8386b061.png" width="564" style="max-width:650px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage">
                                    </a>
                                
                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
    </tbody>
</table></td>
                                        </tr>
                                    </table>
                                    <!--[if (gte mso 9)|(IE)]>
                                    </td>
                                    </tr>
                                    </table>
                                    <![endif]-->
                                </td>
                            </tr>
                            <tr>
                                <td align="center" valign="top" id="templateBody">
                                    <!--[if (gte mso 9)|(IE)]>
                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                    <tr>
                                    <td align="center" valign="top" width="600" style="width:600px;">
                                    <![endif]-->
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                        <tr>
                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
              	<!--[if mso]>
				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				<tr>
				<![endif]-->
			    
				<!--[if mso]>
				<td valign="top" width="600" style="width:600px;">
				<![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">
                        
                            <h1 style="text-align: center;">${
                              settings.subject_line
                            }</h1>

<div style="text-align: center;"><br>
<strong>${settings.title}</strong><br>
<br>
&nbsp;&nbsp;<a href="${
        settings.homepage
      }" target="_blank">www.m2square.eu</a>&nbsp;-&nbsp;<a href="mailto:info@m2square.eu" target="_blank">info@m2square.eu</a><br>
Tel. +49 30 54482958 - WhatsApp: <a href="https://wa.me/message/XBJ5OH4JPQC4F1" target="_blank">m2square</a></div>

                        </td>
                    </tr>
                </tbody></table>
				<!--[if mso]>
				</td>
				<![endif]-->
                
				<!--[if mso]>
				</tr>
				</table>
				<![endif]-->
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
              	<!--[if mso]>
				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				<tr>
				<![endif]-->
			    
				<!--[if mso]>
				<td valign="top" width="600" style="width:600px;">
				<![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">
                        
                            <h1 style="text-align: center;">${
                              lingua === 'It'
                                ? oggetto.titolo
                                : oggetto[`titolo${lingua}`]
                            }</h1>

                        </td>
                    </tr>
                </tbody></table>
				<!--[if mso]>
				</td>
				<![endif]-->
                
				<!--[if mso]>
				</tr>
				</table>
				<![endif]-->
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
    <tbody class="mcnImageBlockOuter">
            <tr>
                <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                        <tbody><tr>
                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">
                                
                                    <a href="${
                                      oggetto[`link${lingua}`]
                                    }" title="" class="" target="_blank">
                                        <img align="center" alt="" src="${
                                          oggetto.downloadURLsCover[0]
                                        }" width="564" style="max-width:1520px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage">
                                    </a>
                                
                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
              	<!--[if mso]>
				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				<tr>
				<![endif]-->
			    
				<!--[if mso]>
				<td valign="top" width="600" style="width:600px;">
				<![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">
                       ${
                         lingua !== 'It'
                           ? lingua !== 'En'
                             ? //  ? oggetto.descrizioneDe.substring(
                               //      0,
                               //      oggetto.descrizioneDe.indexOf(
                               //        'Provisionshinweis:'
                               //      )
                               //    )
                               this.bodyText(
                                 oggetto.descrizioneDe,
                                 'Provisionshinweis:'
                               )
                             : //  : oggetto.descrizioneEn.substring(
                               //      0,
                               //      oggetto.descrizioneEn.indexOf(
                               //        'Commission note:'
                               //      )
                               //    )
                               this.bodyText(
                                 oggetto.descrizioneEn,
                                 'Commission note:'
                               )
                           : //  : oggetto.descrizione.substring(
                             //      0,
                             //      oggetto.descrizione.indexOf(
                             //        'Nota sulla commissione:'
                             //      )
                             //    )
                             this.bodyText(
                               oggetto.descrizione,
                               'Nota sulla commissione:'
                             )
                       }
                        </td>
                    </tr>
                </tbody></table>
				<!--[if mso]>
				</td>
				<![endif]-->
                
				<!--[if mso]>
				</tr>
				</table>
				<![endif]-->
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageGroupBlock">
    <tbody class="mcnImageGroupBlockOuter">
        
            <tr>
                <td valign="top" style="padding:9px" class="mcnImageGroupBlockInner">
                    
                    <table align="left" width="273" border="0" cellpadding="0" cellspacing="0" class="mcnImageGroupContentContainer">
                            <tbody><tr>
                                <td class="mcnImageGroupContent" valign="top" style="padding-left: 9px; padding-top: 0; padding-bottom: 0;">
                                
                                    <a href="${
                                      oggetto[`link${lingua}`]
                                    }" title="" class="" target="_blank">
                                        <img alt="" src="${
                                          immagini[0]
                                        }" width="264" style="max-width:1200px; padding-bottom: 0;" class="mcnImage">
                                    </a>
                                
                                </td>
                            </tr>
                        </tbody></table>
                    
                    <table align="right" width="273" border="0" cellpadding="0" cellspacing="0" class="mcnImageGroupContentContainer">
                            <tbody><tr>
                                <td class="mcnImageGroupContent" valign="top" style="padding-right: 9px; padding-top: 0; padding-bottom: 0;">
                                
                                    <a href="${
                                      oggetto[`link${lingua}`]
                                    }" title="" class="" target="_blank">
                                        <img alt="" src="${
                                          immagini[1]
                                        }" width="264" style="max-width:1205px; padding-bottom: 0;" class="mcnImage">
                                    </a>
                                
                                </td>
                            </tr>
                        </tbody></table>
                    
                </td>
            </tr>
        
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
              	<!--[if mso]>
				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				<tr>
				<![endif]-->
			    
				<!--[if mso]>
				<td valign="top" width="600" style="width:600px;">
				<![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">
                        
                           
                        </td>
                    </tr>
                </tbody></table>
				<!--[if mso]>
				</td>
				<![endif]-->
                
				<!--[if mso]>
				</tr>
				</table>
				<![endif]-->
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageGroupBlock">
    <tbody class="mcnImageGroupBlockOuter">
        
            <tr>
                <td valign="top" style="padding:9px" class="mcnImageGroupBlockInner">
                    
                    <table align="left" width="273" border="0" cellpadding="0" cellspacing="0" class="mcnImageGroupContentContainer">
                            <tbody><tr>
                                <td class="mcnImageGroupContent" valign="top" style="padding-left: 9px; padding-top: 0; padding-bottom: 0;">
                                
                                    <a href="${
                                      oggetto[`link${lingua}`]
                                    }" title="" class="" target="_blank">
                                        <img alt="" src="${
                                          immagini[2]
                                        }" width="264" style="max-width:1200px; padding-bottom: 0;" class="mcnImage">
                                    </a>
                                
                                </td>
                            </tr>
                        </tbody></table>
                    
                    <table align="right" width="273" border="0" cellpadding="0" cellspacing="0" class="mcnImageGroupContentContainer">
                            <tbody><tr>
                                <td class="mcnImageGroupContent" valign="top" style="padding-right: 9px; padding-top: 0; padding-bottom: 0;">
                                
                                    <a href="${
                                      oggetto[`link${lingua}`]
                                    }" title="" class="" target="_blank">
                                        <img alt="" src="${
                                          immagini[3]
                                        }" width="264" style="max-width:1204px; padding-bottom: 0;" class="mcnImage">
                                    </a>
                                
                                </td>
                            </tr>
                        </tbody></table>
                    
                </td>
            </tr>
        
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
              	<!--[if mso]>
				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				<tr>
				<![endif]-->
			    
				<!--[if mso]>
				<td valign="top" width="600" style="width:600px;">
				<![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">
                        
                        </td>
                    </tr>
                </tbody></table>
				<!--[if mso]>
				</td>
				<![endif]-->
                
				<!--[if mso]>
				</tr>
				</table>
				<![endif]-->
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock" style="min-width:100%;">
    <tbody class="mcnButtonBlockOuter">
        <tr>
            <td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top" align="center" class="mcnButtonBlockInner">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-radius: 3px;background-color: #910000;">
                    <tbody>
                        <tr>
                            <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Arial; font-size: 16px; padding: 15px;">
                                <a class="mcnButton " title="Scopri di più" href="${
                                  oggetto[`link${lingua}`]
                                }" target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;">${
        settings.btn_text
      }</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table></td>
                                        </tr>
                                    </table>
                                    <!--[if (gte mso 9)|(IE)]>
                                    </td>
                                    </tr>
                                    </table>
                                    <![endif]-->
                                </td>
                            </tr>
                            <tr>
                                <td align="center" valign="top" id="templateColumns">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                        <tr>
                                            <td valign="top">
                                                <!--[if (gte mso 9)|(IE)]>
                                                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                                <tr>
                                                <td align="center" valign="top" width="200" style="width:200px;">
                                                <![endif]-->
                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="200" class="columnWrapper">
                                                    <tr>
                                                        <td valign="top" class="columnContainer"></td>
                                                    </tr>
                                                </table>
                                                <!--[if (gte mso 9)|(IE)]>
                                                </td>
                                                <td align="center" valign="top" width="200" style="width:200px;">
                                                <![endif]-->
                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="200" class="columnWrapper">
                                                    <tr>
                                                        <td valign="top" class="columnContainer"></td>
                                                    </tr>
                                                </table>
                                                <!--[if (gte mso 9)|(IE)]>
                                                </td>
                                                <td align="center" valign="top" width="200" style="width:200px;">
                                                <![endif]-->
                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="200" class="columnWrapper">
                                                    <tr>
                                                        <td valign="top" class="columnContainer"></td>
                                                    </tr>
                                                </table>
                                                <!--[if (gte mso 9)|(IE)]>
                                                </td>
                                                </tr>
                                                </table>
                                                <![endif]-->
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" valign="top" id="templateFooter">
                                    <!--[if (gte mso 9)|(IE)]>
                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                    <tr>
                                    <td align="center" valign="top" width="600" style="width:600px;">
                                    <![endif]-->
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                        <tr>
                                            <td valign="top" class="footerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
              	<!--[if mso]>
				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				<tr>
				<![endif]-->
			    
				<!--[if mso]>
				<td valign="top" width="600" style="width:600px;">
				<![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #FFFFFF;font-family: &quot;Lucida Sans Unicode&quot;, &quot;Lucida Grande&quot;, sans-serif;text-align: left;">
                        
                            ${settings.evaluationText}

                        </td>
                    </tr>
                </tbody></table>
				<!--[if mso]>
				</td>
				<![endif]-->
                
				<!--[if mso]>
				</tr>
				</table>
				<![endif]-->
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock" style="min-width:100%;">
    <tbody class="mcnButtonBlockOuter">
        <tr>
            <td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top" align="center" class="mcnButtonBlockInner">
                <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-radius: 3px;background-color: #910000;">
                    <tbody>
                        <tr>
                            <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Arial; font-size: 16px; padding: 15px;">
                                <a class="mcnButton " title="Iniziamo!" href="${
                                  settings.evaluationLink
                                }" target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;">${
        settings.evaluationLinkText
      }</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
    <tbody class="mcnDividerBlockOuter">
        <tr>
            <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
                <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 5px solid #EAEAEA;">
                    <tbody><tr>
                        <td>
                            <span></span>
                        </td>
                    </tr>
                </tbody></table>
<!--            
                <td class="mcnDividerBlockInner" style="padding: 18px;">
                <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
-->
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
              	<!--[if mso]>
				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				<tr>
				<![endif]-->
			    
				<!--[if mso]>
				<td valign="top" width="600" style="width:600px;">
				<![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #FFFFFF;font-family: &quot;Lucida Sans Unicode&quot;, &quot;Lucida Grande&quot;, sans-serif;text-align: left;">
                        
                            <h1 class="null" style="text-align: center;">${
                              settings.aphTitle
                            }</h1>

<h2 class="null" style="text-align: center;">${settings.aphText}</h2>

                        </td>
                    </tr>
                </tbody></table>
				<!--[if mso]>
				</td>
				<![endif]-->
                
				<!--[if mso]>
				</tr>
				</table>
				<![endif]-->
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageCardBlock">
    <tbody class="mcnImageCardBlockOuter">
        <tr>
            <td class="mcnImageCardBlockInner" valign="top" style="padding-top:9px; padding-right:18px; padding-bottom:9px; padding-left:18px;">
                
<table align="right" border="0" cellpadding="0" cellspacing="0" class="mcnImageCardBottomContent" width="100%" style="background-color: #404040;">
    <tbody><tr>
        <td class="mcnImageCardBottomImageContent" align="left" valign="top" style="padding-top:0px; padding-right:0px; padding-bottom:0; padding-left:0px;">
        
            
            <a href="${settings.aphLink}" title="" class="" target="_blank">
            

            <img alt="" src="https://gallery.mailchimp.com/ed6049ff183a2d35eb41f16c2/images/5a998e8f-08b7-4205-9679-cf97ef685173.jpg" width="564" style="max-width:600px;" class="mcnImage">
            </a>
        
        </td>
    </tr>
    <tr>
        <td class="mcnTextContent" valign="top" style="padding: 9px 18px;color: #F2F2F2;font-family: Helvetica;font-size: 14px;font-weight: normal;text-align: center;" width="546">
            
        </td>
    </tr>
</tbody></table>




            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
    <tbody class="mcnDividerBlockOuter">
        <tr>
            <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
                <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 2px solid #EAEAEA;">
                    <tbody><tr>
                        <td>
                            <span></span>
                        </td>
                    </tr>
                </tbody></table>
<!--            
                <td class="mcnDividerBlockInner" style="padding: 18px;">
                <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
-->
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
              	<!--[if mso]>
				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				<tr>
				<![endif]-->
			    
				<!--[if mso]>
				<td valign="top" width="600" style="width:600px;">
				<![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">
                        
                            ${settings.whyText}
                        </td>
                    </tr>
                </tbody></table>
				<!--[if mso]>
				</td>
				<![endif]-->
                
				<!--[if mso]>
				</tr>
				</table>
				<![endif]-->
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCaptionBlock">
    <tbody class="mcnCaptionBlockOuter">
        <tr>
            <td class="mcnCaptionBlockInner" valign="top" style="padding:9px;">
                

<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageGroupBlock" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
    <tbody class="mcnImageGroupBlockOuter">
        
            <tr>
                <td valign="top" style="padding: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnImageGroupBlockInner">
                    
                    <table align="left" width="273" border="0" cellpadding="0" cellspacing="0" class="mcnImageGroupContentContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <tbody><tr>
                                <td class="mcnImageGroupContent" valign="top" style="padding-left: 9px;padding-top: 0;padding-bottom: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                
                                    <a href="mailto:annalisa.fornari@m2square.eu" title="" class="" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                        <img alt="" src="https://mcusercontent.com/ed6049ff183a2d35eb41f16c2/images/a716c862-d02a-4e55-8c81-395f01d3779f.jpg" width="264" style="max-width: 1200px;padding-bottom: 0;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;vertical-align: bottom;" class="mcnImage">
                                    </a>
                                
                                </td>
                            </tr>
                        </tbody></table>
                    
                    <table align="right" width="273" border="0" cellpadding="0" cellspacing="0" class="mcnImageGroupContentContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <tbody><tr>
                                <td class="mcnImageGroupContent" valign="top" style="padding-right: 9px;padding-top: 0;padding-bottom: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                
                                    
                                        <img alt="" src="https://gallery.mailchimp.com/ed6049ff183a2d35eb41f16c2/images/a6bfb36e-7b1c-421f-9016-459e0f052a29.jpg" width="264" style="max-width: 2821px;padding-bottom: 0;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;vertical-align: bottom;" class="mcnImage">
                                    
                                
                                </td>
                            </tr>
                        </tbody></table>
                    
                </td>
            </tr>
        
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
    <tbody class="mcnDividerBlockOuter">
        <tr>
            <td class="mcnDividerBlockInner" style="min-width: 100%; padding: 10px 18px 25px;">
                <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 2px solid #EEEEEE;">
                    <tbody><tr>
                        <td>
                            <span></span>
                        </td>
                    </tr>
                </tbody></table>
<!--            
                <td class="mcnDividerBlockInner" style="padding: 18px;">
                <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
-->
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
              	<!--[if mso]>
				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				<tr>
				<![endif]-->
			    
				<!--[if mso]>
				<td valign="top" width="600" style="width:600px;">
				<![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">
                        
                            ${settings.footerText}
*|IF:REWARDS|* *|HTML:REWARDS|* *|END:IF|*
                        </td>
                    </tr>
                </tbody></table>
				<!--[if mso]>
				</td>
				<![endif]-->
                
				<!--[if mso]>
				</tr>
				</table>
				<![endif]-->
            </td>
        </tr>
    </tbody>
</table></td>
                                        </tr>
                                    </table>
                                    <!--[if (gte mso 9)|(IE)]>
                                    </td>
                                    </tr>
                                    </table>
                                    <![endif]-->
                                </td>
                            </tr>
                        </table>
                        <!-- // END TEMPLATE -->
                    </td>
                </tr>
            </table>
        </center>
    </body>
</html>
`;
    } else {
      settings.template = 'multiple';
      htmlOggetti = `<tr>
                <td align="center" valign="top" id="templateColumns">
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    class="templateContainer"
                  >
                    <tr>
                      <td valign="top">
                      ${oggArray
                        .map(
                          (oggetto) => `<table
                          align="left"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          width="200"
                          class="columnWrapper"
                        >
                          <tr>
                            <td valign="top" class="columnContainer">
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                class="mcnCaptionBlock"
                              >
                                <tbody class="mcnCaptionBlockOuter">
                                  <tr>
                                    <td
                                      class="mcnCaptionBlockInner"
                                      valign="top"
                                      style="padding: 9px;"
                                    >
                                      <table
                                        align="left"
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="mcnCaptionBottomContent"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              class="mcnCaptionBottomImageContent"
                                              align="center"
                                              valign="top"
                                              style="padding: 0 9px 9px 9px;"
                                            >
                                              <a
                                                href=${oggetto[`link${lingua}`]}
                                                title=""
                                                class=""
                                                target="_blank"
                                              >
                                                <img
                                                  alt=""
                                                  src="${
                                                    oggetto.downloadURLsCover[0]
                                                  }"
                                                  width="164"
                                                  style="max-width: 1024px;"
                                                  class="mcnImage"
                                                />
                                              </a>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              class="mcnTextContent"
                                              valign="top"
                                              style="padding: 0 9px 0 9px;"
                                              width="164"
                                            >
                                              <strong
                                                >${
                                                  lingua !== 'It'
                                                    ? oggetto[`titolo${lingua}`]
                                                    : oggetto.titolo
                                                }
                                            </strong
                                              ><br />
                                              ${oggetto.m2} m2 -
                                              ${numeral(
                                                oggetto.kaufpreis / 100
                                              ).format('0,0[.]00 $')}<br />
                                              ID: ${oggetto.rifId}<br />
                                              ${oggetto.quartiere}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                class="mcnButtonBlock"
                                style="min-width: 100%;"
                              >
                                <tbody class="mcnButtonBlockOuter">
                                  <tr>
                                    <td
                                      style="
                                        padding-top: 0;
                                        padding-right: 18px;
                                        padding-bottom: 18px;
                                        padding-left: 18px;
                                      "
                                      valign="top"
                                      align="center"
                                      class="mcnButtonBlockInner"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                        class="mcnButtonContentContainer"
                                        style="
                                          border-collapse: separate !important;
                                          border-radius: 3px;
                                          background-color: #910000;
                                        "
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="center"
                                              valign="middle"
                                              class="mcnButtonContent"
                                              style="
                                                font-family: Arial;
                                                font-size: 16px;
                                                padding: 15px;
                                              "
                                            >
                                              <a
                                                class="mcnButton"
                                                title="Dettagli"
                                                href="${
                                                  oggetto[`link${lingua}`]
                                                }"
                                                target="_blank"
                                                style="
                                                  font-weight: bold;
                                                  letter-spacing: normal;
                                                  line-height: 100%;
                                                  text-align: center;
                                                  text-decoration: none;
                                                  color: #ffffff;
                                                "
                                                >${settings.btn_text}</a
                                              >
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                class="mcnDividerBlock"
                                style="min-width: 100%;"
                              >
                                <tbody class="mcnDividerBlockOuter">
                                  <tr>
                                    <td
                                      class="mcnDividerBlockInner"
                                      style="min-width: 100%; padding: 18px;"
                                    >
                                      <table
                                        class="mcnDividerContent"
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                        style="
                                          min-width: 100%;
                                          border-top: 2px solid #eaeaea;
                                        "
                                      >
                                        <tbody>
                                          <tr>
                                            <td>
                                              <span></span>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </table>`
                        )
                        .join(' ')}  

                      </td>
                    </tr>
                  </table>
                </td>
              </tr>`;
    }

    axios
      .post(`https://is24api.herokuapp.com/newsletter`, {
        htmlOggetti,
        settings,
      })
      .then((response) => {
        console.log(response);

        this.props.startEditNewsletter(newsletter.id, {
          [`mailchimpId${lingua}`]: { id: response.data.id },
        });
      })
      .catch((err) => console.log(err))
      .finally(this.setState({ spinner: false }));

    // console.log(htmlOggetti);
  };

  sendTestEmail = (campaignId) => {
    axios
      .post(`https://is24api.herokuapp.com/testemail`, { campaignId })
      .then((response) => console.log(response));
  };

  sendCampaignEmail = (campaign, field) => {
    axios
      .post(`https://is24api.herokuapp.com/sendemail`, {
        campaignId: campaign.id,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const dataSentNewsletter = moment().valueOf();
          this.props.startEditNewsletter(this.props.newsletter.id, {
            [field]: {
              ...campaign,
              dataSentNewsletter,
              sent: true,
            },
          });
        }
      });
  };

  render() {
    const { t, newsletter } = this.props;
    const btnColorDe = newsletter.mailchimpIdDe ? 'green' : 'blue';
    const btnColorEn = newsletter.mailchimpIdEn ? 'green' : 'blue';
    const btnColorIt = newsletter.mailchimpIdIt ? 'green' : 'blue';

    return (
      <div>
        {' '}
        {this.state.spinner ? (
          <div className='progress'>
            <div className='indeterminate'></div>
          </div>
        ) : (
          <div className='container section'>
            <ul className='collection  s12 m6'>
              <CollectionItem
                label={`Crea Newsletter`}
                action={() => {
                  this.sendNewsletter('It');
                }}
                icon={'send'}
                btnColor={btnColorIt}
              />
              {newsletter.mailchimpIdIt && (
                <CollectionItem
                  label={`Test Email ${t('italian')}`}
                  action={() => {
                    this.sendTestEmail(newsletter.mailchimpIdIt.id);
                  }}
                  icon={'send'}
                  btnColor={btnColorIt}
                />
              )}
              {newsletter.mailchimpIdIt ? (
                !newsletter.mailchimpIdIt.sent ? (
                  <CollectionItem
                    label={`Invia Newsletter`}
                    action={() => {
                      this.sendCampaignEmail(
                        newsletter.mailchimpIdIt,
                        'mailchimpIdIt'
                      );
                    }}
                    icon={'send'}
                    btnColor={btnColorIt}
                  />
                ) : (
                  <CollectionItem
                    label={`${t('newsletter_already_sent')} ${moment(
                      newsletter.mailchimpIdIt.dataSentNewsletter
                    ).format('DD MMMM, YYYY')}`}
                  />
                )
              ) : (
                ''
              )}
            </ul>

            <ul className='collection  s12 m6'>
              <CollectionItem
                label={`Newsletter herstellen`}
                action={() => {
                  this.sendNewsletter('De');
                }}
                icon={'send'}
                btnColor={btnColorDe}
              />
              {newsletter.mailchimpIdDe && (
                <CollectionItem
                  label={`Test Email ${t('german')}`}
                  action={() => {
                    this.sendTestEmail(newsletter.mailchimpIdDe.id);
                  }}
                  icon={'send'}
                  btnColor={btnColorDe}
                />
              )}
              {newsletter.mailchimpIdDe ? (
                !newsletter.mailchimpIdDe.sent ? (
                  <CollectionItem
                    label={`Newsletter senden`}
                    action={() => {
                      this.sendCampaignEmail(
                        newsletter.mailchimpIdDe,
                        'mailchimpIdDe'
                      );
                    }}
                    icon={'send'}
                    btnColor={btnColorDe}
                  />
                ) : (
                  <CollectionItem
                    label={`${t('newsletter_already_sent')} ${moment(
                      newsletter.mailchimpIdDe.dataSentNewsletter
                    ).format('DD MMMM, YYYY')}`}
                  />
                )
              ) : (
                ''
              )}
            </ul>

            <ul className='collection  s12 m6'>
              <CollectionItem
                label={`Build Newsletter`}
                action={() => {
                  this.sendNewsletter('En');
                }}
                icon={'send'}
                btnColor={btnColorEn}
              />
              {newsletter.mailchimpIdEn && (
                <CollectionItem
                  label={`Test Email ${t('english')}`}
                  action={() => {
                    this.sendTestEmail(newsletter.mailchimpIdEn.id);
                  }}
                  icon={'send'}
                  btnColor={btnColorEn}
                />
              )}
              {newsletter.mailchimpIdEn ? (
                !newsletter.mailchimpIdEn.sent ? (
                  <CollectionItem
                    label={`Send Newsletter Campaign`}
                    action={() => {
                      this.sendCampaignEmail(
                        newsletter.mailchimpIdEn,
                        'mailchimpIdEn'
                      );
                    }}
                    icon={'send'}
                    btnColor={btnColorEn}
                  />
                ) : (
                  <CollectionItem
                    label={`${t('newsletter_already_sent')} ${moment(
                      newsletter.mailchimpIdEn.dataSentNewsletter
                    ).format('DD MMMM, YYYY')}`}
                  />
                )
              ) : (
                ''
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startEditNewsletter: (id, newsletter) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'newsletters')
        .startEditAction(id, newsletter)
    ),
});

export default connect(
  undefined,
  mapDispatchToProps
)(withTranslation()(MailchimpAPI));
