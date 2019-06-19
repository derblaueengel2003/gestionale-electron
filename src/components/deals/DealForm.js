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
            provvM2square: props.deal ? (props.deal.provvM2square / 100).toString() : '',
            provvStefano: props.deal ? (props.deal.provvStefano / 100).toString() : '',
            provvAgenziaPartner: props.deal ? (props.deal.provvAgenziaPartner / 100).toString() : '0',
            payed: props.deal ? props.deal.payed : false,
            createdAt: props.deal ? moment(props.deal.createdAt) : moment(),
            payedAt: props.deal ? moment(props.deal.payedAt) : moment(),
            note: props.deal ? props.deal.note : '',
            calendarFocused: false,
            calendarPayedAtFocused: false,
            error: '',
            modificato: '',
            provvSum: 0,
            venditoreNome: props.deal ? props.deal.venditoreNome : '',
            venditoreNome2: props.deal ? props.deal.venditoreNome2 : '',
            acquirenteNome: props.deal ? props.deal.acquirenteNome : '',
            acquirenteNome2: props.deal ? props.deal.acquirenteNome2 : '',
            consulenteVendita: props.deal ? props.deal.consulenteVendita : '',
            numeroFattura: props.deal ? props.deal.numeroFattura : '',

            dataFattura: props.deal ? moment(props.deal.dataFattura) : moment(),
            dataRogito: props.deal ? moment(props.deal.dataRogito) : moment(),
            dataPrenotazione: props.deal ? moment(props.deal.dataPrenotazione) : moment()
        }
    }
    onDescriptionChange = (e) => {
        const description = e.target.value
        this.setState(() => ({ description, modificato: { ...this.state.modificato, description: 'modificato'} }))
    }
    onRifIdChange = (e) => {
        const rifId = e.target.value
        this.setState(() => ({ rifId, modificato: { ...this.state.modificato, rifId: 'modificato'} }))
    }
    onPrezzoDiVenditaChange = (e) => {
        const prezzoDiVendita = e.target.value

        if (!prezzoDiVendita || prezzoDiVendita.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ prezzoDiVendita, modificato: { ...this.state.modificato, prezzoDiVendita: 'modificato' } }))
        }
    }
    onAmountChange = (e) => {
        const amount = e.target.value

        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount, modificato: { ...this.state.modificato, amount: 'modificato' } }))
        }
    }
    onProvvM2squareChange = (e) => {
        const provvM2square = e.target.value

        if (!provvM2square || provvM2square.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ provvM2square, modificato: { ...this.state.modificato, provvM2square: 'modificato' }}))
        }
    }
    onProvvStefanoChange = (e) => {
        const provvStefano = e.target.value

        if (!provvStefano || provvStefano.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ provvStefano, modificato: { ...this.state.modificato, provvStefano: 'modificato' }}))
        }
    }
    onProvvAgenziaPartnerChange = (e) => {
        const provvAgenziaPartner = e.target.value

        if (!provvAgenziaPartner || provvAgenziaPartner.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ provvAgenziaPartner, modificato: { ...this.state.modificato, provvAgenziaPartner: 'modificato' }}))
        }
    }
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }))
        }
    }
    onPayedChange = () => {
        this.setState(() => ({ payed: !this.state.payed }))
    }
    onPayedAtDateChange = (payedAt) => {
        if (payedAt) {
            this.setState(() => ({ payedAt }))
        }
    }
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }))
    }
    onFocusPayedAtChange = ({ focused }) => {
        this.setState(() => ({ calendarPayedAtFocused: focused }))
    }
    onNoteChange = (e) => {
        const note = e.target.value
        this.setState(() => ({ note, modificato: { ...this.state.modificato, note: 'modificato'} }) )
    }
    onVenditoreNomeChange = (e) => {
        const venditoreNome = e.target.value
        this.setState(() => ({ venditoreNome }))
    }
    onVenditoreNomeChange2 = (e) => {
        const venditoreNome2 = e.target.value
        this.setState(() => ({ venditoreNome2 }))
    }
    onAcquirenteNomeChange = (e) => {
        const acquirenteNome = e.target.value
        this.setState(() => ({ acquirenteNome }))
    }
    onAcquirenteNomeChange2 = (e) => {
        const acquirenteNome2 = e.target.value
        this.setState(() => ({ acquirenteNome2 }))
    }
    onConsulenteVenditaChange = (e) => {
        const consulenteVendita = e.target.value
        this.setState(() => ({ consulenteVendita }))
    }
    onNumeroFatturaChange = (e) => {
        const numeroFattura = e.target.value
        this.setState(() => ({ numeroFattura, modificato: { ...this.state.modificato, numeroFattura: 'modificato'} }) )
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
                provvM2square,
                provvStefano,
                provvAgenziaPartner,
                createdAt: this.state.createdAt.valueOf(),
                payed: this.state.payed,
                payedAt: this.state.payedAt.valueOf(),
                note: this.state.note,
                consulenteVendita: this.state.consulenteVendita,
                venditoreNome: this.state.venditoreNome,
                venditoreNome2: this.state.venditoreNome2,
                acquirenteNome: this.state.acquirenteNome,
                acquirenteNome2: this.state.acquirenteNome2,
                numeroFattura: this.state.numeroFattura
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
                    onChange={this.onDescriptionChange}
                />
                Riferimento ID:
                <input
                    className={`text-input text-input--${this.state.modificato.rifId}`}
                    type="text"
                    placeholder="ID"
                    value={this.state.rifId}
                    onChange={this.onRifIdChange}
                />
                Prezzo di Vendita:
                <input
                    className={`text-input text-input--${this.state.modificato.prezzoDiVendita}`}
                    type="text"
                    placeholder="Prezzo di vendita"
                    value={this.state.prezzoDiVendita}
                    onChange={this.onPrezzoDiVenditaChange}
                />
                Importo totale:
                <input
                    className={`text-input text-input--${this.state.modificato.amount}`}
                    type="text"
                    placeholder={`6%: ${parseFloat(this.state.prezzoDiVendita, 10) * 0.06}`}
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                Cliente di:
                <select 
                    value={this.state.consulenteVendita}
                    onChange={this.onConsulenteVenditaChange}
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
                    onChange={this.onProvvM2squareChange}
               />
               Provvigione Stefano:
               <input
                    className={`text-input text-input--${this.state.modificato.provvStefano}`}
                    type="text"
                    placeholder={`20%: ${parseFloat(this.state.amount, 10) * 0.2}`}
                    value={this.state.provvStefano}
                    onChange={this.onProvvStefanoChange}
                 /> 
                Provvigione Agenzia Partner 
                <input
                    className={`text-input text-input--${this.state.modificato.provvAgenziaPartner}`}
                    type="text"
                    placeholder="Provvigione Agenzia Partner"
                    value={this.state.provvAgenziaPartner}
                    onChange={this.onProvvAgenziaPartnerChange}
                />
                Data Prenotazione: 
                <SingleDatePicker 
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
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
                    Venditore:
                    <select 
                        value={this.state.venditoreNome}
                        onChange={this.onVenditoreNomeChange}
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
                        onChange={this.onVenditoreNomeChange2}
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
                        onChange={this.onAcquirenteNomeChange}
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
                        onChange={this.onAcquirenteNomeChange2}
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
                        onChange={this.onNumeroFatturaChange}
                    /> 
                <textarea
                    className={`textarea text-input--${this.state.modificato.note}`}
                    placeholder="Nota  (opzionale)"
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
    utenti: state.utenti,
    clienti: state.clienti
})

export default connect(mapStateToProps)(DealForm)