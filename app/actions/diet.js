import {browserHistory} from 'react-router';


//on click display diet/excercise regime
export function display(name, exercise){
  return (dispatch) => {
    dispatch({
      type: 'DISPLAY_REGIME',
      name:name,
      exercise:exercise
    });
  }
}
