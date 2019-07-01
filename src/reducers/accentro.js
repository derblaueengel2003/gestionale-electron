//Oggetti Reducer

const accentroReducerDefaultState = []

export default (state = accentroReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_ACCENTRO':
            return action.accentro
        default:
            return state
    }
}