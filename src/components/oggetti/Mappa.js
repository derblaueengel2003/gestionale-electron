import React, { Component } from 'react';
import { connect } from 'react-redux';
import Geocode from 'react-geocode';
import { withTranslation } from 'react-i18next';
import { storeActions } from '../../store/configureStore';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [{ latitude: '', longitude: '' }],
      indirizzo:
        this.props.indirizzo ||
        `${this.props.oggetto.via}+${this.props.oggetto.numeroCivico},+${this.props.oggetto.cap}+${this.props.oggetto.citta}`,
    };
  }

  componentDidMount() {
    Geocode.setApiKey('YOUR API KEY HERE');
    Geocode.setLanguage('de');
    Geocode.setRegion('de');
    Geocode.enableDebug();

    if (
      this.props.oggetto &&
      this.props.oggetto.latitude &&
      this.props.oggetto.longitude
    ) {
      this.setState(
        (prevState) => (
          (prevState.stores[0].latitude = this.props.oggetto.latitude),
          (prevState.stores[0].longitude = this.props.oggetto.longitude)
        )
      );
    } else {
      Geocode.fromAddress(this.state.indirizzo).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          this.setState(
            (prevState) => (
              (prevState.stores[0].latitude = lat),
              (prevState.stores[0].longitude = lng)
            )
          );
          // se vengo da view oggetti, passo le coordinata allo store per inviarle a WP

          this.props.startEditOggetto(this.props.oggetto.id, {
            ...this.props.oggetto,
            latitude: lat,
            longitude: lng,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  render() {
    const { t } = this.props;
    const { indirizzo, stores } = this.state;

    return (
      <div className='container'>
        <div className='grey lighten-4'>
          <div>
            <h1>{t('Mappa')}</h1>
          </div>
        </div>
        <a
          href={`https://www.google.de/maps/place/${indirizzo}/`}
          target='_blank'
        >
          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${indirizzo}&zoom=15&size=400x400&maptype=roadmap
  &markers=color:blue%7Clabel:A%7C${stores[0].latitude},${stores[0].longitude}
  &key=YOUR API KEY HERE`}
          />
        </a>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startEditOggetto: (id, oggetto) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'oggetti')
        .startEditAction(id, oggetto)
    ),
});

export default connect(undefined, mapDispatchToProps)(withTranslation()(Map));
