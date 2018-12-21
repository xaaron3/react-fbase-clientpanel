import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
// Reducers
// @TODO

const firebaseConfig = {
   apiKey: "AIzaSyDzsCVwHSv5Y4ga2c59-dHwmrvhhb2WHWM",
   authDomain: "reactclientpanel-f17c9.firebaseapp.com",
   databaseURL: "https://reactclientpanel-f17c9.firebaseio.com",
   projectId: "reactclientpanel-f17c9",
   storageBucket: "reactclientpanel-f17c9.appspot.com",
   messagingSenderId: "828380117572"
};

// react-redux-firebase config
const rrfConfig = {
   userProfile: 'users',
   useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// init firebase instance
firebase.initializeApp(firebaseConfig);
// init firestore
// const firestore = firebase.firestore()

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
   reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
   reduxFirestore(firebase) // <- needed if using firestore
 )(createStore);

 // Add firebase to reducers
const rootReducer = combineReducers({
   firebase: firebaseReducer,
   firestore: firestoreReducer // <- needed if using firestore
})

 // create initial state
const initialState = {};

 // create store 
const store = createStoreWithFirebase(rootReducer, initialState, compose(
   //  reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;