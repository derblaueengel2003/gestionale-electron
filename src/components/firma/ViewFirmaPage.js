import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Intestazione from '../common/Intestazione';
import { editButton } from '../common/elements';

export class ViewFirmaPage extends React.Component {
  render() {
    return (
      <div>
        <Intestazione intestazione={'Firma'} />
        <div className='container'>
          {this.props.utente.name.length > 0 && (
            <div>Name: {this.props.utente.name}</div>
          )}
          {this.props.utente.role.length > 0 && (
            <div>Rolle: {this.props.utente.role}</div>
          )}
          {editButton(`/useredit/${this.props.utente.id}`)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  firma: state.firma.find((firma) => firma.id === props.match.params.id),
});

export default connect(mapStateToProps)(withTranslation()(ViewFirmaPage));
