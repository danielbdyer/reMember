import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import auth from './modules/auth';
import member from './modules/member';

const reducers = combineReducers({
  auth,
  member,
  form: formReducer,
});

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default store;
