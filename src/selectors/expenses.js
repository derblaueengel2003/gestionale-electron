import moment from 'moment'

// Get visible expenses

export default (expenses, { text, sortBy, startDate, endDate }, auth) => {
    if (auth.uid === 'pCu3H2GQfPWQxMNGwIVTc0Ag0fg1') {
        return expenses.filter((expense) => {
            const createdAtMoment = moment(expense.createdAt)
            const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true
            const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
            const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())
            const sellerMatch = expense.provvStefano > 0
    
            return startDateMatch && endDateMatch && textMatch && sellerMatch
        }).sort((a, b) => {
            if (sortBy === 'date') {
                return a.createdAt < b.createdAt ? 1 : -1
            } else if (sortBy === 'amount') {
                return a.amount < b.amount ? 1 : -1
            }
        })
    } else {
        return expenses.filter((expense) => {
            const createdAtMoment = moment(expense.createdAt)
            const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true
            const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
            const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())
    
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