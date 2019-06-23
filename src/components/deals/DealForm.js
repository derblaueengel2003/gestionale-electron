import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'

export class DealForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: props.deal ? props.deal.description : '',
            prezzoDiVendita: props.deal ? (props.deal.prezzoDiVendita / 100).toString() : '0',
            amount: props.deal ? (props.deal.amount / 100).toString() : '',
            consulenteVendita: props.deal ? props.deal.consulenteVendita : '',
            provvM2square: props.deal ? (props.deal.provvM2square / 100).toString() : '',
            provvStefano: props.deal ? (props.deal.provvStefano / 100).toString() : '',
            payedStefano: props.deal ? props.deal.payedStefano : false,
            payedAtStefano: props.deal ? props.deal.payedAtStefano && moment(props.deal.payedAtStefano) : null,
            calendarPayedAtStefanoFocused: false,
            agenziaPartnerId: props.deal ? props.deal.agenziaPartnerId : '',
            provvAgenziaPartner: props.deal ? (props.deal.provvAgenziaPartner / 100).toString() : '0',
            payedAgenziaPartner: props.deal ? props.deal.payedAgenziaPartner : false,
            createdAt: props.deal ? props.deal.createdAt && moment(props.deal.createdAt) : null,
            calendarFocused: false,
            venditoreId: props.deal ? props.deal.venditoreId : '',
            venditoreId2: props.deal ? props.deal.venditoreId2 : '',
            acquirenteId: props.deal ? props.deal.acquirenteId : '',
            acquirenteId2: props.deal ? props.deal.acquirenteId2 : '',
            dataRogito: props.deal ? props.deal.dataRogito && moment(props.deal.dataRogito) : null,
            calendarDataRogitoFocused: false,
            note: props.deal ? props.deal.note : '',
            error: '',
            modificato: '',
            provvSum: 0
        }
    }
    onOggettoChange = (e) => {
        const oggetto = e.target.value
        this.setState(() => ({ description: oggetto }))
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
    onConsulenteVenditaChange = (e) => {
        const consulenteVendita = e.target.value
        this.setState(() => ({ consulenteVendita }))
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
    onPayedStefanoChange = () => {
        this.setState(() => ({ payedStefano: !this.state.payedStefano }))
        this.state.payedStefano === false && this.setState({ payedAtStefano: null})
    }
    onPayedAtDateStefanoChange = (payedAtStefano) => {
        if (payedAtStefano) {
            this.setState(() => ({ payedAtStefano }))
        }
    }
    onFocusPayedAtStefanoChange = ({ focused }) => {
        this.setState(() => ({ calendarPayedAtStefanoFocused: focused }))
    }
    onAgenziaPartnerChange = (e) => {
        const agenziaPartnerId = e.target.value
        this.setState(() => ({ agenziaPartnerId }))
    }
    onProvvAgenziaPartnerChange = (e) => {
        const provvAgenziaPartner = e.target.value

        if (!provvAgenziaPartner || provvAgenziaPartner.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ provvAgenziaPartner, modificato: { ...this.state.modificato, provvAgenziaPartner: 'modificato' }}))
        }
    }
    onPayedAgenziaPartnerChange = () => {
        this.setState(() => ({ payedAgenziaPartner: !this.state.payedAgenziaPartner }))
    }
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }))
        }
    }
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }))
    }
    onVenditoreIdChange = (e) => {
        const venditoreId = e.target.value
        this.setState(() => ({ venditoreId }))
    }
    onVenditoreIdChange2 = (e) => {
        const venditoreId2 = e.target.value
        this.setState(() => ({ venditoreId2 }))
    }
    onAcquirenteIdChange = (e) => {
        const acquirenteId = e.target.value
        this.setState(() => ({ acquirenteId }))
    }
    onAcquirenteIdChange2 = (e) => {
        const acquirenteId2 = e.target.value
        this.setState(() => ({ acquirenteId2 }))
    }
    onDataRogitoChange = (dataRogito) => {
        if (dataRogito) {
            this.setState(() => ({ dataRogito }))
        }
    }
    onFocusDataRogitoChange = ({ focused }) => {
        this.setState(() => ({ calendarDataRogitoFocused: focused }))
    }
    onNoteChange = (e) => {
        const note = e.target.value
        this.setState(() => ({ note, modificato: { ...this.state.modificato, note: 'modificato' } }))
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
                prezzoDiVendita,
                amount,
                consulenteVendita: this.state.consulenteVendita,
                provvM2square,
                provvStefano,
                payedStefano: this.state.payedStefano,
                payedAtStefano: this.state.payedAtStefano ? this.state.payedAtStefano.valueOf() : null,
                agenziaPartnerId: this.state.agenziaPartnerId,
                provvAgenziaPartner,
                payedAgenziaPartner: this.state.payedAgenziaPartner,
                createdAt: this.state.createdAt ? this.state.createdAt.valueOf() : null,
                venditoreId: this.state.venditoreId,
                venditoreId2: this.state.venditoreId2,
                acquirenteId: this.state.acquirenteId,
                acquirenteId2: this.state.acquirenteId2,
                dataRogito: this.state.dataRogito ? this.state.dataRogito.valueOf(): null,
                note: this.state.note,
            })
        }
    }
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <div>
                    <button className="button">Salva modifiche</button>
                </div>         
                Oggetto:
                <select
                    value={this.state.description}
                    onChange={this.onOggettoChange}
                >
                    <option value=""></option>
                    {this.props.oggetti.map((oggetto) =>
                        <option key={oggetto.id}
                            value={oggetto.id}>
                            {`Rif.Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`}
                        </option>)}
                </select>   
                Data Prenotazione:
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
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
                    placeholder={`80%: ${parseFloat((this.state.amount - this.state.provvAgenziaPartner), 10) * 0.8}`}
                    value={this.state.provvM2square}
                    onChange={this.onProvvM2squareChange}
               />
                
               Provvigione Stefano:
               <input
                    className={`text-input text-input--${this.state.modificato.provvStefano}`}
                    type="text"
                    placeholder={`20%: ${parseFloat((this.state.amount - this.state.provvAgenziaPartner), 10) * 0.2}`}
                    value={this.state.provvStefano}
                    onChange={this.onProvvStefanoChange}
                 /> 
                <label>Pagata&nbsp;
                <input
                        type="checkbox"
                        name="payedStefano"
                        checked={this.state.payedStefano}
                        onChange={this.onPayedStefanoChange}
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
                    value={this.state.agenziaPartnerId}
                    onChange={this.onAgenziaPartnerChange}
                >
                    <option value=""></option>

                    {this.props.clienti.map((cliente) =>
                        <option key={cliente.id}
                        value={cliente.id}>
                            {`${cliente.nome} ${cliente.cognome}`}{cliente.ditta && ` - Firma ${cliente.ditta}`}
                        </option>)}
                </select>
                Provvigione Agenzia Partner 
                <input
                    className={`text-input text-input--${this.state.modificato.provvAgenziaPartner}`}
                    type="text"
                    placeholder="Provvigione Agenzia Partner"
                    value={this.state.provvAgenziaPartner}
                    onChange={this.onProvvAgenziaPartnerChange}
                />
                <label>Pagata&nbsp;
                <input
                        type="checkbox"
                        name="payedAgenziaPartner"
                        checked={this.state.payedAgenziaPartner}
                        onChange={this.onPayedAgenziaPartnerChange}
                    />
                </label>
                Venditore:
                <select 
                    value={this.state.venditoreId}
                    onChange={this.onVenditoreIdChange}
                    >
                    <option value=""></option>

                    {this.props.clienti.map((cliente) => 
                        <option key={cliente.id} 
                        value={cliente.id}>
                        {`${cliente.nome} ${cliente.cognome}`}{cliente.ditta && ` - Firma ${cliente.ditta}`}
                        </option>)}
                </select>
                Secondo Venditore:
                <select 
                    value={this.state.venditoreId2}
                    onChange={this.onVenditoreIdChange2}
                    >
                    <option value=""></option>
                    {this.props.clienti.map((cliente) => 
                        <option key={cliente.id} 
                        value={cliente.id}>
                        {`${cliente.nome} ${cliente.cognome}`}{cliente.ditta && ` - Firma ${cliente.ditta}`}
                        </option>)}
                </select>
                Acquirente:
                <select 
                    value={this.state.acquirenteId}
                    onChange={this.onAcquirenteIdChange}
                    >
                    <option value=""></option>

                    {this.props.clienti.map((cliente) => 
                        <option key={cliente.id} 
                        value={cliente.id}>
                        {`${cliente.nome} ${cliente.cognome}`}{cliente.ditta && ` - Firma ${cliente.ditta}`}
                        </option>)}
                </select>
                Secondo Acquirente:
                <select 
                    value={this.state.acquirenteId2}
                    onChange={this.onAcquirenteIdChange2}
                    >
                    <option value=""></option>

                    {this.props.clienti.map((cliente) => 
                        <option key={cliente.id} 
                        value={cliente.id}>
                        {`${cliente.nome} ${cliente.cognome}`}{cliente.ditta && ` - Firma ${cliente.ditta}`}
                        </option>)}
                </select>        
                              
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
    clienti: state.clienti,
    oggetti: state.oggetti
})

export default connect(mapStateToProps)(DealForm)