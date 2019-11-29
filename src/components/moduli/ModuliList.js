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
      <div className='list-header list-header-modulistica'>
        <div className='show-for-mobile'>Online ausfüllen</div>
        <div className='show-for-desktop'>Online ausfüllen</div>
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

      <div className='list-header list-header-modulistica'>
        <div className='show-for-mobile'>Blanko</div>
        <div className='show-for-desktop'>Blanko</div>
      </div>
      <div className='list-item'>
        <a href='./files/Provisionsbestaetigung.pdf' download>
          Provisionsbestätigung
        </a>
      </div>

      <div className='list-item'>
        <a href='./files/Verbraucherwiderrufsbelehrung.pdf' download>
          Verbraucherwiderrufsbelehrung
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
        <a href='./files/Dokumentationsbogen.docx' download>
          GWG Dokumentationsbogen Nat.Pers.
        </a>
      </div>
      <div className='list-item'>
        <a href='./files/DokumentationsbogenJP.docx' download>
          GWG Dokumentationsbogen Jur.Pers.
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
