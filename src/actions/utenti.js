import database from '../firebase/firebase'


// ADD_USER
export const addUser = (user) => ({
    type: 'ADD_USER',
    user
})

export const startAddUser = (userData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        const {
            name = '',
            role = ''
        } = userData
        const user = { name, role }

        return database.ref(`/utenti`).push(user).then((ref) => {
            dispatch(addUser({
                id: ref.key,
                ...user
            }))
        })
    }       
}

// REMOVE_USER
export const removeUser = ({ id } = {}) => ({
    type: 'REMOVE_USER',
    id
})

export const startRemoveUser = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`/utenti/${id}`).remove().then(() => {
            dispatch(removeUser({ id }))
        })
    }
}

//EDIT_USER
export const editUser = (id, updates) => ({
    type: 'EDIT_USER',
    id,
    updates
})

export const startEditUser = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`/utenti/${id}`).update(updates).then( () => {
            dispatch(editUser(id, updates))
        })
    }
}

// SET_USERS
export const setUsers = (utenti) => ({
    type: 'SET_USERS',
    utenti
})

// export const startSetExpenses
export const startSetUsers = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`utenti`).once('value').then((snapshot) => {
            const utenti = []

            snapshot.forEach((childSnapshot) => {
                utenti.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            dispatch(setUsers(utenti))
        })
    }
}