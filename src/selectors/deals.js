import moment from 'moment'

// Get visible deals

export default (deals, { text, sortBy, startDate, endDate }, auth) => {
    if (auth.uid === 'pCu3H2GQfPWQxMNGwIVTc0Ag0fg1') {
        return deals.filter((deal) => {
            const createdAtMoment = moment(deal.createdAt)
            const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true
            const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
            const textMatch = deal.description.toLowerCase().includes(text.toLowerCase())
            const sellerMatch = deal.provvStefano > 0
    
            return startDateMatch && endDateMatch && textMatch && sellerMatch
        }).sort((a, b) => {
            if (sortBy === 'date') {
                return a.createdAt < b.createdAt ? 1 : -1
            } else if (sortBy === 'amount') {
                return a.amount < b.amount ? 1 : -1
            }
        })
    } else {
        return deals.filter((deal) => {
            const createdAtMoment = moment(deal.createdAt)
            const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true
            const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
            const textMatch = deal.description.toLowerCase().includes(text.toLowerCase())
    
            return startDateMatch && endDateMatch && textMatch
        }).sort((a, b) => {
            if (sortBy === 'date') {
                return a.createdAt < b.createdAt ? 1 : -1
            } else if (sortBy === 'amount') {
                return a.amount < b.amount ? 1 : -1
            }
        })
    }
    
}