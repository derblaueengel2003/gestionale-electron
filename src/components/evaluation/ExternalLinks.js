import React from 'react';
import IntestazioneParagrafo from '../common/IntestazioneParagrafo';
import { withTranslation } from 'react-i18next';
import { ipcRenderer } from 'electron';

// Electron specific
const ExternalLinks = ({ t }) => {
  const linkArray = [
    {
      label: 'Wohnlagekarte',
      link:
        'https://fbinter.stadt-berlin.de/fb/index.jsp?loginkey=showAreaSelection&mapId=k_wohnlagenadr2019@senstadt&areaSelection=address',
    },
    { label: 'Bodenrichtwert', link: 'https://fbinter.stadt-berlin.de/boris/' },
    {
      label: 'Mietspiegel',
      link:
        'https://www.stadtentwicklung.berlin.de/wohnen/mietspiegel/index.shtml',
    },
    {
      label: 'Immobilienpreis-Info',
      link:
        'https://aks-berlin.poet.de/aks-immobilien/control/flowcontroller.html?lJc8bZnDh=g5UjKk70&_flowId=root&_flowExecutionKey=e1s1',
    },
    {
      label: 'Mietendeckel',
      link:
        'https://mietendeckel.berlin.de/wp-content/uploads/200221_mietendeckel_mietentabelle.pdf',
    },
    {
      label: 'IS24 Bewertung',
      link:
        'https://www.immobilienscout24.de/realestatevaluation/secured/managementv2/index.html#/',
    },
  ];
  return (
    <div>
      <IntestazioneParagrafo intestazione={t('useful_links')} />
      {linkArray.map((link) => (
        <button
          onClick={() => ipcRenderer.send('link:open', link.link)}
          className='btn blue btn-margin'
        >
          {link.label}
        </button>
      ))}
    </div>
  );
};

export default withTranslation()(ExternalLinks);
