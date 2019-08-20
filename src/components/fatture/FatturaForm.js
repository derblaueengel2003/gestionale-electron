import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import Select from 'react-virtualized-select'
import createFilterOptions from 'react-select-fast-filter-options'
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

export class FatturaForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dealId: props.fattura ? props.fattura.dealId : '',
            clienteId: props.fattura ? props.fattura.clienteId : '',
            clienteId2: props.fattura ? props.fattura.clienteId2 : '',
            numeroFattura: props.fattura ? props.fattura.numeroFattura : '',
            dataFattura: props.fattura ? props.fattura.dataFattura && moment(props.fattura.dataFattura) : null,
            calendarDataFatturaFocused: false,
            payed: props.fattura ? props.fattura.payed : false,
            payedAt: props.fattura ? props.fattura.payedAt && moment(props.fattura.payedAt) : null,
            error: '',
            modificato: '',
            note: props.fattura ? props.fattura.note : ''
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
        if (this.state.payed === false) {
            this.setState(() => ({ payedAt: null }))
        }
    }
    onPayedAtDateChange = (payedAt) => {
        if (payedAt) {
            this.setState(() => ({ payedAt }))
        } else {
            this.setState(() => ({ payedAt: null }))
        }
    }
    onFocusPayedAtChange = ({ focused }) => {
        this.setState(() => ({ calendarPayedAtFocused: focused }))
    }
    onDealIdChange = (e) => {
        const dealId = e.value
        this.setState(() => ({ dealId }))
    }
    onClienteIdChange = (e) => {
        const clienteId = e ? e.value : ''
        this.setState(() => ({ clienteId }))
    }
    onClienteIdChange2 = (e) => {
        const clienteId2 = e ? e.value : ''
        this.setState(() => ({ clienteId2 }))
    }
    onNoteChange = (e) => {
        const note = e.target.value
        this.setState(() => ({ note }))
    }
    onSubmit = (e) => {
        e.preventDefault()
    
        if (!this.state.numeroFattura || !this.state.dataFattura) {
            this.setState(() => ({ error: 'Inserisci numero e data fattura'}))
        } else {
            this.setState(() => ({ error: '' }))
            this.props.onSubmit({
                dealId: this.state.dealId,
                clienteId: this.state.clienteId,
                clienteId2: this.state.clienteId2,
                numeroFattura: this.state.numeroFattura,
                dataFattura: this.state.dataFattura ? this.state.dataFattura.valueOf() : null,
                payed: this.state.payed,
                payedAt: this.state.payedAt ? this.state.payedAt.valueOf() : null,
                note: this.state.note
            })
        }
    }
    render() {
        const options = this.props.clienti.map((cliente) => ({
            value: cliente.id, label: `${cliente.nome} ${cliente.cognome} ${cliente.ditta && `- Firma ${cliente.ditta}`}`
        }))
        const filterOptions = createFilterOptions({ options })

        const dealIdOptions = this.props.deals.map((deal) => ({
            value: deal.id, label: `${this.props.oggetti.find((ogg) => ogg.id === deal.description).rifId} - 
                        ${this.props.oggetti.find((ogg) => ogg.id === deal.description).via} 
                        ${this.props.oggetti.find((ogg) => ogg.id === deal.description).numeroCivico},
                        WE ${this.props.oggetti.find((ogg) => ogg.id === deal.description).numeroAppartamento}`
        }))
        

        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                Deal:
                <Select
                    name="dealId"
                    value={this.state.dealId}
                    options={dealIdOptions}
                    onChange={this.onDealIdChange}
                />
                Cliente:
                <Select
                    name="clienteId"
                    value={this.state.clienteId}
                    options={options}
                    filterOptions={filterOptions}
                    onChange={this.onClienteIdChange}

                />
                Secondo Cliente:
                <Select
                    name="clienteId2"
                    value={this.state.clienteId2}
                    options={options}
                    filterOptions={filterOptions}
                    onChange={this.onClienteIdChange2}

                />
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
                        showClearDate={true}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                </div>
                <textarea
                    className={`textarea text-input--${this.state.modificato.note}`}
                    placeholder={`Spazio per causale fattura e importo per fattura vuota. Es. 
Ritiro chiavi a pagamento: 10 €
+19% MWSt.:                1,9 €
_________________________________
Totale:                    11,9 €`}

                    value={this.state.note}
                    onChange={this.onNoteChange}
                ></textarea>
                <div>
                    <button className="button">Salva modifiche</button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    deals: state.deals,
    clienti: state.clienti,
    oggetti: state.oggetti
})

export default connect(mapStateToProps)(FatturaForm)