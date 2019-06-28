
// Get visible leads

export default (leads, { lead }) => {
    return leads.filter((illead) => {
        const nameMatch = illead.leadNome.toLowerCase().includes(lead.toLowerCase())
        const cognomeMatch = illead.leadCognome.toLowerCase().includes(lead.toLowerCase())
    return nameMatch || cognomeMatch
    })

}