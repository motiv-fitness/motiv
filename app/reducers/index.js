import { combineReducers } from 'redux';
import { routerReducers} from 'react-router-redux';
import messages from './messages';
import auth from './auth';
import profile from './profile';
import goals from './goals';
import feed from './feed'
import favresource from './favresource'


export default combineReducers({
  messages,
  auth,
  profile,
  goals,
  feed,
  favresource
});
