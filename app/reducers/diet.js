const initialState = {
  name:null,
  exercise: null
}



export default function diet(state = initialState, action){
  if (!state.hydrated) {
    state = Object.assign({}, initialState, state, { hydrated: true });
  }
  switch(action.type){
    case 'DISPLAY_REGIME':
      return {
        name: action.name,
        exercise: action.exercise
      };
    default:
      return state;
  }
}
