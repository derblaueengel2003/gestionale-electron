import database from '../firebase/firebase'


// ADD_DEAL
export const addDeal = (deal) => ({
    type: 'ADD_DEAL',
    deal
})

export const startAddDeal = (dealData = {}) => {
    return (dispatch) => {
        const {
            description = '',
            rifId = '',
            prezzoDiVendita = 0,
            amount = 0,
            provvM2square = 0,
            provvStefano = 0,
            provvAgenziaPartner = 0,
            createdAt = 0,
            payed = false,
            payedAt = 0,
            note = '',
            venditoreNome = '',
            venditoreNome2 = '',
            acquirenteNome = '',
            acquirenteNome2 = '',
            consulenteVendita = '',
            numeroFattura = '',
            dataFattura = 0,
            dataRogito = 0,
            dataPrenotazione = 0

        } = dealData
        const deal = { 
            description, 
            rifId,
            prezzoDiVendita,
            amount, 
            provvM2square, 
            provvStefano, 
            provvAgenziaPartner, 
            createdAt, 
            payed, 
            payedAt, 
            note, 
            venditoreNome, 
            venditoreNome2, 
            acquirenteNome,
            acquirenteNome2,
            consulenteVendita,
            numeroFattura
         }

        return database.ref(`deals`).push(deal).then((ref) => {
            dispatch(addDeal({
                id: ref.key,
                ...deal
            }))
        })
    }       
}

// REMOVE_DEAL
export const removeDeal = ({ id } = {}) => ({
    type: 'REMOVE_DEAL',
    id
})

export const startRemoveDeal = ({ id } = {}) => {
    return (dispatch) => {
        return database.ref(`deals/${id}`).remove().then(() => {
            dispatch(removeDeal({ id }))
        })
    }
}

//EDIT_DEAL
export const editDeal = (id, updates) => ({
    type: 'EDIT_DEAL',
    id,
    updates
})

export const startEditDeal = (id, updates) => {
    return (dispatch) => {
        return database.ref(`deals/${id}`).update(updates).then(() => {
            dispatch(editDeal(id, updates))
        })
    }
}

// SET_DEALS
export const setDeals = (deals) => ({
    type: 'SET_DEALS',
    deals
})

// export const startSetDeals
export const startSetDeals = () => {
    return (dispatch) => {
        return database.ref(`deals`).once('value').then((snapshot) => {
            const deals = []

            snapshot.forEach((childSnapshot) => {
                deals.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            dispatch(setDeals(deals))
        })
    }
}