// Get Deal Total

export default (deals, auth) => {
    if (auth.uid === 'pCu3H2GQfPWQxMNGwIVTc0Ag0fg1') {
        return deals
        .map((deal) => deal.provvStefano)
        .reduce((sum, value) => sum + value, 0)
    } else {
        return deals
        .map((deal) => deal.provvM2square)
        .reduce((sum, value) => sum + value, 0)
    }

}