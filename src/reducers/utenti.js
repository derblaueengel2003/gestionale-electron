//Utente Reducer

const utentiReducerDefaultState = []

export default (state = utentiReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return [
                ...state,
                action.user
            ]
        case 'REMOVE_USER':
            return state.filter(({ id }) => id !== action.id)
        case 'EDIT_USER':
            return state.map((user) => {
                if (user.id === action.id) {
                    return {
                        ...user,
                        ...action.updates
                    }
                } else {
                    return user
                }
            })
        case 'SET_USERS':
            return action.utenti
        default:
            return state
    }
}