import { combineReducers } from 'redux';
import messages from './messages';
import auth from './auth';
import profile from './profile';

export default combineReducers({
  messages,
  auth,
  profile
});
