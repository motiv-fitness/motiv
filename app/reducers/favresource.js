export default function favresource(state = {}, action){
  switch(action.type){
    case 'DISPLAY_RESOURCE_SUCCESS':
      return Object.assign({},state,{
        favresource: action.payload // receive data from action/payload
      });
      case 'DISPLAY_RESOURCE_FAIL':
        return action.error;
      default:
        return state;
  }
}
