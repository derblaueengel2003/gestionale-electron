import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import Select from 'react-virtualized-select'
import createFilterOptions from 'react-select-fast-filter-options'
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

export class DealForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: props.deal ? props.deal.description : '',
            prezzoDiVendita: props.deal ? (props.deal.prezzoDiVendita / 100).toString() : '0',
            amount: props.deal ? (props.deal.amount / 100).toString() : '',
            consulenteVendita: props.deal ? props.deal.consulenteVendita : '',
            provvM2square: props.deal ? (props.deal.provvM2square / 100).toString() : '',
            dealType: props.deal ? props.deal.dealType : '',
            // payed: props.deal ? props.deal.payed : false,
            // payedAt: props.deal ? props.deal.payedAt && moment(props.deal.payedAt) : null,
            // calendarPayedAtFocused: false,
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
            notaioId: props.deal ? props.deal.notaioId: '',
            dataRogito: props.deal ? props.deal.dataRogito && moment(props.deal.dataRogito) : null,
            calendarDataRogitoFocused: false,
            belastungsVollmacht: props.deal ? props.deal.belastungsVollmacht : false,
            // numeroFattura: props.deal ? props.deal.numeroFattura : '',
            // dataFattura: props.deal ? props.deal.dataFattura && moment(props.deal.dataFattura) : null,
            note: props.deal ? props.deal.note : '',
            error: '',
            modificato: '',
            provvSum: 0
        }
    }
    onOggettoChange = (e) => {
        const oggetto = e ? e.value : ''
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
        const consulenteVendita = e ? e.value : ''
        this.setState(() => ({ consulenteVendita }))
    }
    onProvvM2squareChange = (e) => {
        const provvM2square = e.target.value

        if (!provvM2square || provvM2square.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ provvM2square, modificato: { ...this.state.modificato, provvM2square: 'modificato' }}))
        }
    }
    // onPayedChange = () => {
    //     this.setState(() => ({ payed: !this.state.payed }))
    //     this.state.payed === false && this.setState({ payedAt: null })
    // }
    // onPayedAtDateChange = (payedAt) => {
    //     if (payedAt) {
    //         this.setState(() => ({ payedAt }))
    //     }
    // }
    // onFocusPayedAtChange = ({ focused }) => {
    //     this.setState(() => ({ calendarPayedAtFocused: focused }))
    // }
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
        const agenziaPartnerId = e ? e.value : ''
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
        const venditoreId = e ? e.value : ''
        this.setState(() => ({ venditoreId }))
    }
    onVenditoreIdChange2 = (e) => {
        const venditoreId2 = e ? e.value : ''
        this.setState(() => ({ venditoreId2 }))
    }
    onAcquirenteIdChange = (e) => {
        const acquirenteId = e ? e.value : ''
        this.setState(() => ({ acquirenteId }))
    }
    onAcquirenteIdChange2 = (e) => {
        const acquirenteId2 = e ? e.value : ''
        this.setState(() => ({ acquirenteId2 }))
    }
    onNotaioIdChange = (e) => {
        const notaioId = e ? e.value : ''
        this.setState(() => ({ notaioId }))
    }
    onDataRogitoChange = (dataRogito) => {
        if (dataRogito) {
            this.setState(() => ({ dataRogito }))
        }
    }
    onFocusDataRogitoChange = ({ focused }) => {
        this.setState(() => ({ calendarDataRogitoFocused: focused }))
    }
    onBelastungsVollmachtChange = () => {
        this.setState(() => ({ belastungsVollmacht: !this.state.belastungsVollmacht }))
    }
    // onNumeroFatturaChange = (e) => {
    //     const numeroFattura = e.target.value
    //     this.setState(() => ({ numeroFattura, modificato: { ...this.state.modificato, numeroFattura: 'modificato'} }) )
    // }
    // onDataFatturaChange = (dataFattura) => {
    //     if (dataFattura) {
    //         this.setState(() => ({ dataFattura }))
    //     } else {
    //         this.setState(() => ({ dataFattura: null}))
    //     }
    // }
    // onFocusDataFatturaChange = ({ focused }) => {
    //     this.setState(() => ({ calendarDataFatturaFocused: focused }))
    // }
    onNoteChange = (e) => {
        const note = e.target.value
        this.setState(() => ({ note, modificato: { ...this.state.modificato, note: 'modificato' } }))
    }
    onDealTypeChange = (e) => { 
        const dealType = e.value
        this.setState(() => ({ dealType }))
    }

    onSubmit = (e) => {
        e.preventDefault()
        const prezzoDiVendita = parseFloat(this.state.prezzoDiVendita, 10) * 100
        const amount = parseFloat(this.state.amount, 10) * 100
        const provvM2square = parseFloat(this.state.provvM2square, 10) * 100
        const provvStefano = parseFloat(this.state.provvStefano, 10) * 100
        const provvAgenziaPartner = parseFloat(this.state.provvAgenziaPartner, 10) * 100
        const provvSum = provvM2square + provvStefano + provvAgenziaPartner
        
        if (!this.state.description || !this.state.amount || !this.state.acquirenteId) {
            this.setState(() => ({ error: 'Inserisci oggetto, importo totale e acquirente.'}))
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
                dealType: this.state.dealType,
                // payed: this.state.payed,
                // payedAt: this.state.payedAt ? this.state.payedAt.valueOf() : null,
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
                notaioId: this.state.notaioId,
                dataRogito: this.state.dataRogito ? this.state.dataRogito.valueOf(): null,
                belastungsVollmacht: this.state.belastungsVollmacht,
                calendarDataFatturaFocused: false,
                // numeroFattura: this.state.numeroFattura,
                // dataFattura: this.state.dataFattura ? this.state.dataFattura.valueOf() : null,
                note: this.state.note
            })
        }
    }
    
    render() {

        const options = this.props.clienti.map((cliente) => ({
                value: cliente.id, label: `${cliente.nome} ${cliente.cognome} ${cliente.ditta &&  `- Firma ${cliente.ditta}`}`
            }))    
        const filterOptions = createFilterOptions({ options })

        const oggettiOptions = this.props.oggetti.map((oggetto) => ({
            value: oggetto.id, label: `Rif.Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`
        }))
        const dealTypeOptions = ['Kauf Eigentumswohnung', 'Miete Eigentumswohnung', 'Kauf Gewerbe', 'Miete Gewerbe', 'APH', 'Sonstiges'].map((dealType) => ({
            value: dealType, label: dealType
        }))

        const consulenteVenditaOptions = this.props.utenti.map((consulente) => ({
            value: consulente.id, label: consulente.name
        }))    

        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <div>
                    <button className="button">Salva modifiche</button>
                </div>     
                Tipologia di provvigione:
                <Select
                    name="dealType"
                    value={this.state.dealType}
                    options={dealTypeOptions}
                    onChange={this.onDealTypeChange}
                />

                Oggetto:
                <Select
                        name="description"
                        value={this.state.description}
                        options={oggettiOptions}
                        onChange={this.onOggettoChange}
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
                <Select
                name="consulentevendita"
                value={this.state.consulenteVendita}
                options={consulenteVenditaOptions}
                onChange={this.onConsulenteVenditaChange}

               />
                Provvigione m2Square:
                <input
                    className={`text-input text-input--${this.state.modificato.provvM2square}`}
                    type="text"
                    placeholder={`80%: ${parseFloat((this.state.amount - this.state.provvAgenziaPartner), 10) * 0.8}`}
                    value={this.state.provvM2square}
                    onChange={this.onProvvM2squareChange}
               />
                {/*
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
                */}  
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
                <Select
                name="agenziapartner"
                value={this.state.agenziaPartnerId}
                options={options}
                filterOptions={filterOptions}
                onChange={this.onAgenziaPartnerChange}
                />

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
                <Select
                        name="venditore"
                        value={this.state.venditoreId}
                        options={options}
                        filterOptions={filterOptions}
                        onChange={this.onVenditoreIdChange}

                />

                Secondo Venditore:
                <Select
                name="venditore2"
                value={this.state.venditoreId2}
                options={options}
                filterOptions={filterOptions}
                onChange={this.onVenditoreIdChange2}

                />
                Acquirente:
                <Select
                name="acquirente"
                value={this.state.acquirenteId}
                options={options}
                filterOptions={filterOptions}
                onChange={this.onAcquirenteIdChange}

                />
                Secondo Acquirente:
                <Select
                name="acquirente2"
                value={this.state.acquirenteId2}
                options={options}
                filterOptions={filterOptions}
                onChange={this.onAcquirenteIdChange2}

                />
                Notaio:
                <Select
                    name="notaio"
                    value={this.state.notaioId}
                    options={options}
                    filterOptions={filterOptions}
                    onChange={this.onNotaioIdChange}

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
                <label>Belastungsvollmacht&nbsp;
                <input
                    type="checkbox"
                    name="belastungsVollmacht"
                    checked={this.state.belastungsVollmacht}
                    onChange={this.onBelastungsVollmachtChange}
                    />
                </label>
                {/*
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
                    showClearDate={true}
                    numberOfMonths={1}
                    isOutsideRange={() => false}

                />
                */}  
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