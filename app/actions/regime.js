export function displayExercise(userId) {
  return (dispatch) => {
    return fetch('/api/regimes/exercise', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then((response) => {
        if (response.ok) {
          return response.json().then((json) => {
            dispatch({
              type: 'DISPLAY_REGIMEEXERCISE_SUCCESS',
              payload: Array.isArray(json) ? json : [json]
            });
          });
        } else {
          return response.json().then((json) => {
            dispatch({
              type: 'DISPLAY_REGIMEEXERCISE_FAIL',
              error: json
            })
          });
        }
      })
    }
  }

export function displayDiet(userId) {
  return (dispatch) => {
    return fetch('/api/regimes/diet', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then((response) => {
        if (response.ok) {
          return response.json().then((json) => {
            dispatch({
              type: 'DISPLAY_REGIMEDIET_SUCCESS',
              payload: Array.isArray(json) ? json : [json]
            });
          });
        } else {
          return response.json().then((json) => {
            dispatch({
             type: 'DISPLAY_REGIMEDIET_FAIL',
            error: json
          })
       });
      }
    })
  }
}

export function putDiet(label,name){
  return (dispatch) => {
    return fetch('/api/regimes/diet', {
      method:'PUT',
      headers:{'Content-Type': 'application/json'},
      credentials: 'same-origin',
      body:JSON.stringify({label,name})
    }).then((response) => {
      if(response.ok){
        console.log("putDiet is success")
      }
    });
  };
}

export function putExercise(label,name){
  return (dispatch) => {
    return fetch('/api/regimes/exercise', {
      method:'PUT',
      headers:{'Content-Type': 'application/json'},
      credentials: 'same-origin',
      body:JSON.stringify({label,name})
    }).then((response) => {
      if(response.ok){
        console.log("putExercise is success")
      }
    });
  };
}
