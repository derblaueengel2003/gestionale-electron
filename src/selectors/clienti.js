import moment from 'moment'

// Get visible customers

export default (clienti, { cliente }) => {
    return clienti.filter((ilcliente) => {
        const nameMatch = ilcliente.nome.toLowerCase().includes(cliente.toLowerCase())
        const cognomeMatch = ilcliente.cognome.toLowerCase().includes(cliente.toLowerCase())
        const dittaMatch = ilcliente.ditta.toLowerCase().includes(cliente.toLowerCase())
    return nameMatch || cognomeMatch || dittaMatch
    })

}