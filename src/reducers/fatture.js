// Fatture Reducer

const fattureReducerDefaultState = []

export default (state = fattureReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_FATTURA':
            return [
                ...state,
                action.fattura
            ]
        case 'REMOVE_FATTURA':
            return state.filter(({ id }) => id !== action.id)
        case 'EDIT_FATTURA':
            return state.map((fattura) => {
                if (fattura.id === action.id) {
                    return {
                        ...fattura,
                        ...action.updates
                    }
                } else {
                    return fattura
                }
            })
        case 'SET_FATTURE':
            return action.fatture
        default:
            return state
    }
}
