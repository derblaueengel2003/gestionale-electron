import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'

export class DealForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: props.deal? props.deal.description : '',
            rifId: props.deal ? props.deal.rifId : '',
            prezzoDiVendita: props.deal ? (props.deal.prezzoDiVendita / 100).toString() : '0',
            amount: props.deal ? (props.deal.amount / 100).toString() : '',
            consulenteVendita: props.deal ? props.deal.consulenteVendita : '',
            provvM2square: props.deal ? (props.deal.provvM2square / 100).toString() : '',
            payed: props.deal ? props.deal.payed : false,
            payedAt: props.deal ? moment(props.deal.payedAt) : moment(),
            provvStefano: props.deal ? (props.deal.provvStefano / 100).toString() : '',
            payedStefano: props.deal ? props.deal.payedStefano : false,
            payedAtStefano: props.deal ? moment(props.deal.payedAtStefano) : moment(),
            calendarPayedAtStefanoFocused: false,
            agenziaPartner: props.deal ? props.deal.agenziaPartner : '',
            provvAgenziaPartner: props.deal ? (props.deal.provvAgenziaPartner / 100).toString() : '0',
            payedAgenziaPartner: props.deal ? props.deal.payedAgenziaPartner : false,
            createdAt: props.deal ? moment(props.deal.createdAt) : moment(),
            calendarFocused: false,
            calendarPayedAtFocused: false,
            venditoreNome: props.deal ? props.deal.venditoreNome : '',
            venditoreNome2: props.deal ? props.deal.venditoreNome2 : '',
            acquirenteNome: props.deal ? props.deal.acquirenteNome : '',
            acquirenteNome2: props.deal ? props.deal.acquirenteNome2 : '',
            numeroFattura: props.deal ? props.deal.numeroFattura : '',
            dataFattura: props.deal ? moment(props.deal.dataFattura) : moment(),
            calendarDataFatturaFocused: false,
            dataRogito: props.deal ? moment(props.deal.dataRogito) : moment(),
            calendarDataRogitoFocused: false,
            note: props.deal ? props.deal.note : '',
            error: '',
            modificato: '',
            provvSum: 0
        }
    }

    changeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        this.setState(() => ({ [name]: value, modificato: { ...this.state.modificato, [name]: 'modificato' }  }))
    }
    onAmountChange = (event) => {
        const name = event.target.name
        const value = event.target.value

        if (!value || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ [name]: value, modificato: { ...this.state.modificato, [name]: 'modificato' } }))
        }
    }
    onPayedChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        console.log(event)
        this.setState(() => ({ [name]: !value }))
    }
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }))
        }
    }
    onPayedAtDateChange = (payedAt) => {
        if (payedAt) {
            this.setState(() => ({ payedAt }))
        }
    }
    onDataFatturaChange = (dataFattura) => {
        if (dataFattura) {
            this.setState(() => ({ dataFattura }))
        }
    }
    onDataRogitoChange = (dataRogito) => {
        if (dataRogito) {
            this.setState(() => ({ dataRogito }))
        }
    }
    onPayedAtDateStefanoChange = (payedAtStefano) => {
        if (payedAtStefano) {
            this.setState(() => ({ payedAtStefano }))
        }
    }
    
    onFocusPayedAtChange = ({ focused }) => {
        this.setState(() => ({ calendarPayedAtFocused: focused }))
    }
    onFocusPayedAtStefanoChange = ({ focused }) => {
        this.setState(() => ({ calendarPayedAtStefanoFocused: focused }))
    }
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }))
    }
    onFocusDataFatturaChange = ({ focused }) => {
        this.setState(() => ({ calendarDataFatturaFocused: focused }))
    }
    onFocusDataRogitoChange = ({ focused }) => {
        this.setState(() => ({ calendarDataRogitoFocused: focused }))
    }
   
    onSubmit = (e) => {
        e.preventDefault()
        const prezzoDiVendita = parseFloat(this.state.prezzoDiVendita, 10) * 100
        const amount = parseFloat(this.state.amount, 10) * 100
        const provvM2square = parseFloat(this.state.provvM2square, 10) * 100
        const provvStefano = parseFloat(this.state.provvStefano, 10) * 100
        const provvAgenziaPartner = parseFloat(this.state.provvAgenziaPartner, 10) * 100
        const provvSum = provvM2square + provvStefano + provvAgenziaPartner
        
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: 'Inserisci descrizione e importo totale.'}))
        } else if (amount !== provvSum) {
            const differenza = (provvSum - amount) / 100
            this.setState(() => ({ error: `La somma delle provvigioni non corrisponde al totale. Differenza di ${differenza} €.`}))
        } else {
            this.setState(() => ({ error: '' }))
            this.props.onSubmit({
                description: this.state.description,
                rifId: this.state.rifId,
                prezzoDiVendita,
                amount,
                consulenteVendita: this.state.consulenteVendita,
                provvM2square,
                payed: this.state.payed,
                payedAt: this.state.payedAt.valueOf(),
                provvStefano,
                payedStefano: this.state.payedStefano,
                payedAtStefano: this.state.payedAtStefano.valueOf(),
                agenziaPartner: this.state.agenziaPartner,
                provvAgenziaPartner,
                payedAgenziaPartner: this.state.payedAgenziaPartner,
                createdAt: this.state.createdAt.valueOf(),
                venditoreNome: this.state.venditoreNome,
                venditoreNome2: this.state.venditoreNome2,
                acquirenteNome: this.state.acquirenteNome,
                acquirenteNome2: this.state.acquirenteNome2,
                numeroFattura: this.state.numeroFattura,
                dataFattura: this.state.dataFattura.valueOf(),
                dataRogito: this.state.dataRogito.valueOf(),
                note: this.state.note,
            })
        }
    }
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                Indirizzo:
                <input
                    className={`text-input text-input--${this.state.modificato.description}`}
                    type="text"
                    placeholder="Indirizzo"
                    autoFocus
                    value={this.state.description}
                    name="description"
                    onChange={this.changeHandler}
                />
                Riferimento ID:
                <input
                    className={`text-input text-input--${this.state.modificato.rifId}`}
                    type="text"
                    placeholder="ID"
                    value={this.state.rifId}
                    name="rifId"
                    onChange={this.changeHandler}
                />
                Prezzo di Vendita:
                <input
                    className={`text-input text-input--${this.state.modificato.prezzoDiVendita}`}
                    type="text"
                    placeholder="Prezzo di vendita"
                    value={this.state.prezzoDiVendita}
                    name="prezzoDiVendita"
                    onChange={this.onAmountChange}
                />
                Importo totale:
                <input
                    className={`text-input text-input--${this.state.modificato.amount}`}
                    type="text"
                    placeholder={`6%: ${parseFloat(this.state.prezzoDiVendita, 10) * 0.06}`}
                    value={this.state.amount}
                    name="amount"
                    onChange={this.onAmountChange}
                />
                Cliente di:
                <select 
                    value={this.state.consulenteVendita}
                    name="consulenteVendita"
                    onChange={this.changeHandler}
                    >
                    {this.props.utenti.map((consulente) => 
                        <option key={consulente.id} 
                        value={consulente.name}>
                        {consulente.name}
                        </option>)}
                </select>
                Provvigione m2Square:
                <input
                    className={`text-input text-input--${this.state.modificato.provvM2square}`}
                    type="text"
                    placeholder={`80%: ${parseFloat(this.state.amount, 10) * 0.8}`}
                    value={this.state.provvM2square}
                    name="provvM2square"
                    onChange={this.onAmountChange}
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
               Provvigione Stefano:
               <input
                    className={`text-input text-input--${this.state.modificato.provvStefano}`}
                    type="text"
                    placeholder={`20%: ${parseFloat(this.state.amount, 10) * 0.2}`}
                    value={this.state.provvStefano}
                    name="provvStefano"
                    onChange={this.onAmountChange}
                 /> 

                <label>Pagata&nbsp;
                <input
                        type="checkbox"
                        name="payedStefano"
                        checked={this.state.payedStefano}
                        onChange={this.onPayedChange}
                    />
                </label>
                <div className={`visible-${this.state.payedStefano} form`}>
                    Data Pagamento:
                    <SingleDatePicker
                        date={this.state.payedAtStefano}
                        onDateChange={this.onPayedAtDateStefanoChange}
                        focused={this.state.calendarPayedAtStefanoFocused}
                        onFocusChange={this.onFocusPayedAtStefanoChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                </div>
                Agenzia Partner:
                <select
                    value={this.state.agenziaPartner}
                    name="agenziaPartner"
                    onChange={this.changeHandler}
                >
                    <option value=""></option>

                    {this.props.clienti.map((cliente) =>
                        <option key={cliente.id}
                            value={cliente.name}>
                            {cliente.name}
                        </option>)}
                </select>
                Provvigione Agenzia Partner 
                <input
                    className={`text-input text-input--${this.state.modificato.provvAgenziaPartner}`}
                    type="text"
                    placeholder="Provvigione Agenzia Partner"
                    value={this.state.provvAgenziaPartner}
                    name="provvAgenziaPartner"
                    onChange={this.onAmountChange}
                />
                <label>Pagata&nbsp;
                <input
                        type="checkbox"
                        name="payedAgenziaPartner"
                        checked={this.state.payedAgenziaPartner}
                        onChange={this.onPayedChange}
                    />
                </label>
                Data Prenotazione: 
                <SingleDatePicker 
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}                    
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                Venditore:
                <select 
                    value={this.state.venditoreNome}
                    name="venditoreNome"
                    onChange={this.changeHandler}
                    >
                    <option value=""></option>

                    {this.props.clienti.map((cliente) => 
                        <option key={cliente.id} 
                        value={cliente.name}>
                        {cliente.name}
                        </option>)}
                </select>
                Secondo Venditore:
                <select 
                    value={this.state.venditoreNome2}
                    name="venditoreNome2"
                    onChange={this.changeHandler}
                    >
                    <option value=""></option>
                    {this.props.clienti.map((cliente) => 
                        <option key={cliente.id} 
                        value={cliente.name}>
                        {cliente.name}
                        </option>)}
                </select>
                Acquirente:
                <select 
                    value={this.state.acquirenteNome}
                    name="acquirenteNome"
                    onChange={this.changeHandler}
                    >
                    <option value=""></option>

                    {this.props.clienti.map((cliente) => 
                        <option key={cliente.id} 
                        value={cliente.name}>
                        {cliente.name}
                        </option>)}
                </select>
                Secondo Acquirente:
                <select 
                    value={this.state.acquirenteNome2}
                    name="acquirenteNome2"
                    onChange={this.changeHandler}
                    >
                    <option value=""></option>

                    {this.props.clienti.map((cliente) => 
                        <option key={cliente.id} 
                        value={cliente.name}>
                        {cliente.name}
                        </option>)}
                </select>        
                Numero Fattura:
                <input
                    className={`text-input text-input--${this.state.modificato.numeroFattura}`}
                    type="text"
                    placeholder="Numero Fattura"
                    value={this.state.numeroFattura}
                    name="numeroFattura"
                    onChange={this.changeHandler}
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
                Data Rogito:
                <SingleDatePicker
                    date={this.state.dataRogito}
                    onDateChange={this.onDataRogitoChange}
                    focused={this.state.calendarDataRogitoFocused}
                    onFocusChange={this.onFocusDataRogitoChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                <textarea
                    className={`textarea text-input--${this.state.modificato.note}`}
                    placeholder="Nota  (opzionale)"
                    value={this.state.note}
                    name="note"
                    onChange={this.changeHandler}
                ></textarea>
                <div>
                    <button className="button">Salva modifiche</button>
                </div>  
            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    utenti: state.utenti,
    clienti: state.clienti
})

export default connect(mapStateToProps)(DealForm)