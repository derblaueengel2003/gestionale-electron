import React from 'react'

export default class CustomerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nome: props.customer ? props.customer.nome : '',
            cognome: props.customer ? props.customer.cognome : '',
            titolo: props.customer ? props.customer.titolo : '',
            ditta: props.customer ? props.customer.ditta : '',
            indirizzo: props.customer ? props.customer.indirizzo : '',
            indirizzo2: props.customer ? props.customer.indirizzo2 : '',
            cap: props.customer ? props.customer.cap : '',
            comune: props.customer ? props.customer.comune : '',
            nazione: props.customer ? props.customer.nazione : '',
            email: props.customer ? props.customer.email : '',
            telefono1: props.customer ? props.customer.telefono1 : ''
        }
    }
    changeHandler = (e) => { 
        const name = e.target.name
        const value = e.target.value
        this.setState({ [name]: value })
    }
    onSubmit = (e) => {
        e.preventDefault()
    
        if (!this.state.nome || !this.state.cognome) {
            this.setState(() => ({ error: 'Inserisci nome e cognome.'}))
        } else {
            this.setState(() => ({ error: '' }))
            this.props.onSubmit({
                nome: this.state.nome,
                cognome: this.state.cognome,
                titolo: this.state.titolo,
                ditta: this.state.ditta,
                indirizzo: this.state.indirizzo,
                indirizzo2: this.state.indirizzo2,
                cap: this.state.cap,
                comune: this.state.comune,
                nazione: this.state.nazione,
                email: this.state.email,
                telefono1: this.state.telefono1
            })
        }
    }
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                Titolo:
                <input
                    name="titolo"
                    className={`text-input`}
                    type="text"
                    autoFocus
                    placeholder="Titolo"
                    value={this.state.titolo}
                    onChange={this.changeHandler}
                />
                Nome:
                <input
                    name="nome"
                    className={`text-input`}
                    type="text"
                    placeholder="Nome"
                    value={this.state.nome}
                    onChange={this.changeHandler}
                />
                Cognome:
                <input
                    name="cognome"
                    className={`text-input`}
                    type="text"
                    placeholder="Cognome"
                    value={this.state.cognome}
                    onChange={this.changeHandler}
                />
                Ditta:
                <input
                    name="ditta"
                    className={`text-input`}
                    type="text"
                    placeholder="Ditta"
                    value={this.state.ditta}
                    onChange={this.changeHandler}
                />
                Indirizzo:
                <input
                    name="indirizzo"
                    className={`text-input`}
                    type="text"
                    placeholder="Via e numero civico"
                    value={this.state.indirizzo}
                    onChange={this.changeHandler}
                />
                Indirizzo ulteriore:
                <input
                    name="indirizzo2"
                    className={`text-input`}
                    type="text"
                    placeholder="c/o"
                    value={this.state.indirizzo2}
                    onChange={this.changeHandler}
                />
                Cap:
                <input
                    name="cap"
                    className={`text-input`}
                    type="text"
                    placeholder="cap"
                    value={this.state.cap}
                    onChange={this.changeHandler}
                />
                Città:
                <input
                    name="comune"
                    className={`text-input`}
                    type="text"
                    placeholder="Città"
                    value={this.state.comune}
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
                Email:
                <input
                    name="email"
                    className={`text-input`}
                    type="text"
                    placeholder="indirizzo email"
                    value={this.state.email}
                    onChange={this.changeHandler}
                />
                Telefono:
                <input
                    name="telefono1"
                    className={`text-input`}
                    type="text"
                    placeholder="Numero di telefono"
                    value={this.state.telefono1}
                    onChange={this.changeHandler}
                />
                <div>
                    <button className="button">Salva modifiche</button>
                </div>
            </form>
        )
    }
}