// Get visible Fatture

export default (fatture, { fattura }, oggetti, clienti, deals) => {
    return fatture.filter((lafattura) => {
        const deal = deals.find((deal) => deal.id === lafattura.dealId)
        const oggetto = oggetti.find((ogg) => ogg.id === deal.description)
        const cliente = clienti.find((cliente) => cliente.id === lafattura.clienteId)
        const cliente2 = clienti.find((cliente) => cliente.id === lafattura.clienteId2)
        let indirizzo = `${cliente.nome} ${cliente.cognome} ${cliente.ditta} ${oggetto.rifId} ${oggetto.via} ${oggetto.numeroCivico} ${oggetto.numeroAppartamento} ${oggetto.cap} ${oggetto.citta}`
        cliente2 ? indirizzo += `${cliente2.nome} ${cliente2.cognome} ${cliente2.ditta}` : indirizzo
        
        const numeroFatturaMatch = lafattura.numeroFattura.toLowerCase().includes(fattura.toLowerCase())
        const textMatch = indirizzo.toLowerCase().includes(fattura.toLowerCase())

        return numeroFatturaMatch || textMatch
    })

}