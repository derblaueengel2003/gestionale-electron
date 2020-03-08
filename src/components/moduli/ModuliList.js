import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

const ModuliPage = ({ t }) => (
  <div>
    <div className='grey lighten-4'>
      <div className='container'>
        <h1>{t('Moduli')}</h1>
      </div>
    </div>

    <div className='container'>
      <ul className='collection with-header'>
        <li className='collection-header'>
          <h4>{t('Da compilare online')}</h4>
        </li>
        <li className='collection-item'>
          <Link to='/provisionsbestaetigung'>{t('Conferma provvigione')}</Link>
        </li>
        <li className='collection-item'>
          <Link to='/vollmachtnotarauftrag'>
            {t('Delega richiesta bozza di contratto')}
          </Link>
        </li>
        <li className='collection-item'>
          <Link to='/makleralleinauftrag'>{t('Mandato alla vendita')}</Link>
        </li>
        <li className='collection-item'>
          <Link to='/widerrufsbelehrung'>
            {t('Informativa sul diritto di recesso')}
          </Link>
        </li>
        <li className='collection-item'>
          <Link to='/vollmachtunterlagen'>
            {t('Delega per richiesta documenti')}
          </Link>
        </li>
      </ul>
    </div>

    <div className='container section'>
      <ul className='collection with-header'>
        <li className='collection-header'>
          <h4>{t('Moduli in bianco')}</h4>
        </li>
        <li className='collection-item'>
          <a href='./files/Provisionsbestaetigung.pdf' download>
            {t('Conferma provvigione')}
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/datenblatt.pdf' download>
            {t('Foglio informativo per il notaio')} Pietzcker
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/Allgemeine Vertragsbedingungen.pdf' download>
            {t('Condizioni generali di contratto')}
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/Widerrufsbelehrung.pdf' download>
            {t('Informativa sul diritto di recesso')} m2Square
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/Verbraucherwiderrufsbelehrung.pdf' download>
            {t('Informativa sul diritto di recesso')} IVD
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='./files/Vollmacht zur Vorbereitung einer notariellen Kaufvertragsurkunde.pdf'
            download
          >
            {t('Delega richiesta bozza di contratto')}
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/Lettera Grundbuchamt.docx' download>
            {t('Lettera per ufficio Libro Fondiario (Grundbuchamt)')}
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/Makleralleinauftrag.pdf' download>
            {t('Mandato alla vendita')}
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='./files/Makleralleinauftrag Erhebung-von-Daten-Pflichtigen-selbst-Transparenzpflicht-Artikel-13-DSGVO.pdf'
            download
          >
            {t('Informativa privacy')} - {t('Mandato alla vendita')}
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='./files/Maklervertrag mit Provision Erhebung-von-Daten-Pflichtigen-selbst-Transparenzpflicht-Artikel-13-DSGVO.pdf'
            download
          >
            {t('Informativa privacy')} - {t('Incarico agenzia')} {t('con')}{' '}
            {t('Provvigione')}
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='./files/Maklervertrag ohne Provision Erhebung-von-Daten-Pflichtigen-selbst-Transparenzpflicht-Artikel-13-DSGVO.pdf'
            download
          >
            {t('Informativa privacy')} - {t('Incarico agenzia')} {t('senza')}{' '}
            {t('Provvigione')}
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='./files/Mietvertrag Erhebung-von-Daten-Pflichtigen-selbst-Transparenzpflicht-Artikel-13-DSGVO.pdf'
            download
          >
            {t('Informativa privacy')} - {t('Contratto di affitto')}
          </a>
        </li>

        <li className='collection-item'>
          <a href='./files/Dokumentationsbogen.docx' download>
            {t('Modulo riciclo di denaro')} - {t('Persone fisiche')}
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/DokumentationsbogenJP.docx' download>
            {t('Modulo riciclo di denaro')} - {t('Persone giuridiche')}
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/meldebestaetigung.pdf' download>
            {t('Conferma affitto per inquilini')} (Bürgeramt)
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/Mietschuldenfreiheitsbescheinigung.docx' download>
            {t('Dichiarazione di buon pagatore per inquilini')}
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/Uebergabeprotokoll.doc' download>
            {t('Protocollo consegna appartamento')} - {t('Vendita')}
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/Wohnungsuebergabeprotokoll Mietwohnung.pdf' download>
            {t('Protocollo consegna appartamento')} - {t('Affitto')}
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/wohnungs_mietvertrag_1520411845.pdf' download>
            {t('Modello')} {t('Contratto di affitto')}
          </a>
        </li>
        <li className='collection-item'>
          <a href='./files/Aufnahme-ETW-Teileigentum.pdf' download>
            {t('Modulo per acquisizione')}
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default withTranslation()(ModuliPage);
