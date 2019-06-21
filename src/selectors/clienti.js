import moment from 'moment'

// Get visible customers

export default (clienti, { cliente }) => {
    return clienti.filter((ilcliente) => {
        const nameMatch = ilcliente.name.toLowerCase().includes(cliente.toLowerCase())
        const dittaMatch = ilcliente.ditta.toLowerCase().includes(cliente.toLowerCase())
    return nameMatch || dittaMatch
    })

}