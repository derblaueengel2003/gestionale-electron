import React from 'react';
import { withTranslation } from 'react-i18next';
import Intestazione from '../common/Intestazione';
import IntestazioneParagrafo from '../common/IntestazioneParagrafo';
import { linkButton } from '../common/elements';
import ExternalLinks from '../evaluation/ExternalLinks';
import Videotutorial from './Videotutorial';

const LinkPage = ({ t }) => {
  return (
    <div>
      <Intestazione intestazione='Links' />
      <div className='container'>
        <h5>m2Square</h5>
        {linkButton(
          'https://www.m2square.eu/wp-admin/edit.php?post_type=estate_property&orderby=date&order=desc',
          'Backend m2Square.eu'
        )}
        {linkButton(
          'https://admin.df.eu/kunde/index.php5',
          'DomainFactory(Webhosting)'
        )}
        <div className='divider'></div>
        <h5>Cloud</h5>
        {linkButton('https://m2square-my.sharepoint.com/', 'OneDrive online')}
        <div className='divider'></div>
        <h5>{t('real_estate_portals')}</h5>
        {linkButton(
          'https://www.immobilienscout24.de/scoutmanager/angebotsliste/app/overview.html',
          'ImmoScout24'
        )}
        {linkButton('https://dashboard.govesta.co', 'Govesta')}
        {linkButton(
          'https://www.ivd24immobilien.de/profil/makler/uebersicht/',
          'IVD24'
        )}
        {linkButton(
          'https://www.ebay-kleinanzeigen.de/m-meine-anzeigen.html',
          'eBay Kleinanzeigen'
        )}
        <div className='divider'></div>
        <h5>Google (berlinb2c@googlemail.com)</h5>
        {linkButton('https://contacts.google.com', t('address_book'))}
        {linkButton('https://calendar.google.com/', t('calendar'))}
        {linkButton('https://analytics.google.com/', t('analytics'))}
        {linkButton('https://ads.google.com/', t('ads'))}
        {linkButton('https://www.google.com/business/', 'Google Business')}
        <div className='divider'></div>
        <h5>Partner</h5>
        {linkButton('https://carestone.com', 'Wirtschaftshaus/Carestone')}
        {linkButton('https://intern.ivd.net', 'IVD')}
        <div className='divider'></div>
        <h5>Tools</h5>
        {linkButton('https://us4.admin.mailchimp.com', 'Newsletter')}
        {linkButton(
          'https://fbinter.stadt-berlin.de/fb/index.jsp',
          'Flurkarte online'
        )}
        {linkButton(
          'https://remotedesktop.google.com/support/?pli=1',
          'Chrome Remote Desktop'
        )}
        {linkButton('https://www.deepl.com/translate', t('online_tranlsator'))}
        {linkButton('https://goaml.fiu.bund.de/Home', 'Geldwäsche Meldeportal')}
        {linkButton(
          'https://www.handelsregister.de/rp_web/welcome.do',
          'Handelsregister online'
        )}{' '}
        <div className='divider'></div>
        <h5>{t('evaluations')}</h5>
        <ExternalLinks />
        <div className='divider'></div>
        <IntestazioneParagrafo intestazione='Videotutorial' />
        <Videotutorial />
      </div>
      <div className='margine-basso'></div>
    </div>
  );
};

export default withTranslation()(LinkPage);
