import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import { reset } from 'redux-form';
import moment from 'moment';

/**
 |--------------------------------------------------
 | Types
 |--------------------------------------------------
 */
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';

/**
|--------------------------------------------------
| Actions
|--------------------------------------------------
*/
export const signInUser = ({ email, password }) => (dispatch) => {
  const eventDate = moment().format('dddd MMM Do YYYY');

  dispatch({ type: SIGN_IN_REQUEST });

  firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const adminUID = userCredential.user.uid;

      dispatch({ type: SIGN_IN_SUCCESS, payload: userCredential });

      dispatch(reset('signin'));

      firebase.database().ref(`houston/community/${adminUID}`).once('value')
        .then((snapshot) => {
          const fullname = snapshot.val().name;
          firebase.database().ref(`/houston/events/${eventDate}/admin/`).child(`${adminUID}`)
            .set({ fullname, email })
          });

      Actions.memberList();
    })
    .catch((error) => { dispatch({ type: SIGN_IN_FAILURE, payload: authFailMessage(error.code) }); });
};

export const signUpUser = ({ email, password, name }) => (dispatch) => {

  dispatch({ type: SIGN_UP_REQUEST });

  firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
    .then((userCredential) => {
      firebase.database().ref(`houston/community`).child(userCredential.user.uid)
        .set({ name, email })
        .then(() => {
          dispatch({ type: SIGN_UP_SUCCESS, payload: userCredential });

          dispatch(reset('signup'));

          Actions.memberList();
        });
    })
    .catch((error) => { dispatch({ type: SIGN_UP_FAILURE, payload: authFailMessage(error.code) }); });
};

export const clearState = () => (
  { type: SET_INITIAL_STATE }
);

export const signOutUser = () => (dispatch) => {
  dispatch({ type: SET_INITIAL_STATE });

  firebase.auth().signOut();
};

const authFailMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Email is invalid.';
    case 'auth/user-disabled':
      return 'User is disabled.';
    case 'auth/user-not-found':
      return 'User not found.';
    case 'auth/wrong-password':
      return 'Password is invalid.';
    case 'auth/email-already-in-use':
      return 'Email address is already in use.';
    case 'auth/weak-password':
      return 'Password is not strong enough.';
    default:
      return 'Authentication failed.';
  }
};

/**
 |--------------------------------------------------
 | Reducer
 |--------------------------------------------------
 */
const INITIAL_STATE = {
  error: '',
  loading: false,
  user: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return { ...state, ...INITIAL_STATE, loading: true };
    case SIGN_UP_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case SIGN_UP_FAILURE:
      return { ...state, ...INITIAL_STATE, error: action.payload };
    case SIGN_IN_REQUEST:
      return { ...state, ...INITIAL_STATE, loading: true };
    case SIGN_IN_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case SIGN_IN_FAILURE:
      return { ...state, ...INITIAL_STATE, error: action.payload };
    case SET_INITIAL_STATE:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};

export default reducer;
