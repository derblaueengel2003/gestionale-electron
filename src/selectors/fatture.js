// Get visible Fatture

export default (fatture, { fattura }, oggetti, clienti, deals) => {
    return fatture.filter((lafattura) => {
        const deal = deals.find((deal) => deal.id === lafattura.dealId)
        const oggetto = deal ? oggetti.find((ogg) => ogg.id === deal.oggettoId) : ''
        const cliente = clienti.find((cliente) => cliente.id === lafattura.clienteId)
        const cliente2 = clienti.find((cliente) => cliente.id === lafattura.clienteId2)
        let indirizzo = cliente ? `${cliente.nome} ${cliente.cognome} ${cliente.ditta}` : ''
        oggetto ? `${oggetto.rifId} ${oggetto.via} ${oggetto.numeroCivico} ${oggetto.numeroAppartamento} ${oggetto.cap} ${oggetto.citta}` : indirizzo
        cliente2 ? indirizzo += `${cliente2.nome} ${cliente2.cognome} ${cliente2.ditta}` : indirizzo
        
        const numeroFatturaMatch = lafattura.numeroFattura.toLowerCase().includes(fattura.toLowerCase())
        const textMatch = indirizzo.toLowerCase().includes(fattura.toLowerCase())

        return numeroFatturaMatch || textMatch
    }).sort((a, b) => {
        return a.numeroFattura > b.numeroFattura ? -1 : 1
    })

}