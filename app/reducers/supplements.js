export default function supplements(state = {}, action){
  switch(action.type){
    case  'DISPLAY_SUPPLEMENT_SUCCESS':
    // case 'SUCCESFUL_PUT':
     return Object.assign({}, state, {
       supplementaryAction: action.payload
     });
     case 'DISPLAY_SUPPLEMENT_FAIL':
     case 'FAIL_PUT':
      return action.error;
      default:
        return state;
  }
}
