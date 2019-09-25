import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import ClientiList from '../clienti/ClientiList';

export class ViewOggettiPage extends React.Component {
  render() {
    const verwalter = this.props.clienti.find(
      cliente => cliente.id === this.props.oggetto.verwalter
    );
    const proprietario = this.props.clienti.find(
      cliente => cliente.id === this.props.oggetto.proprietarioId
    );
    const proprietario2 = this.props.clienti.find(
      cliente => cliente.id === this.props.oggetto.proprietarioId2
    );

    return (
      <div>
        <div>
          <div className='page-header'>
            <div className='content-container'>
              <h1 className='page-header__title'>Oggetto</h1>
            </div>
          </div>
          <div className='content-container'>
            <div className='list-header-oggetti'>
              <div className='show-for-mobile'>Dettagli</div>
              <div className='show-for-desktop'>Dettagli</div>
              <div className='show-for-desktop'></div>
            </div>
            <div className='list-body'>
              <div className='list-item'>
                <div>
                  {this.props.oggetto.via.length > 0 && (
                    <h3>{`${this.props.oggetto.via} ${this.props.oggetto.numeroCivico}, WE ${this.props.oggetto.numeroAppartamento}, ${this.props.oggetto.cap} ${this.props.oggetto.citta}`}</h3>
                  )}
                  {this.props.oggetto.rifId.length > 0 && (
                    <div>Rif. id: {this.props.oggetto.rifId}</div>
                  )}
                  {this.props.oggetto.grundbuch.length > 0 && (
                    <div>
                      Grundbuch von {this.props.oggetto.grundbuch} - Blatt Nr.{' '}
                      {this.props.oggetto.grundbuchBlatt}
                    </div>
                  )}
                </div>
                <div>
                  {this.props.oggetto.m2.length > 0 && (
                    <div>{`m2: ${this.props.oggetto.m2}`}</div>
                  )}
                  {this.props.oggetto.piano.length > 0 && (
                    <div>{`Etage: ${this.props.oggetto.piano}`}</div>
                  )}
                  {this.props.oggetto.stato.length > 0 && (
                    <div>{`Status: ${this.props.oggetto.stato}`}</div>
                  )}
                  {this.props.oggetto.stato === 'vermietet' && (
                    <div>{`Kaltmiete: ${numeral(
                      this.props.oggetto.affittoNetto / 100
                    ).format('0,0[.]00 $')}`}</div>
                  )}
                  {`Wohngeld: ${numeral(
                    this.props.oggetto.wohngeld / 100
                  ).format('0,0[.]00 $')}`}
                </div>
              </div>
            </div>
            <Link
              className='button button--secondary-oggetti'
              to={`/oggettoedit/${this.props.oggetto.id}`}
            >
              Modifica Oggetto
            </Link>
          </div>
        </div>
        {this.props.oggetto.verwalter.length > 0 && (
          <div>
            <ClientiList cliente={verwalter} ruolo={'Hausverwaltung'} />
          </div>
        )}
        {this.props.oggetto.proprietarioId.length > 0 && (
          <div>
            <ClientiList cliente={proprietario} ruolo={'Proprietario'} />
          </div>
        )}
        {this.props.oggetto.proprietarioId2.length > 0 && (
          <div>
            <ClientiList cliente={proprietario2} ruolo={'2. Proprietario'} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  oggetto: state.oggetti.find(oggetto => oggetto.id === props.match.params.id),
  clienti: state.clienti
});

export default connect(mapStateToProps)(ViewOggettiPage);
