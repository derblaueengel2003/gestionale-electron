import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Card from '../Card';
import moment from 'moment';

export const OffersList = (props) => {
  //controllo se la i dati vengono dalla scheda clienti e sono passati via props
  const offersPayload = props.offers;
  offersPayload.sort((a, b) => {
    return a.offerCreatedAt < b.offerCreatedAt ? 1 : -1;
  });
  return (
    <div className='container'>
      <div className='list-body'>
        {offersPayload.length === 0 && <h5>{props.t('offer_add')}</h5>}
        {offersPayload.length > 0 && (
          <div>
            <h5>{props.ruolo || ''}</h5>
            {offersPayload.map((offer) => {
              const oggetto = props.oggetti.find(
                (oggetto) => oggetto.id === offer.oggettoId
              );
              const consulente = props.utenti.find(
                (utente) => utente.id === offer.consulenteId
              );
              const creatoIl = offer.offerCreatedAt
                ? moment(offer.offerCreatedAt).format('DD MMMM, YYYY')
                : '';
              const feedback = () => {
                switch (offer.feedback) {
                  case 'positivo':
                    return (
                      <i className='material-icons medium green-text'>
                        sentiment_satisfied_alt
                      </i>
                    );
                  case 'negativo':
                    return (
                      <i className='material-icons medium red-text'>
                        sentiment_very_dissatisfied
                      </i>
                    );
                  case 'neutro':
                    return (
                      <i className='material-icons medium amber-text'>
                        sentiment_dissatisfied
                      </i>
                    );
                  case 'sconosciuto':
                    return (
                      <i className='material-icons medium'>help_outline</i>
                    );
                  case 'not_relevant':
                    return (
                      <i className='material-icons medium brown-text'>
                        highlight_off
                      </i>
                    );
                  default:
                    return <i className='material-icons medium'>more_horiz</i>;
                }
              };
              const mezzo = offer.offertoTramite
                ? `(${offer.offertoTramite})`
                : '';

              return (
                <Card
                  key={offer.id}
                  visible={true}
                  link={{
                    pathname: `/editoffer/${offer.id}`,
                    state: { leadId: offer.leadId },
                  }}
                  titolo={`Rif. Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}`}
                  sottotitolo={
                    offer.consulenteId && `Proposto da ${consulente.name}`
                  }
                  corpo={[mezzo, creatoIl]}
                  lineaNote={`${offer.offerNote && `Note: ${offer.offerNote}`}`}
                  titoloDestra={feedback()}
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
    oggetti: state.oggetti,
    utenti: state.utenti,
  };
};

export default connect(mapStateToProps)(withTranslation()(OffersList));
