import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import selectLeads from '../../selectors/leads';
import { Link } from 'react-router-dom';
import Card from '../Card';
import { formattaData, formattaPrezzo } from '../common/utils';

const findImmobile = (lead) => {
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
  return clienti.find((cliente) => cliente.id === lead.leadId);
};

const findConsulenteVendita = (clienteNomeCognome, utenti) => {
  return utenti.find(
    (utente) => utente.id === clienteNomeCognome.consulenteVenditaId
  );
};

export const LeadsList = (props) => {
  //controllo se la i dati vengono dalla scheda clienti e sono passati via props
  const leadsPayload = props.userLeads || props.leads;
  const oggettoId = props.oggettoId || '';

  return (
    <div className='container'>
      <div className='list-body'>
        {leadsPayload.length > 0 && (
          <div>
            <h5>{props.ruolo || ''}</h5>
            {leadsPayload.length > 0 &&
              leadsPayload.map((lead) => {
                const clienteNomeCognome = findCliente(lead, props.clienti);
                const consulenteVendita = findConsulenteVendita(
                  clienteNomeCognome,
                  props.utenti
                );
                const immobile = findImmobile(lead);
                const pulsanti = (
                  <div>
                    {clienteNomeCognome.email && (
                      <a
                        className='btn-floating blue right btn-floating-margin'
                        href={`mailto:${clienteNomeCognome.email}`}
                      >
                        <i className='material-icons'>email</i>
                      </a>
                    )}

                    {lead.leadOggettoStato === 'libero' ||
                    lead.leadOggettoStato === 'affittato' ||
                    lead.leadOggettoStato === 'libero o affittato' ||
                    lead.leadOggettoStato === '' ? (
                      <Link
                        className='btn-floating green right accent-3 btn-floating-margin'
                        to={`/leadmatchview/${lead.id}`}
                      >
                        <i className='material-icons'>search</i>
                      </Link>
                    ) : (
                      ''
                    )}

                    <Link
                      className={`btn-floating ${props.feedbackButton} blue-grey right`}
                      to={{
                        pathname: '/createoffer',
                        state: { leadId: lead.id, oggettoId },
                      }}
                    >
                      <i className='material-icons'>sentiment_satisfied_alt</i>
                    </Link>
                  </div>
                );
                const consulente = consulenteVendita
                  ? consulenteVendita.name
                  : null;
                const creatoIl = formattaData(lead.leadCreatedAt);

                const offerte = props.offers
                  .filter((offer) => offer.leadId === lead.id)
                  .map((offer) => {
                    const oggetto = props.oggetti.find(
                      (oggetto) => oggetto.id === offer.oggettoId
                    );
                    const feedback = () => {
                      switch (offer.feedback) {
                        case 'positivo':
                          return (
                            <i
                              key={offer.id}
                              className='material-icons small green-text'
                            >
                              sentiment_satisfied_alt
                            </i>
                          );
                        case 'negativo':
                          return (
                            <i
                              key={offer.id}
                              className='material-icons small red-text'
                            >
                              sentiment_very_dissatisfied
                            </i>
                          );
                        case 'neutro':
                          return (
                            <i
                              key={offer.id}
                              className='material-icons small amber-text'
                            >
                              sentiment_dissatisfied
                            </i>
                          );
                        case 'sconosciuto':
                          return (
                            <i key={offer.id} className='material-icons small'>
                              help_outline
                            </i>
                          );
                        case 'not_relevant':
                          return (
                            <i
                              key={offer.id}
                              className='material-icons small brown-text'
                            >
                              highlight_off
                            </i>
                          );

                        default:
                          return (
                            <i className='material-icons small'>more_horiz</i>
                          );
                      }
                    };

                    return (
                      <div key={oggetto.id} className='feedback-emojis-item'>
                        {feedback()} {oggetto.via} {oggetto.numeroCivico}
                      </div>
                    );
                  });

                return (
                  <Card
                    key={lead.id}
                    visible={true}
                    link={`/leadview/${lead.id}`}
                    titolo={`${clienteNomeCognome.nome} ${clienteNomeCognome.cognome}`}
                    sottotitolo={`Budget: ${formattaPrezzo(
                      lead.leadBudget,
                      true
                    )}`}
                    corpo={[
                      consulente,
                      creatoIl,
                      immobile,
                      `${props.t('city')}: ${lead.leadCity}`,
                    ]}
                    lineaNote={`${lead.leadNote && `Note: ${lead.leadNote}`}`}
                    progressBar={
                      <div className='feedback-emojis'>{offerte}</div>
                    }
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

const mapStateToProps = (state) => {
  return {
    leads: selectLeads(state.leads, state.filters),
    clienti: state.clienti,
    utenti: state.utenti,
    offers: state.offers,
    oggetti: state.oggetti,
  };
};

export default connect(mapStateToProps)(withTranslation()(LeadsList));
