import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import moment from 'moment';
import OggettiList from '../oggetti/OggettiList';
import Intestazione from '../common/Intestazione';
import MailchimpAPI from './MailchimpApi';

export class ViewNewsletter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oggArray: [],
    };
  }

  findOggetto = (oggettoId) =>
    this.props.oggetti.find((ogg) => ogg.id === oggettoId);

  pushOggetto = (oggettoId) => {
    const ogg = this.findOggetto(oggettoId);
    if (ogg && !this.state.oggArray.some((e) => e.id === ogg.id))
      this.state.oggArray.push(ogg);
  };

  render() {
    const {
      dataNewsletter,
      oggetto1,
      oggetto2,
      oggetto3,
      oggetto4,
      oggetto5,
      oggetto6,
      newsletterText,
      id,
    } = this.props.newsletter;
    const { t } = this.props;
    // run();

    oggetto1 && this.pushOggetto(oggetto1);
    oggetto2 && this.pushOggetto(oggetto2);
    oggetto3 && this.pushOggetto(oggetto3);
    oggetto4 && this.pushOggetto(oggetto4);
    oggetto5 && this.pushOggetto(oggetto5);
    oggetto6 && this.pushOggetto(oggetto6);

    return (
      <div>
        <Intestazione
          intestazione={
            dataNewsletter && (
              <span>{moment(dataNewsletter).format('DD MMMM, YYYY')}</span>
            )
          }
        />
        <div className='container section'>
          <div>
            <Link
              className='btn-floating orange right btn-floating-margin'
              to={`/newsletteredit/${id}`}
            >
              <i className='material-icons'>edit</i>
            </Link>
          </div>

          <div>{newsletterText}</div>
        </div>
        <div className='section'>
          <MailchimpAPI
            oggArray={this.state.oggArray}
            newsletter={this.props.newsletter}
          />
        </div>

        <OggettiList
          oggetto={this.state.oggArray}
          ruolo={t('newsletter_properties')}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  newsletter: state.newsletters.find(
    (newsletter) => newsletter.id === props.match.params.id
  ),
  oggetti: state.oggetti,
});

export default connect(mapStateToProps)(withTranslation()(ViewNewsletter));
