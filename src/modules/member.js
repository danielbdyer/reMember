import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import moment from 'moment';

/**
 |--------------------------------------------------
 | Types
 |--------------------------------------------------
 */
export const MEMBER_CREATE_REQUEST = 'MEMBER_CREATE_REQUEST';
export const MEMBER_CREATE_SUCCESS = 'MEMBER_CREATE_SUCCESS';
export const MEMBER_CREATE_FAILURE = 'MEMBER_CREATE_FAILURE';
export const MEMBER_UPDATE_REQUEST = 'MEMBER_UPDATE_REQUEST';
export const MEMBER_UPDATE_SUCCESS = 'MEMBER_UPDATE_SUCCESS';
export const MEMBER_UPDATE_FAILURE = 'MEMBER_UPDATE_FAILURE';
export const MEMBER_DELETE_REQUEST = 'MEMBER_DELETE_REQUEST';
export const MEMBER_DELETE_SUCCESS = 'MEMBER_DELETE_SUCCESS';
export const MEMBER_DELETE_FAILURE = 'MEMBER_DELETE_FAILURE';
export const MEMBER_LIST_GET_REQUEST = 'MEMBER_LIST_GET_REQUEST';
export const MEMBER_LIST_GET_SUCCESS = 'MEMBER_LIST_GET_SUCCESS';
export const MEMBER_LIST_GET_FAILURE = 'MEMBER_LIST_GET_FAILURE';

/**
 |--------------------------------------------------
 | Actions
 |--------------------------------------------------
 */
export const createMember = ({ name, email }) => {
  const { currentUser } = firebase.auth();
  const eventDate = moment().format('dddd MMM Do YYYY');

  return (dispatch) => {
    dispatch({ type: MEMBER_CREATE_REQUEST });

    firebase.database().ref(`/houston/community`)
    .push({ name, email })
    .then(() => {
      dispatch({ type: MEMBER_CREATE_SUCCESS });
    })
    .catch(() => {
      dispatch({ type: MEMBER_CREATE_FAILURE, payload: 'Member creation failed' });
    });

    firebase.database().ref(`/houston/events/${eventDate}/attendees`)
      .push({ name, email })
      .then(() => {
        dispatch({ type: MEMBER_CREATE_SUCCESS });

        Actions.memberList({ type: 'reset' });
      })
      .catch(() => {
        dispatch({ type: MEMBER_CREATE_FAILURE, payload: 'Member creation failed' });
      });
  };
};

export const updateMember = ({ name, email, uid }) => {
  const eventDate = moment().format('dddd MMM Do YYYY');
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: MEMBER_UPDATE_REQUEST });

    firebase.database().ref(`/houston/community/${uid}`)
      .set({ name, email })
      .then(() => {
        dispatch({ type: MEMBER_UPDATE_SUCCESS });
      })
      .catch(() => {
        dispatch({ type: MEMBER_UPDATE_FAILURE, payload: 'Member edition failed' });
      });

    firebase.database().ref(`/houston/events/${eventDate}/attendees/${uid}`)
      .set({ name, email })
      .then(() => {
        dispatch({ type: MEMBER_UPDATE_SUCCESS });

        Actions.memberList({ type: 'reset' });
      })
      .catch(() => {
        dispatch({ type: MEMBER_UPDATE_FAILURE, payload: 'Member edition failed' });
      });
  };
};

export const deleteMember = ({ uid }) => {
  const eventDate = moment().format('dddd MMM Do YYYY');
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: MEMBER_DELETE_REQUEST });

    firebase.database().ref(`/houston/events/${eventDate}/attendees/${uid}`)
      .remove()
      .then(() => {
        dispatch({ type: MEMBER_DELETE_SUCCESS });

        Actions.memberList({ type: 'reset' });
      })
      .catch(() => {
        dispatch({ type: MEMBER_DELETE_FAILURE, payload: 'Member deletion failed' });
      });
  };
};

export const getMemberList = () => {
  const eventDate = moment().format('dddd MMM Do YYYY');
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: MEMBER_LIST_GET_REQUEST });

    firebase.database().ref(`/houston/events/${eventDate}/attendees`)
      .on('value', (snapshot) => {
        console.log(snapshot);
        dispatch({ type: MEMBER_LIST_GET_SUCCESS, payload: snapshot.val() });
      });
  };
};

/**
 |--------------------------------------------------
 | Reducer
 |--------------------------------------------------
 */
const INITIAL_STATE = {
  list: [],
  error: '',
  loading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MEMBER_CREATE_REQUEST:
      return { ...state, loading: true };
    case MEMBER_CREATE_SUCCESS:
      return { ...state, error: '', loading: false };
    case MEMBER_CREATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case MEMBER_UPDATE_REQUEST:
      return { ...state, loading: true };
    case MEMBER_UPDATE_SUCCESS:
      return { ...state, error: '', loading: false };
    case MEMBER_UPDATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case MEMBER_DELETE_REQUEST:
      return { ...state, loading: true };
    case MEMBER_DELETE_SUCCESS:
      return { ...state, error: '', loading: false };
    case MEMBER_DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case MEMBER_LIST_GET_REQUEST:
      return { ...state, loading: true };
    case MEMBER_LIST_GET_SUCCESS:
      return { ...state, ...INITIAL_STATE, list: action.payload };
    case MEMBER_LIST_GET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
