export default function favresource(state = {}, action){
  switch(action.type){
    case 'DISPLAY_FAVRESOURCE_SUCCESS':
      return Object.assign({},state,{
        data: action.payload // receive data from action/payload
      });
      case 'DISPLAY_FAVRESOURCE_FAIL':
        return action.error;
      default:
        return state;
  }
}
