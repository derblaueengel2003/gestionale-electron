
// Get visible leads

export default (leads, { lead, leadStato }) => {
    return leads.filter((illead) => {
        const budgetMatch = illead.leadBudget >= (lead * 100)
        const statoMatch = illead.leadOggettoStato === leadStato || leadStato === '' || illead.leadOggettoStato === ''
    return budgetMatch && statoMatch
    }).sort((a, b) => {
        return a.leadBudget > b.leadBudget ? 1 : -1
    })

}