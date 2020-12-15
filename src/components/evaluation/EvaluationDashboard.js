import React from 'react';
import { withTranslation } from 'react-i18next';
import Intestazione from '../common/Intestazione';
import ListFilters from '../common/ListFilters';
import EvaluationList from './EvaluationList';
import { addButton } from '../common/elements';

const EvaluationDashboard = ({ t }) => {
  const options = [
    { value: 'name', label: t('evaluation_filter_name') },
    { value: 'date', label: t('evaluation_filter_date') },
  ];
  return (
    <div>
      <Intestazione intestazione={t('evaluation_header')} />
      <ListFilters options={options} />
      {addButton('/evaluationcreate')}
      <EvaluationList />
    </div>
  );
};

export default withTranslation()(EvaluationDashboard);
