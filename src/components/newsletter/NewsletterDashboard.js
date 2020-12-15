import React from 'react';
import { withTranslation } from 'react-i18next';
import Intestazione from '../common/Intestazione';
import ListFilters from '../common/ListFilters';
import NewsletterList from './NewsletterList';
import { addButton } from '../common/elements';

const NewsletterDashboard = ({ t }) => {
  const options = [
    { value: 'name', label: t('newsletter_filter_name') },
    { value: 'date', label: t('newsletter_filter_date') },
  ];
  return (
    <div>
      <Intestazione intestazione={t('newsletter_header')} />
      <ListFilters options={options} />
      {addButton('/newslettercreate')}
      <NewsletterList />
    </div>
  );
};

export default withTranslation()(NewsletterDashboard);
