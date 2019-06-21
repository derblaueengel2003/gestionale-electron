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
            prezzoDiVendita = 0,
            amount = 0,
            provvM2square = 0,
            provvStefano = 0,
            agenziaPartner = '',
            provvAgenziaPartner = 0,
            payedAgenziaPartner = false,
            createdAt = null,
            payed = false,
            payedAt = null,
            payedStefano = false,
            payedAtStefano = null,
            note = '',
            venditoreNome = '',
            venditoreNome2 = '',
            acquirenteNome = '',
            acquirenteNome2 = '',
            consulenteVendita = '',
            numeroFattura = '',
            dataFattura = null,
            dataRogito = null
        } = dealData
        const deal = { 
            description,
            prezzoDiVendita,
            amount, 
            provvM2square, 
            provvStefano, 
            payedAtStefano,
            payedStefano,
            agenziaPartner,
            provvAgenziaPartner, 
            payedAgenziaPartner,
            createdAt, 
            payed, 
            payedAt, 
            note, 
            venditoreNome, 
            venditoreNome2, 
            acquirenteNome,
            acquirenteNome2,
            consulenteVendita,
            numeroFattura,
            dataFattura,
            dataRogito
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