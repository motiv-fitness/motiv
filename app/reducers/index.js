import { combineReducers } from 'redux';
import { routerReducers} from 'react-router-redux';
import messages from './messages';
import auth from './auth';
import diet from './diet';

console.log('diet', diet);
export default combineReducers({
  messages:messages,
  auth:auth,
  diet:diet
});
