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

export function putDiet(diet,food){
  return (dispatch) => {
    return fetch('/api/regimes/diet', {
      method:'PUT',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({diet,food})
    }).then((response) => {
      if(response.ok){
        console.log("putDiet is success")
      }
    });
  };
}

export function putExercise(name,exercise){
  return (dispatch) => {
    return fetch('/api/regimes/exercise', {
      method:'PUT',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({name,exercise})
    }).then((response) => {
      if(response.ok){
        console.log("putExercise is success")
      }
    });
  };
}
