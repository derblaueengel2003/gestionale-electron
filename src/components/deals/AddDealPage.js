import React from "react";
import { connect } from "react-redux";
import { Translation } from "react-i18next";
import DealForm from "./DealForm";
import { startAddDeal } from "../../actions/deals";

export class AddDealPage extends React.Component {
  onSubmit = deal => {
    this.props.startAddDeal(deal);
    this.props.history.push("/");
  };
  render() {
    return (
      <Translation>
        {t => {
          return (
            <div>
              <div>
                <div className="container">
                  <h1>{t("Aggiungi vendita")}</h1>
                </div>
              </div>
              <div className="container">
                <DealForm onSubmit={this.onSubmit} />
              </div>
            </div>
          );
        }}
      </Translation>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddDeal: deal => dispatch(startAddDeal(deal))
});

export default connect(undefined, mapDispatchToProps)(AddDealPage);
