import React from 'react'

export default class CustomerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            leadNome: props.lead ? props.lead.leadNome : '',
            leadEmail: props.lead ? props.lead.leadEmail : '',
            leadTelefono: props.lead ? props.lead.leadTelefono : '',
            leadBudget: props.lead ? (props.lead.leadBudget / 100).toString() : '',
            leadOggettoStato: props.lead ? props.lead.leadOggettoStato : '',
            leadNote: props.lead ? props.lead.leadNote : ''
        }
    }
    changeHandler = (e) => { 
        const name = e.target.name
        const value = e.target.value
        this.setState({ [name]: value })
    }
    onBudgetChange = (e) => {
        const leadBudget = e.target.value
        if (!leadBudget || leadBudget.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ leadBudget }))
        }
    }
    onSubmit = (e) => {
        e.preventDefault()
        const leadBudget = parseFloat(this.state.leadBudget, 10) * 100

        if (!this.state.leadNome || this.state.leadBudget < 1) {
            this.setState(() => ({ error: 'Inserisci nome, cognome e budget'}))
        } else {
            this.setState(() => ({ error: '' }))
            this.props.onSubmit({
                leadNome: this.state.leadNome,
                leadEmail: this.state.leadEmail,
                leadTelefono: this.state.leadTelefono,
                leadBudget,
                leadOggettoStato: this.state.leadOggettoStato,
                leadNote: this.state.leadNote
            })
        }
    }
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}

                Nome:
                <input
                    autoFocus
                    name="leadNome"
                    className={`text-input`}
                    type="text"
                    placeholder="Nome e cognome"
                    value={this.state.leadNome}
                    onChange={this.changeHandler}
                />
                Email:
                <input
                    name="leadEmail"
                    className={`text-input`}
                    type="text"
                    placeholder="Email"
                    value={this.state.leadEmail}
                    onChange={this.changeHandler}
                />
                Telefono:
                <input
                    name="leadTelefono"
                    className={`text-input`}
                    type="text"
                    placeholder="Telefono"
                    value={this.state.leadTelefono}
                    onChange={this.changeHandler}
                />   
                Budget:
                <input
                    className={`text-input`}
                    type="text"
                    placeholder="Budget del cliente"
                    value={this.state.leadBudget}
                    onChange={this.onBudgetChange}
                />
                Affittato/Libero:
                <select
                    name="leadOggettoStato"
                    value={this.state.leadOggettoStato}
                    onChange={this.changeHandler}>
                    <option value="libero">Libero</option>
                    <option value="affittato">Affittato</option>
                    <option value="">Indifferente</option>
                </select>        
                <textarea
                    name="leadNote"
                    className={`textarea`}
                    placeholder="Ulteriori caratteristiche"
                    value={this.state.leadNote}
                    onChange={this.changeHandler}
                >
            </textarea>        
                <div>
                    <button className="button">Salva modifiche</button>
                </div>
            </form>
        )
    }
}