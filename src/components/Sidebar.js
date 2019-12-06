import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';

export class Sidebar extends Component {
  componentDidMount() {
    const options = {
      inDuration: 250,
      outDuration: 200,
      draggable: true
    };

    M.Sidenav.init(this.Sidenav);

    let instance = M.Sidenav.getInstance(this.Sidenav);
  }
  render() {
    return (
      <div>
        <ul
          ref={Sidenav => {
            this.Sidenav = Sidenav;
          }}
          id='slide-out'
          className='sidenav'
        >
          <li>
            <Link className='sidenav-close' to='/dashboard'>
              Deals
            </Link>
          </li>
          <li>
            <Link className='sidenav-close' to='/leads'>
              Anfragen
            </Link>
          </li>
          <li>
            <Link className='sidenav-close' to='/moduli'>
              Formulare
            </Link>
          </li>
          <li>
            <Link className='sidenav-close' to='/oggetti'>
              Objekte
            </Link>
          </li>
          <li>
            <Link className='sidenav-close' to='/customer'>
              Kontakte
            </Link>
          </li>
          {this.props.utente.role === 'Admin' && (
            <li>
              <Link className='sidenav-close' to='/report'>
                Report
              </Link>
            </li>
          )}
          {this.props.utente.role === 'Admin' && (
            <li>
              <Link className='sidenav-close' to='/users'>
                Benutzer
              </Link>
            </li>
          )}
          {this.props.utente.role === 'Admin' && (
            <li>
              <Link className='sidenav-close' to='/fatture'>
                Rechnungen
              </Link>
            </li>
          )}
          <li>
            <a className='sidenav-close' href='#!'>
              <i className='material-icons'>clear</i>
            </a>
          </li>
        </ul>

        <a href='#!' data-target='slide-out' className='sidenav-trigger'>
          <i className='material-icons'>menu</i>
        </a>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    utente: state.utenti.find(
      utente => utente.firebaseAuthId === state.auth.uid
    )
  };
};
export default connect(mapStateToProps)(Sidebar);
