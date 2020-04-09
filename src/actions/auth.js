import { firebase } from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid,
});

export const startLogin = () => {
  return () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // return firebase.auth().signInWithPopup(googleAuthProvider)
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  };
};

export const logout = () => ({
  type: 'LOGOUT',
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
