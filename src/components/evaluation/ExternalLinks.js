import React from 'react';
import { withTranslation } from 'react-i18next';
import { linkButton } from '../common/elements';

const ExternalLinks = ({ t }) => {
  return (
    <div>
      {linkButton(
        'https://fbinter.stadt-berlin.de/fb/index.jsp?loginkey=showAreaSelection&mapId=k_wohnlagenadr2019@senstadt&areaSelection=address',
        'Wohnlagekarte'
      )}

      {linkButton('https://fbinter.stadt-berlin.de/boris/', 'Bodenrichtwert')}
      {linkButton(
        'https://www.stadtentwicklung.berlin.de/wohnen/mietspiegel/index.shtml',
        'Mietspiegel'
      )}
      {linkButton(
        'https://mietendeckel.berlin.de/wp-content/uploads/200221_mietendeckel_mietentabelle.pdf',
        'Mietendeckel'
      )}
      {linkButton(
        'https://aks-berlin.poet.de/aks-immobilien/control/flowcontroller.html?lJc8bZnDh=g5UjKk70&_flowId=root&_flowExecutionKey=e1s1',
        'Immobilienpreis-Info'
      )}
      {linkButton(
        'https://www.immobilienscout24.de/realestatevaluation/secured/managementv2/index.html#/',
        'IS24 Bewertung'
      )}
    </div>
  );
};

export default withTranslation()(ExternalLinks);
