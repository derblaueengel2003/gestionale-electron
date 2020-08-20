import React from 'react';
import { withTranslation } from 'react-i18next';
import Intestazione from '../common/Intestazione';
import { Link } from 'react-router-dom';
import ListFilters from '../common/ListFilters';
import NewsletterList from './NewsletterList';

const NewsletterDashboard = ({ t }) => {
  const options = [
    { value: 'name', label: t('newsletter_filter_name') },
    { value: 'date', label: t('newsletter_filter_date') },
  ];
  return (
    <div>
      <Intestazione intestazione={t('newsletter_header')} />
      <ListFilters options={options} />
      <div className='container'>
        <Link className='btn-floating green right' to='/newslettercreate'>
          <i className='material-icons'>add</i>
        </Link>
      </div>
      <NewsletterList />
    </div>
  );
};

export default withTranslation()(NewsletterDashboard);
