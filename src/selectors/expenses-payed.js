// Get Expense Payed

export default (expenses, auth) => {
    if (auth.uid === 'pCu3H2GQfPWQxMNGwIVTc0Ag0fg1') {
        return expenses
        .filter((expense) => expense.payed)
        .map((expense) => expense.provvStefano)
        .reduce((sum, value) => sum + value, 0)
    } else {
        return expenses
        .filter((expense) => expense.payed)
        .map((expense) => expense.provvM2square)
        .reduce((sum, value) => sum + value, 0)
    }

}