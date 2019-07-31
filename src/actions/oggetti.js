import database from '../firebase/firebase'


// ADD_OGGETTO
export const addOggetto = (oggetto) => ({
    type: 'ADD_OGGETTO',
    oggetto
})

export const startAddOggetto = (oggettoData = {}) => {
    return (dispatch) => {
        const {
            via = '',
            numeroCivico = '',
            cap = '',
            numeroAppartamento = '',
            citta = '',
            nazione = '',
            rifId = '',
            grundbuchBlatt = '',
            grundbuch = '',
            m2 = '',
            piano = '',
            mobilio = '',
            stato = '',
            wohngeld = 0,
            affittoNetto = 0,
            verwalter = ''
        } = oggettoData
        const oggetto = { via, numeroCivico, numeroAppartamento, cap, citta, nazione, rifId, grundbuch, grundbuchBlatt, m2, piano, mobilio, stato, wohngeld, affittoNetto, verwalter }

        return database.ref(`/oggetti`).push(oggetto).then((ref) => {
            dispatch(addOggetto({
                id: ref.key,
                ...oggetto
            }))
        })
    }       
}

// REMOVE_OGGETTO
export const removeOggetto = ({ id } = {}) => ({
    type: 'REMOVE_OGGETTO',
    id
})

export const startRemoveOggetto = ({ id } = {}) => {
    return (dispatch) => {
        return database.ref(`/oggetti/${id}`).remove().then(() => {
            dispatch(removeOggetto({ id }))
        })
    }
}

//EDIT_OGGETTO
export const editOggetto = (id, updates) => ({
    type: 'EDIT_OGGETTO',
    id,
    updates
})

export const startEditOggetto = (id, updates) => {
    return (dispatch) => {
        return database.ref(`/oggetti/${id}`).update(updates).then( () => {
            dispatch(editOggetto(id, updates))
        })
    }
}

// SET_OGGETTI
export const setOggetti = (oggetti) => ({
    type: 'SET_OGGETTI',
    oggetti
})

// export const startSetOggetti
export const startSetOggetti = () => {
    return (dispatch) => {
        return database.ref(`oggetti`).once('value').then((snapshot) => {
            const oggetti = []

            snapshot.forEach((childSnapshot) => {
                oggetti.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            dispatch(setOggetti(oggetti))
        })
    }
}