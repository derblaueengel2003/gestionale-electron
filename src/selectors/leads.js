
// Get visible leads

export default (leads, { lead, leadStato, sortBy }) => {
    return leads.filter((illead) => {
        const budgetMatch = illead.leadBudget >= (lead * 100) && illead.leadBudget <= (lead *120) || !lead
        const statoMatch = illead.leadOggettoStato === leadStato || leadStato === '' || illead.leadOggettoStato === ''
    return budgetMatch && statoMatch
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.leadCreatedAt < b.leadCreatedAt ? 1 : -1
        } else if (sortBy === 'amount') {
            return a.leadBudget > b.leadBudget ? 1 : -1
        }
    })

}