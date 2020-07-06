import React from 'react';
import { withTranslation } from 'react-i18next';
import Intestazione from '../common/Intestazione';
import { Link } from 'react-router-dom';
import ListFilters from '../common/ListFilters';
import EvaluationList from './EvaluationList';

const EvaluationDashboard = ({ t }) => {
  const options = [
    { value: 'name', label: t('name') },
    { value: 'date', label: t('date') },
  ];
  return (
    <div>
      <Intestazione intestazione={t('evaluation_header')} />
      <ListFilters options={options} />
      <div className='container'>
        <Link className='btn-floating green right' to='/evaluationcreate'>
          <i className='material-icons'>add</i>
        </Link>
      </div>
      <EvaluationList />
    </div>
  );
};

export default withTranslation()(EvaluationDashboard);
