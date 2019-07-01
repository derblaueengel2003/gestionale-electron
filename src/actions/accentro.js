import database from '../firebase/firebase'

// SET_ACCENTRO
export const setAccentro = (accentro) => ({
    type: 'SET_ACCENTRO',
    accentro
})

// export const startSetAccentro
export const startSetAccentro = () => {
    return (dispatch) => {
        return database.ref(`accentro`).once('value').then((snapshot) => {
            const accentro = []

            snapshot.forEach((childSnapshot) => {
                accentro.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            dispatch(setAccentro(accentro))
        })
    }
}
