import {browserHistory} from 'react-router';


//on click display diet/excercise regime
export function display(name, exercise){
  return (dispatch) => {
    dispatch({
      type: 'DISPLAY_REGIME',
      name:name,
      exercise:exercise
    });
    return fetch('/DISPLAY_REGIME',{
      method:'GET',
      headers:{'Content-Type':'application/json'},
    }).then((response)=>{
      if(response.ok) {
        return response.json().then((json)=>{
          dispatch({
            type:'DISPLAY_REGIME_SUCCESS',
            name:name,
            exercise:exercise
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'DISPLAY_REGIME_FAIL',
            name:json,
            exercise:json
      }
    });
  };
}
