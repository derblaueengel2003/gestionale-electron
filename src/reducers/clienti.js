//Utente Reducer

const clientiReducerDefaultState = []

export default (state = clientiReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_CUSTOMER':
            return [
                ...state,
                action.customer
            ]
        case 'REMOVE_CUSTOMER':
            return state.filter(({ id }) => id !== action.id)
        case 'EDIT_CUSTOMER':
            return state.map((customer) => {
                if (customer.id === action.id) {
                    return {
                        ...customer,
                        ...action.updates
                    }
                } else {
                    return customer
                }
            })
        case 'SET_CUSTOMERS':
            return action.clienti
        default:
            return state
    }
}