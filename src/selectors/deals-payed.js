// Get Deal Payed

export default (deals, auth) => {
    if (auth.uid === 'pCu3H2GQfPWQxMNGwIVTc0Ag0fg1') {
        return deals
        .filter((deal) => deal.payed)
        .map((deal) => deal.provvStefano)
        .reduce((sum, value) => sum + value, 0)
    } else {
        return deals
        .filter((deal) => deal.payed)
        .map((deal) => deal.provvM2square)
        .reduce((sum, value) => sum + value, 0)
    }

}