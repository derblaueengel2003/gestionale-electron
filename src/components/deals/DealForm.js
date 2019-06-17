import React from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'

export default class DealForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: props.deal? props.deal.description : '',
            amount: props.deal ? (props.deal.amount / 100).toString() : '',
            provvM2square: props.deal ? (props.deal.provvM2square / 100).toString() : '0',
            provvStefano: props.deal ? (props.deal.provvStefano / 100).toString() : '0',
            provvAgenziaPartner: props.deal ? (props.deal.provvAgenziaPartner / 100).toString() : '0',
            payed: props.deal ? props.deal.payed : false,
            createdAt: props.deal ? moment(props.deal.createdAt) : moment(),
            payedAt: props.deal ? moment(props.deal.payedAt) : moment(),
            note: props.deal ? props.deal.note : '',
            calendarFocused: false,
            calendarPayedAtFocused: false,
            error: '',
            modificato: '',
            provvSum: 0
        }
    }
    onDescriptionChange = (e) => {
        const description = e.target.value
        this.setState(() => ({ description, modificato: { ...this.state.modificato, description: 'modificato'} }))
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
    onSubmit = (e) => {
        e.preventDefault()
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
                amount,
                provvM2square,
                provvStefano,
                provvAgenziaPartner,
                createdAt: this.state.createdAt.valueOf(),
                payed: this.state.payed,
                payedAt: this.state.payedAt.valueOf(),
                note: this.state.note
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
                Importo totale:
                <input
                    className={`text-input text-input--${this.state.modificato.amount}`}
                    type="text"
                    placeholder="Provvigione totale"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                Provvigione m2Square:
                <input
                    className={`text-input text-input--${this.state.modificato.provvM2square}`}
                    type="text"
                    placeholder="Provvigione m2Square"
                    value={this.state.provvM2square}
                    onChange={this.onProvvM2squareChange}
               />
               Provvigione Stefano:
               <input
                    className={`text-input text-input--${this.state.modificato.provvStefano}`}
                    type="text"
                    placeholder="Provvigione Stefano"
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