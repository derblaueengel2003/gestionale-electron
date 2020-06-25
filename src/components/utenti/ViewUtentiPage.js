import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Intestazione from '../common/Intestazione';

export class ViewUtentiPage extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <Intestazione intestazione={t('Utente')} />
        <div className='container'>
          {this.props.utente.name.length > 0 && (
            <div>
              {t('Nome e cognome')}: {this.props.utente.name}
            </div>
          )}
          {this.props.utente.role.length > 0 && (
            <div>
              {t('Ruolo')}: {this.props.utente.role}
            </div>
          )}
          <Link
            className='button button--secondary-clienti'
            to={`/useredit/${this.props.utente.id}`}
          >
            {t('Modifica utente')}
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  utente: state.utenti.find((utente) => utente.id === props.match.params.id),
});

export default connect(mapStateToProps)(withTranslation()(ViewUtentiPage));
