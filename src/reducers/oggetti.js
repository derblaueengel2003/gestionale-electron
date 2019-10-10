//Oggetti Reducer

const oggettiReducerDefaultState = []

export default (state = oggettiReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_OGGETTO':
            return [
                ...state,
                action.oggetto
            ]
        case 'REMOVE_OGGETTO':
            return state.filter(({ id }) => id !== action.id)
        case 'EDIT_OGGETTO':
            return state.map((oggetto) => {
                if (oggetto.id === action.id) {
                    return {
                        ...oggetto,
                        ...action.updates
                    }
                } else {
                    return oggetto
                }
            })
        case 'SET_OGGETTI':
            return action.oggetti
        default:
            return state
    }
}