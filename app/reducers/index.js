import { combineReducers } from 'redux';
import { routerReducers} from 'react-router-redux';
import messages from './messages';
import auth from './auth';
import regime from './regime';
import profile from './profile';
import goals from './reducerGoals'

export default combineReducers({
  messages,
  auth,
  profile,
<<<<<<< HEAD
  regime
=======
  diet,
  goals,
>>>>>>> [feature] add progressbar
});
