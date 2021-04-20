import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import ideas from './ideas_reducer';
import rooms from './rooms_reducer';

const RootReducer = combineReducers({
  session,
  errors,
  ideas,
  rooms
});

export default RootReducer;
