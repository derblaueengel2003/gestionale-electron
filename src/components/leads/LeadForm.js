import React from 'react'

export default class CustomerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            leadNome: props.lead ? props.lead.leadNome : '',
            leadCognome: props.lead ? props.lead.leadCognome : ''
        }
    }
    changeHandler = (e) => { 
        const name = e.target.name
        const value = e.target.value
        this.setState({ [name]: value })
    }
    onSubmit = (e) => {
        e.preventDefault()
    
        if (!this.state.leadNome || !this.state.leadCognome) {
            this.setState(() => ({ error: 'Inserisci nome e cognome.'}))
        } else {
            this.setState(() => ({ error: '' }))
            this.props.onSubmit({
                leadNome: this.state.leadNome,
                leadCognome: this.state.leadCognome
            })
        }
    }
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}

                Nome:
                <input
                    name="leadNome"
                    className={`text-input`}
                    type="text"
                    placeholder="Nome"
                    value={this.state.leadNome}
                    onChange={this.changeHandler}
                />
                Cognome:
                <input
                    name="leadCognome"
                    className={`text-input`}
                    type="text"
                    placeholder="Cognome"
                    value={this.state.leadCognome}
                    onChange={this.changeHandler}
                />
   
                <div>
                    <button className="button">Salva modifiche</button>
                </div>
            </form>
        )
    }
}