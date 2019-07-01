import React from 'react'

export default class OggettoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            via: props.oggetto ? props.oggetto.via : '',
            numeroCivico: props.oggetto ? props.oggetto.numeroCivico : '',
            cap: props.oggetto ? props.oggetto.cap : '',
            citta: props.oggetto ? props.oggetto.citta : '',
            nazione: props.oggetto ? props.oggetto.nazione : '',
            numeroAppartamento: props.oggetto ? props.oggetto.numeroAppartamento : '',
            rifId: props.oggetto ? props.oggetto.rifId : ''
        }
    }
    changeHandler = (e) => { 
        const name = e.target.name
        const value = e.target.value
        this.setState({ [name]: value })
    }
    onSubmit = (e) => {
        e.preventDefault()
    
        if (!this.state.via || !this.state.rifId) {
            this.setState(() => ({ error: 'Inserisci via e riferimento Id.'}))
        } else {
            this.setState(() => ({ error: '' }))
            this.props.onSubmit({
                via: this.state.via,
                numeroCivico: this.state.numeroCivico,
                cap: this.state.cap,
                citta: this.state.citta,
                nazione: this.state.nazione,
                numeroAppartamento: this.state.numeroAppartamento,
                rifId: this.state.rifId
            })
        }
    }
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                Via:
                <input
                    name="via"
                    className={`text-input`}
                    type="text"
                    placeholder="Via"
                    autoFocus
                    value={this.state.via}
                    onChange={this.changeHandler}
                />
                Numero Civico:
                <input
                    name="numeroCivico"
                    className={`text-input`}
                    type="text"
                    placeholder="Numero Civico"
                    value={this.state.numeroCivico}
                    onChange={this.changeHandler}
                />
                CAP:
                <input
                    name="cap"
                    className={`text-input`}
                    type="text"
                    placeholder="CAP"
                    value={this.state.cap}
                    onChange={this.changeHandler}
                />
                Città:
                <input
                    name="citta"
                    className={`text-input`}
                    type="text"
                    placeholder="Città"
                    value={this.state.citta}
                    onChange={this.changeHandler}
                />
                Nazione:
                <input
                    name="nazione"
                    className={`text-input`}
                    type="text"
                    placeholder="Nazione"
                    value={this.state.nazione}
                    onChange={this.changeHandler}
                />
                Numero Appartamento:
                <input
                    name="numeroAppartamento"
                    className={`text-input`}
                    type="text"
                    placeholder="WE numero"
                    value={this.state.numeroAppartamento}
                    onChange={this.changeHandler}
                />
                Rif. Id:
                <input
                    name="rifId"
                    className={`text-input`}
                    type="text"
                    placeholder="Rif. Id"
                    value={this.state.rifId}
                    onChange={this.changeHandler}
                />
                <div>
                    <button className="button">Salva modifiche</button>
                </div>
            </form>
        )
    }
}