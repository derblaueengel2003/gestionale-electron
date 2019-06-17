// Deals Reducer

const dealsReducerDefaultState = []

export default (state = dealsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_DEAL':
            return [
                ...state,
                action.deal
            ]
        case 'REMOVE_DEAL':
            return state.filter(({ id }) => id !== action.id)
        case 'EDIT_DEAL':
            return state.map((deal) => {
                if (deal.id === action.id) {
                    return {
                        ...deal,
                        ...action.updates
                    }
                } else {
                    return deal
                }
            })
        case 'SET_DEALS':
            return action.deals
        default:
            return state
    }
}
