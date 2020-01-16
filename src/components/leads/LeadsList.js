import React from 'react';
import { connect } from 'react-redux';
import LeadsListItem from './LeadsListItem';
import selectLeads from '../../selectors/leads';
import { Link } from 'react-router-dom';
import Card from '../Card';
import numeral from 'numeral';
import moment from 'moment';

const findImmobile = lead => {
  let immobile = '';
  if (lead.leadOggettoStato === 'commerciale') {
    immobile = `Locale ${lead.leadOggettoStato}`;
  } else if (lead.leadOggettoStato === 'aph') {
    immobile = 'Casa di cura';
  } else if (
    lead.leadOggettoStato === 'libero' ||
    lead.leadOggettoStato === 'affittato' ||
    lead.leadOggettoStato === 'libero o affittato'
  ) {
    immobile = `Appartamento ${lead.leadOggettoStato}`;
  }
  return immobile;
};

const findCliente = (lead, clienti) => {
  return clienti.find(cliente => cliente.id === lead.leadId);
};

const findConsulenteVendita = (clienteNomeCognome, utenti) => {
  return utenti.find(
    utente => utente.id === clienteNomeCognome.consulenteVenditaId
  );
};

export const LeadsList = props => {
  //controllo se la i dati vengono dalla scheda clienti e sono passati via props
  const leadsPayload = props.userLeads || props.leads;

  return (
    <div className='container'>
      <div className='list-body'>
        {leadsPayload.length > 0 && (
          <div>
            <h5>Anfragen</h5>
            {leadsPayload.map(lead => {
              const clienteNomeCognome = findCliente(lead, props.clienti);
              const consulenteVendita = findConsulenteVendita(
                clienteNomeCognome,
                props.utenti
              );
              const immobile = findImmobile(lead);
              const pulsanti = (
                <div>
                  {lead.leadOggettoStato === 'libero' ||
                  lead.leadOggettoStato === 'affittato' ||
                  lead.leadOggettoStato === 'libero o affittato' ||
                  lead.leadOggettoStato === '' ? (
                    <Link
                      className='btn-floating green accent-3 right btn-floating-margin'
                      to={`/leadmatchview/${lead.id}`}
                    >
                      Match
                    </Link>
                  ) : (
                    ''
                  )}

                  {clienteNomeCognome.email && (
                    <a
                      className='btn-floating blue right btn-floating-margin'
                      href={`mailto:${clienteNomeCognome.email}`}
                    >
                      <i className='material-icons'>email</i>
                    </a>
                  )}
                </div>
              );

              return (
                <Card
                  key={lead.id}
                  visible={true}
                  link={`/leadview/${lead.id}`}
                  titolo={`${clienteNomeCognome.nome} ${clienteNomeCognome.cognome}`}
                  sottotitolo={`Budget: ${numeral(lead.leadBudget / 100).format(
                    '0,0[.]00 $'
                  )}`}
                  linea1={
                    consulenteVendita ? `(${consulenteVendita.name})` : null
                  }
                  linea2={moment(lead.leadCreatedAt).format('DD MMMM, YYYY')}
                  linea3={immobile}
                  lineaNote={`${lead.leadNote && `Note: ${lead.leadNote}`}`}
                  titoloDestra={pulsanti}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    leads: selectLeads(state.leads, state.filters),
    clienti: state.clienti,
    utenti: state.utenti
  };
};

export default connect(mapStateToProps)(LeadsList);
