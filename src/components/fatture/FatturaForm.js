import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'

export class FatturaForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            numeroFattura: props.fattura ? props.fattura.numeroFattura : '',
            dataFattura: props.fattura ? props.fattura.dataFattura && moment(props.fattura.dataFattura) : null,
            payed: props.fattura ? props.fattura.payed : false,
            payedAt: props.fattura ? props.fattura.payedAt && moment(props.fattura.payedAt) : null,
            calendarPayedAtFocused: false,
            calendarDataFatturaFocused: false,
            dealId: props.fattura ? props.fattura.dealId : '',
            error: '',
            modificato: ''
        }
    }
    onNumeroFatturaChange = (e) => {
        const numeroFattura = e.target.value
        this.setState(() => ({ numeroFattura, modificato: { ...this.state.modificato, numeroFattura: 'modificato'} }) )
    }
    onDataFatturaChange = (dataFattura) => {
        if (dataFattura) {
            this.setState(() => ({ dataFattura }))
        }
    }
    onFocusDataFatturaChange = ({ focused }) => {
        this.setState(() => ({ calendarDataFatturaFocused: focused }))
    }
    onPayedChange = () => {
        this.setState(() => ({ payed: !this.state.payed }))
        this.state.payed === false && this.setState({ payedAt: null })
    }
    onPayedAtDateChange = (payedAt) => {
        if (payedAt) {
            this.setState(() => ({ payedAt }))
        }
    }
    onFocusPayedAtChange = ({ focused }) => {
        this.setState(() => ({ calendarPayedAtFocused: focused }))
    }
    onDealIdChange = (e) => {
        const dealId = e.target.value
        this.setState(() => ({ dealId }))
    }
    onSubmit = (e) => {
        e.preventDefault()
    
        if (!this.state.numeroFattura || !this.state.dealId) {
            this.setState(() => ({ error: 'Inserisci via e Deal Id.'}))
        } else {
            this.setState(() => ({ error: '' }))
            this.props.onSubmit({
                numeroFattura: this.state.numeroFattura,
                dataFattura: this.state.dataFattura ? this.state.dataFattura.valueOf() : null,
                payed: this.state.payed,
                payedAt: this.state.payedAt ? this.state.payedAt.valueOf() : null,
                dealId: this.state.dealId
            })
        }
    }
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                Deal:
                <select
                    value={this.state.dealId}
                    onChange={this.onDealIdChange}
                >
                    <option value=""></option>
                    {this.props.deals.map((fattura) =>
                        <option key={fattura.id}
                        value={fattura.id}>
                        {`${this.props.oggetti.find((ogg) => ogg.id === fattura.description).rifId} - 
                        ${this.props.oggetti.find((ogg) => ogg.id === fattura.description).via} 
                        ${this.props.oggetti.find((ogg) => ogg.id === fattura.description).numeroCivico},
                        WE ${this.props.oggetti.find((ogg) => ogg.id === fattura.description).numeroAppartamento}
                       `}
                        </option>)}
                </select>
                Numero Fattura:
                <input
                    className={`text-input text-input--${this.state.modificato.numeroFattura}`}
                    type="text"
                    placeholder="Numero Fattura"
                    value={this.state.numeroFattura}
                    onChange={this.onNumeroFatturaChange}
                /> 
                Data Fattura:
                <SingleDatePicker
                    date={this.state.dataFattura}
                    onDateChange={this.onDataFatturaChange}
                    focused={this.state.calendarDataFatturaFocused}
                    onFocusChange={this.onFocusDataFatturaChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                <label>Pagata&nbsp;
                <input
                        type="checkbox"
                        name="payed"
                        checked={this.state.payed}
                        onChange={this.onPayedChange}
                    />
                </label>
                <div className={`visible-${this.state.payed} form`}>
                    Data Pagamento:
                    <SingleDatePicker
                        date={this.state.payedAt}
                        onDateChange={this.onPayedAtDateChange}
                        focused={this.state.calendarPayedAtFocused}
                        onFocusChange={this.onFocusPayedAtChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                </div>
                <div>
                    <button className="button">Salva modifiche</button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    deals: state.deals,
    oggetti: state.oggetti
})

export default connect(mapStateToProps)(FatturaForm)