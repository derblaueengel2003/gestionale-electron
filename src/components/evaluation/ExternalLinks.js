import React from 'react';
import IntestazioneParagrafo from '../common/IntestazioneParagrafo';
import { withTranslation } from 'react-i18next';

const ExternalLinks = ({ t }) => {
  return (
    <div>
      <IntestazioneParagrafo intestazione={t('useful_links')} />
      <a
        href='https://fbinter.stadt-berlin.de/fb/index.jsp?loginkey=showAreaSelection&mapId=k_wohnlagenadr2019@senstadt&areaSelection=address'
        target='_blank'
        rel='noopener noreferrer'
        className='btn blue btn-margin'
      >
        Wohnlagekarte
      </a>
      <a
        href='https://fbinter.stadt-berlin.de/boris/'
        target='_blank'
        rel='noopener noreferrer'
        className='btn blue btn-margin'
      >
        Bodenrichtwert
      </a>

      <a
        href='https://www.stadtentwicklung.berlin.de/wohnen/mietspiegel/index.shtml'
        target='_blank'
        rel='noopener noreferrer'
        className='btn blue btn-margin'
      >
        Mietspiegel
      </a>
      <a
        href='https://aks-berlin.poet.de/aks-immobilien/control/flowcontroller.html?lJc8bZnDh=g5UjKk70&_flowId=root&_flowExecutionKey=e1s1'
        target='_blank'
        rel='noopener noreferrer'
        className='btn blue btn-margin'
      >
        Immobilienpreis-Info
      </a>
      <a
        href='https://mietendeckel.berlin.de/wp-content/uploads/200221_mietendeckel_mietentabelle.pdf'
        target='_blank'
        rel='noopener noreferrer'
        className='btn blue btn-margin'
      >
        Mietendeckel
      </a>
      <a
        href='https://www.immobilienscout24.de/realestatevaluation/secured/managementv2/index.html#/'
        target='_blank'
        rel='noopener noreferrer'
        className='btn blue btn-margin'
      >
        IS24 Bewertung
      </a>
    </div>
  );
};

export default withTranslation()(ExternalLinks);
