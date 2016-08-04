import { combineReducers } from 'redux';
import { routerReducers} from 'react-router-redux';
import messages from './messages';
import auth from './auth';
import regime from './regime';
import profile from './profile';
import goals from './goals'

export default combineReducers({
  messages,
  auth,
  profile,
  regime,
  goals
});
