const leadsReducerDefaultState = []

export default (state = leadsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_LEAD':
            return [
                ...state,
                action.lead
            ]
        case 'REMOVE_LEAD':
            return state.filter(({ id }) => id !== action.id)
        case 'EDIT_LEAD':
            return state.map((lead) => {
                if (lead.id === action.id) {
                    return {
                        ...lead,
                        ...action.updates
                    }
                } else {
                    return lead
                }
            })
        case 'SET_LEADS':
            return action.leads
        default:
            return state
    }
}