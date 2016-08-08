export default function goal(state = {}, action){
  switch(action.type){
    case 'DISPLAY_GOAL_SUCCESS':
      return Object.assign({},state,{
        progress: action.payload
      });
      case 'DISPLAY_GOAL_FAIL':
        return action.error;
      default:
        return state;
  }
}
