import { combineReducers } from 'redux'
import UserGoals from './reducer_goals'

const rootReducers = combineReducers({
  userGoals: UserGoals
})

export default rootReducers;
