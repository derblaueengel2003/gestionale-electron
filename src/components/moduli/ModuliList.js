import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import Intestazione from '../common/Intestazione';

const ModuliPage = ({ t }) => (
  <div>
    <Intestazione intestazione={t('Moduli')} />

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
        <li className='collection-item'>
          <Link to='/notardatenblatt'>
            {t('Foglio informativo per il notaio')}
          </Link>
        </li>
        <li className='collection-item'>
          <Link to='/dsgvo'>{t('Informativa privacy')}</Link>
        </li>
      </ul>
    </div>

    <div className='container section'>
      <ul className='collection with-header'>
        <li className='collection-header'>
          <h4>{t('Moduli in bianco')}</h4>
        </li>
        <li className='collection-item'>
          <a
            href='https://gestionale.m2square.eu/files/Provisionsbestaetigung.pdf'
            download
          >
            {t('Conferma provvigione')}
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='https://gestionale.m2square.eu/files/datenblatt.pdf'
            download
          >
            {t('Foglio informativo per il notaio')} Pietzcker
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='https://gestionale.m2square.eu/files/Allgemeine%20Vertragsbedingungen.pdf'
            download
          >
            {t('Condizioni generali di contratto')}
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='https://gestionale.m2square.eu/files/Widerrufsbelehrung.pdf'
            download
          >
            {t('Informativa sul diritto di recesso')} m2Square
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='https://gestionale.m2square.eu/files/Verbraucherwiderrufsbelehrung.pdf'
            download
          >
            {t('Informativa sul diritto di recesso')} IVD
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='https://gestionale.m2square.eu/files/Vollmacht%20zur%20Vorbereitung%20einer%20notariellen%20Kaufvertragsurkunde.pdf'
            download
          >
            {t('Delega richiesta bozza di contratto')}
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='https://gestionale.m2square.eu/files/Lettera%20Grundbuchamt.docx'
            download
          >
            {t('Lettera per ufficio Libro Fondiario (Grundbuchamt)')}
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='https://gestionale.m2square.eu/files/Makleralleinauftrag.pdf'
            download
          >
            {t('Mandato alla vendita')}
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='https://gestionale.m2square.eu/files/Pflichtangaben-nach-Art-13-EU-DSGVO-11020.pdf'
            download
          >
            {t('Informativa privacy')}
          </a>
        </li>

        <li className='collection-item'>
          <a
            href='https://gestionale.m2square.eu/files/Dokumentationsbogen.docx'
            download
          >
            {t('Modulo riciclo di denaro')} - {t('Persone fisiche')}
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='https://gestionale.m2square.eu/files/DokumentationsbogenJP.docx'
            download
          >
            {t('Modulo riciclo di denaro')} - {t('Persone giuridiche')}
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='https://gestionale.m2square.eu/files/meldebestaetigung.pdf'
            download
          >
            {t('Conferma affitto per inquilini')} (Bürgeramt)
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='https://gestionale.m2square.eu/files/Mietschuldenfreiheitsbescheinigung.docx'
            download
          >
            {t('Dichiarazione di buon pagatore per inquilini')}
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='https://gestionale.m2square.eu/files/Uebergabeprotokoll.doc'
            download
          >
            {t('Protocollo consegna appartamento')} - {t('Vendita')}
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='https://gestionale.m2square.eu/files/Wohnungsuebergabeprotokoll%20Mietwohnung.pdf'
            download
          >
            {t('Protocollo consegna appartamento')} - {t('Affitto')}
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='https://gestionale.m2square.eu/files/wohnungs_mietvertrag_1520411845.pdf'
            download
          >
            {t('Modello')} {t('Contratto di affitto')}
          </a>
        </li>
        <li className='collection-item'>
          <a
            href='https://gestionale.m2square.eu/files/Aufnahme-ETW-Teileigentum.pdf'
            download
          >
            {t('Modulo per acquisizione')}
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default withTranslation()(ModuliPage);
