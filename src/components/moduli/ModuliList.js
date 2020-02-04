import React from 'react';
import { Link } from 'react-router-dom';

const ModuliPage = () => (
  <div>
    <div className='grey lighten-4'>
      <div className='container'>
        <h1>Formulare</h1>
      </div>
    </div>

    <div className='container'>
      <ul className='collection with-header'>
        <li className='collection-header'>
          <h4>Online ausfüllen</h4>
        </li>
        <li className='collection-item'>
          <Link to='/provisionsbestaetigung'>Provisionsbestätigung</Link>
        </li>
        <li className='collection-item'>
          <Link to='/makleralleinauftrag'>Makler-Allein-Auftrag</Link>
        </li>
        <li className='collection-item'>
          <Link to='/widerrufsbelehrung'>Widerrufsbelehrung</Link>
        </li>
        <li className='collection-item'>
          <Link to='/vollmachtunterlagen'>
            Vollmacht Empfang von Unterlagen
          </Link>
        </li>
      </ul>
    </div>

    <div className='container section'>
      <ul className='collection with-header'>
        <li className='collection-header'>
          <h4>Blanko</h4>
        </li>
        <li className='collection-item'>
          <a href='./files/Provisionsbestaetigung.pdf' download>
            Provisionsbestätigung
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/datenblatt.pdf' download>
            Datenblatt Pietzcker
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/Allgemeine Vertragsbedingungen.pdf' download>
            Allgemeine Vertragsbedingungen
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/Widerrufsbelehrung.pdf' download>
            Widerrufsbelehrung
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/Verbraucherwiderrufsbelehrung.pdf' download>
            Verbraucherwiderrufsbelehrung
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='./files/Vollmacht zur Vorbereitung einer notariellen Kaufvertragsurkunde.pdf'
            download
          >
            Vollmacht zur Vorbereitung einer notariellen Kaufvertragsurkunde
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/Lettera Grundbuchamt.docx' download>
            Lettera per il Grundbuchamt
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/Makleralleinauftrag.pdf' download>
            Makler-Allein-Auftrag
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='./files/Makleralleinauftrag Erhebung-von-Daten-Pflichtigen-selbst-Transparenzpflicht-Artikel-13-DSGVO.pdf'
            download
          >
            Makleralleinauftrag DSGVO
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='./files/Maklervertrag mit Provision Erhebung-von-Daten-Pflichtigen-selbst-Transparenzpflicht-Artikel-13-DSGVO.pdf'
            download
          >
            Maklervertrag mit Provision DSGVO
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='./files/Maklervertrag ohne Provision Erhebung-von-Daten-Pflichtigen-selbst-Transparenzpflicht-Artikel-13-DSGVO.pdf'
            download
          >
            Maklervertrag ohne Provision DSGVO
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='./files/Mietvertrag Erhebung-von-Daten-Pflichtigen-selbst-Transparenzpflicht-Artikel-13-DSGVO.pdf'
            download
          >
            Mietvertrag DSGVO
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/ACCENTRO_Beratungsprotokoll_DE.pdf' download>
            ACCENTRO_Beratungsprotokoll_DE
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/ACCENTRO_Beratungsprotokoll_EN.pdf' download>
            ACCENTRO_Beratungsprotokoll_EN
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/ACCENTRO_Datenschutz_DE.pdf' download>
            ACCENTRO_Datenschutz_DE
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/ACCENTRO_Datenschutz_EN.pdf' download>
            ACCENTRO_Datenschutz_EN
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/Accentro_Reservierungsvereinbarung_DE.pdf' download>
            Accentro_Reservierungsvereinbarung_DE
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/Accentro_Reservierungsvereinbarung_EN.pdf' download>
            Accentro_Reservierungsvereinbarung_EN
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/Dokumentationsbogen.docx' download>
            GWG Dokumentationsbogen Nat.Pers.
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/DokumentationsbogenJP.docx' download>
            GWG Dokumentationsbogen Jur.Pers.
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/meldebestaetigung.pdf' download>
            Mieter Meldebestätigung
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/Mietschuldenfreiheitsbescheinigung.docx' download>
            Mietschuldenfreiheitsbescheinigung
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/Uebergabeprotokoll.doc' download>
            Übergabe-Protokoll Verkauf
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/Wohnungsuebergabeprotokoll Mietwohnung.pdf' download>
            Übergabe-Protokoll Miete
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/wohnungs_mietvertrag_1520411845.pdf' download>
            Mietvertrag Muster
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/Aufnahme-ETW-Teileigentum.pdf' download>
            Akquise Aufnahmebogen
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default ModuliPage;
