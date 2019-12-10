import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Geocode from 'react-geocode';
import { relative } from 'upath';

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey('AIzaSyBlElUhBRSKAy_GooSEN7uZaA1dLtjzfzE');
// set response language. Defaults to english.
Geocode.setLanguage('de');
// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion('de');
// Enable or disable logs. Its optional.
Geocode.enableDebug();
// Get latidude & longitude from address.

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [{ latitude: '', longitude: '' }]
    };
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.latitude,
            lng: store.longitude
          }}
          onClick={() => console.log('You clicked me!')}
        />
      );
    });
  };

  componentDidMount() {
    Geocode.fromAddress(
      `${this.props.oggetto.via} ${this.props.oggetto.numeroCivico}, ${this.props.oggetto.cap} ${this.props.oggetto.citta}`
    ).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState(
          prevState => (
            (prevState.stores[0].latitude = lat),
            (prevState.stores[0].longitude = lng)
          )
        );
      },
      error => {
        console.error(error);
      }
    );
    console.log(this.state);
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={16}
        style={mapStyles}
        center={{
          lat: this.state.stores[0].latitude,
          lng: this.state.stores[0].longitude
        }}
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}

const mapStyles = {
  width: '50%',
  height: '50%'
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBlElUhBRSKAy_GooSEN7uZaA1dLtjzfzE'
})(MapContainer);
