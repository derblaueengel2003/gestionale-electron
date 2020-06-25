import React from 'react';
import { withTranslation } from 'react-i18next';
import ExternalLinks from './ExternalLinks';
import Intestazione from '../common/Intestazione';

const EvaluationDashboard = (props) => {
  return (
    <div>
      <Intestazione intestazione={props.t('evaluation_header')} />
      <div className='container section'>
        <ExternalLinks />
      </div>
    </div>
  );
};

export default withTranslation()(EvaluationDashboard);
