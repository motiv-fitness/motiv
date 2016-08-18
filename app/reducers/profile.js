export default function feed(state = {}, action) {
  switch (action.type) {
    case 'GET_USER_SUCCESS': {
      return Object.assign({}, state, {
        user: action.payload
      });
    }
    case 'GET_GOALS_SUCCESS':
      return Object.assign({}, state, {
        goals: action.payload
      });
    case 'GET_GOALS_FAILURE':
    case 'GET_USER_FAILURE':
      return action.error;
    default:
      return state;
  }
}
