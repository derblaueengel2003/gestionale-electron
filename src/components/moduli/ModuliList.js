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
      <div>
        <div>Online ausfüllen</div>

        <Link className='btn teal' to='/makleralleinauftrag'>
          Makler-Allein-Auftrag
        </Link>
        <Link className='btn teal btn-floating-margin' to='/widerrufsbelehrung'>
          Widerrufsbelehrung
        </Link>
        <Link
          className='btn teal btn-floating-margin'
          to='/vollmachtunterlagen'
        >
          Vollmacht Empfang Unterlagen
        </Link>
      </div>
    </div>

    <div className='container'>
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
          <a href='./files/Makleralleinauftrag.pdf' download>
            Makler-Allein-Auftrag
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
      </ul>
    </div>
  </div>
);

export default ModuliPage;
