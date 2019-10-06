import React from 'react'

export default class UserForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.user ? props.user.name : '',
            role: props.user ? props.user.role : ''
        }
    }
    onNameChange = (e) => {
        const name = e.target.value
        this.setState(() => ({ name }))
    }
    onRoleChange = (e) => {
        const role = e.target.value
        this.setState(() => ({ role }))
    }
    onSubmit = (e) => {
        e.preventDefault()
    
        if (!this.state.name || !this.state.role) {
            this.setState(() => ({ error: 'Inserisci nome e ruolo.'}))
        } else {
            this.setState(() => ({ error: '' }))
            this.props.onSubmit({
                name: this.state.name,
                role: this.state.role
            })
        }
    }
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                Nome e Cognome:
                <input
                    className={`text-input`}
                    type="text"
                    placeholder="Nome e cognome"
                    autoFocus
                    value={this.state.name}
                    onChange={this.onNameChange}
                />
                Ruolo:
                <input
                    className={`text-input`}
                    type="text"
                    placeholder="Ruolo"
                    value={this.state.role}
                    onChange={this.onRoleChange}
                />
                <div>
                    <button className="button">Salva modifiche</button>
                </div>
            </form>
        )
    }
}