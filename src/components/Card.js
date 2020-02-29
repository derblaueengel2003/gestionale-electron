import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const Card = ({
  titolo,
  titoloDestra,
  sottotitolo,
  linea1,
  linea2,
  linea3,
  linea4,
  linea5,
  linea6,
  linea7,
  lineaNote,
  progressBar,
  visible,
  link,
  utente,
  verkauft
}) => {
  if (visible || utente.role === "Admin") {
    return (
      <div className="row">
        <div className="col s12">
          <div className="card">
            <div className="card-content">
              <div className="row">
                <div className="col s12 m9">
                  <div className={visible ? "" : "disabled"}>
                    <div>
                      <Link to={link}>
                        <span className="card-title">{titolo}</span>
                      </Link>
                      <h6>{sottotitolo}</h6>
                      <p>{linea1}</p>
                      <p>{linea2}</p>
                      <p>{linea3}</p>
                      <p>{linea4}</p>
                      <p>{linea5}</p>
                      <p>{linea6}</p>
                      <p>{linea7}</p>
                      <p>{lineaNote}</p>
                      {progressBar}
                      {verkauft}
                    </div>
                  </div>
                </div>
                <div>
                  <span className="right">{titoloDestra} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

const mapStateToProps = state => {
  return {
    utente: state.utenti.find(
      utente => utente.firebaseAuthId === state.auth.uid
    )
  };
};

export default connect(mapStateToProps)(Card);
