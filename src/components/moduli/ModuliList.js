import React from 'react';
import { Link } from 'react-router-dom';

const ModuliPage = () => (
  <div>
    <div className='page-header page-header-modulistica'>
      <div className='content-container'>
        <h1 className='page-header__title'>Modulistica</h1>
      </div>
    </div>

    <div className='content-container'>
      <div className='list-header-modulistica'>
        <div className='show-for-mobile'>Compila online</div>
        <div className='show-for-desktop'>Compila online</div>
      </div>
      <div className='list-item'>
        <Link
          className='print button button--secondary-modulistica'
          to='/makleralleinauftrag'
        >
          Makler-Allein-Auftrag
        </Link>
        <Link
          className='print button button--secondary-modulistica'
          to='/widerrufsbelehrung'
        >
          Widerrufsbelehrung
        </Link>
        <Link
          className='print button button--secondary-modulistica'
          to='/vollmachtunterlagen'
        >
          Vollmacht Empfang Unterlagen
        </Link>
      </div>

      <div className='list-header-modulistica'>
        <div className='show-for-mobile'>In bianco</div>
        <div className='show-for-desktop'>In bianco</div>
      </div>
      <div className='list-item'>
        <a href='./files/Provisionsbestaetigung.pdf' download>
          Provisionsbestätigung
        </a>
      </div>
      <div className='list-item'>
        <a href='./files/datenblatt.pdf' download>
          Datenblatt Pietzcker
        </a>
      </div>
      <div className='list-item'>
        <a href='./files/Allgemeine Vertragsbedingungen.pdf' download>
          Allgemeine Vertragsbedingungen
        </a>
      </div>
      <div className='list-item'>
        <a href='./files/Widerrufsbelehrung.pdf' download>
          Widerrufsbelehrung generico
        </a>
      </div>
      <div className='list-item'>
        <a href='./files/Verbraucherwiderrufsbelehrung.pdf' download>
          Verbraucherwiderrufsbelehrung da compilare
        </a>
      </div>
      <div className='list-item'>
        <a
          href='./files/Vollmacht zur Vorbereitung einer notariellen Kaufvertragsurkunde.pdf'
          download
        >
          Vollmacht zur Vorbereitung einer notariellen Kaufvertragsurkunde
        </a>
      </div>
      <div className='list-item'>
        <a href='./files/Makleralleinauftrag.pdf' download>
          Makler-Allein-Auftrag
        </a>
      </div>
      <div className='list-item'>
        <a
          href='./files/Makleralleinauftrag Erhebung-von-Daten-Pflichtigen-selbst-Transparenzpflicht-Artikel-13-DSGVO.pdf'
          download
        >
          Makleralleinauftrag DSGVO
        </a>
      </div>
      <div className='list-item'>
        <a
          href='./files/Maklervertrag mit Provision Erhebung-von-Daten-Pflichtigen-selbst-Transparenzpflicht-Artikel-13-DSGVO.pdf'
          download
        >
          Maklervertrag mit Provision DSGVO
        </a>
      </div>
      <div className='list-item'>
        <a
          href='./files/Maklervertrag ohne Provision Erhebung-von-Daten-Pflichtigen-selbst-Transparenzpflicht-Artikel-13-DSGVO.pdf'
          download
        >
          Maklervertrag ohne Provision DSGVO
        </a>
      </div>
      <div className='list-item'>
        <a
          href='./files/Mietvertrag Erhebung-von-Daten-Pflichtigen-selbst-Transparenzpflicht-Artikel-13-DSGVO.pdf'
          download
        >
          Mietvertrag DSGVO
        </a>
      </div>
      <div className='list-item'>
        <a href='./files/ACCENTRO_Beratungsprotokoll_DE.pdf' download>
          ACCENTRO_Beratungsprotokoll_DE
        </a>
      </div>
      <div className='list-item'>
        <a href='./files/ACCENTRO_Beratungsprotokoll_EN.pdf' download>
          ACCENTRO_Beratungsprotokoll_EN
        </a>
      </div>
      <div className='list-item'>
        <a href='./files/ACCENTRO_Datenschutz_DE.pdf' download>
          ACCENTRO_Datenschutz_DE
        </a>
      </div>
      <div className='list-item'>
        <a href='./files/ACCENTRO_Datenschutz_EN.pdf' download>
          ACCENTRO_Datenschutz_EN
        </a>
      </div>
      <div className='list-item'>
        <a href='./files/Accentro_Reservierungsvereinbarung_DE.pdf' download>
          Accentro_Reservierungsvereinbarung_DE
        </a>
      </div>
      <div className='list-item'>
        <a href='./files/Accentro_Reservierungsvereinbarung_EN.pdf' download>
          Accentro_Reservierungsvereinbarung_EN
        </a>
      </div>
      <div className='list-item'>
        <a href='./files/Dokumentationsbogen.docx' download>
          GWG Dokumentationsbogen Nat.Pers.
        </a>
      </div>
      <div className='list-item'>
        <a href='./files/DokumentationsbogenJP.docx' download>
          GWG Dokumentationsbogen Jur.Pers.
        </a>
      </div>
      <div className='list-item'>
        <a href='./files/meldebestaetigung.pdf' download>
          Mieter Meldebestätigung
        </a>
      </div>
      <div className='list-item'>
        <a href='./files/Mietschuldenfreiheitsbescheinigung.docx' download>
          Mietschuldenfreiheitsbescheinigung
        </a>
      </div>
      <div className='list-item'>
        <a href='./files/Übergabeprotokoll.doc' download>
          Übergabe-Protokoll Verkauf
        </a>
      </div>
      <div className='list-item'>
        <a href='./files/Wohnungsuebergabeprotokoll Mietwohnung.pdf' download>
          Übergabe-Protokoll Miete
        </a>
      </div>
      <div className='list-item'>
        <a href='./files/wohnungs_mietvertrag_1520411845.pdf' download>
          Mietvertrag Muster
        </a>
      </div>
      <div className='list-item'>
        <a href='./files/Aufnahme-ETW-Teileigentum.pdf' download>
          Akquise Aufnahmebogen
        </a>
      </div>
      <div className='list-header'>
        <div className='show-for-mobile'> </div>
        <div className='show-for-desktop'> </div>
      </div>
    </div>
  </div>
);

export default ModuliPage;
