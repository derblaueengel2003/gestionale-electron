import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Card from '../Card';
import selectNewsletters from '../../selectors/deals';
import moment from 'moment';

export const NewsletterList = ({
  oggettoNewsletter,
  newsletters,
  oggetti,
  ruolo,
  t,
}) => {
  const newslettersPayload = oggettoNewsletter || newsletters;
  const findOggetto = (oggettoId) =>
    oggetti.find((ogg) => ogg.id === oggettoId);

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
              const dataNewsletter = moment(newsletter.dataNewsletter).format(
                'DD MMMM, YYYY'
              );
              const oggettiId = [];
              newsletter.oggetto1 &&
                oggettiId.push(findOggetto(newsletter.oggetto1).rifId);
              newsletter.oggetto2 &&
                oggettiId.push(findOggetto(newsletter.oggetto2).rifId);
              newsletter.oggetto3 &&
                oggettiId.push(findOggetto(newsletter.oggetto3).rifId);
              newsletter.oggetto4 &&
                oggettiId.push(findOggetto(newsletter.oggetto4).rifId);
              newsletter.oggetto5 &&
                oggettiId.push(findOggetto(newsletter.oggetto5).rifId);
              newsletter.oggetto6 &&
                oggettiId.push(findOggetto(newsletter.oggetto6).rifId);

              return (
                <Card
                  key={newsletter.id}
                  visible={newsletter.visible}
                  link={`/newsletterview/${newsletter.id}`}
                  titolo={dataNewsletter}
                  sottotitolo={oggettiId.join(' - ')}
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
                  corpo={[]}
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
