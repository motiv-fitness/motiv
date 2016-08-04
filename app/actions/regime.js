export function displayExercise(userId) {
  return (dispatch) => {
    return fetch('/api/regimes/exercise', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
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
