import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Card from '../Card';
import selectNewsletters from '../../selectors/deals';
import { formattaData } from '../common/utils';

export const NewsletterList = ({
  oggettoNewsletter,
  newsletters,
  oggetti,
  ruolo,
  t,
}) => {
  const newslettersPayload = oggettoNewsletter || newsletters;
  const findOggetto = (oggettoId) => {
    const oggetto = oggetti.find((ogg) => ogg.id === oggettoId);
    return (
      <div className='foto-container foto-container-newsletter'>
        {oggetto.downloadURLsCover && (
          <img className='foto' src={oggetto.downloadURLsCover[0] || ''} />
        )}{' '}
        {oggetto.rifId} - {oggetto.via}
      </div>
    );
  };

  return (
    <div className='container'>
      {newslettersPayload.length > 0 && (
        <div>
          <h5>{ruolo || ''}</h5>
          {newslettersPayload
            .sort((a, b) => {
              return a.dataNewsletter > b.dataNewsletter ? -1 : 1;
            })
            .map((newsletter) => {
              const dataNewsletter = formattaData(newsletter.dataNewsletter);
              const oggettiInviati = [];
              newsletter.oggetto1 &&
                oggettiInviati.push(findOggetto(newsletter.oggetto1));
              newsletter.oggetto2 &&
                oggettiInviati.push(findOggetto(newsletter.oggetto2));
              newsletter.oggetto3 &&
                oggettiInviati.push(findOggetto(newsletter.oggetto3));
              newsletter.oggetto4 &&
                oggettiInviati.push(findOggetto(newsletter.oggetto4));
              newsletter.oggetto5 &&
                oggettiInviati.push(findOggetto(newsletter.oggetto5));
              newsletter.oggetto6 &&
                oggettiInviati.push(findOggetto(newsletter.oggetto6));

              return (
                <Card
                  key={newsletter.id}
                  visible={newsletter.visible}
                  link={`/newsletterview/${newsletter.id}`}
                  titolo={dataNewsletter}
                  sottotitolo={''}
                  titoloDestra={
                    <span className='card-title list-item--paid'>
                      {newsletter.mailchimpIdDe
                        ? newsletter.mailchimpIdDe.sent
                          ? 'DE'
                          : ''
                        : ''}{' '}
                      {newsletter.mailchimpIdIt
                        ? newsletter.mailchimpIdIt.sent
                          ? 'IT'
                          : ''
                        : ''}{' '}
                      {newsletter.mailchimpIdEn
                        ? newsletter.mailchimpIdEn.sent
                          ? 'EN'
                          : ''
                        : ''}{' '}
                    </span>
                  }
                  corpo={[...oggettiInviati]}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    newsletters: selectNewsletters(
      'newsletters',
      state.newsletters,
      state.filters,
      undefined,
      state.oggetti
    ),
    oggetti: state.oggetti,
  };
};

export default connect(mapStateToProps)(withTranslation()(NewsletterList));
