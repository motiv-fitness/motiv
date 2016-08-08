export default function feed(state = {}, action) {
  switch (action.type) {
    case 'GET_USER_SUCCESS': {
      return Object.assign({}, state, {
        user: action.payload
      });
    }
    case 'GET_MILESTONES_SUCCESS':
      return Object.assign({}, state, {
        milestones: action.payload
      });
    case 'GET_GOALS_SUCCESS':
      return Object.assign({}, state, {
        goals: action.payload
      });
    case 'GET_STATS_SUCCESS':
      return Object.assign({}, state, {
        stats: action.payload
      });
    case 'GET_MILESTONES_FAILURE':
    case 'GET_GOALS_FAILURE':
    case 'GET_STATS_FAILURE':
    case 'GET_USER_SUCCESS':
      return action.error;
    default:
      return state;
  }
}
