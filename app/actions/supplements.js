export function displaySupplement(userId) {
  return (dispatch) => {
    return fetch('/api/supplements', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then((response) => {
        if (response.ok) {
          return response.json().then((json) => {
            dispatch({
              type: 'DISPLAY_SUPPLEMENT_SUCCESS',
              payload: Array.isArray(json) ? json : [json]
            });
          });
        } else {
          return response.json().then((json) => {
            dispatch({
              type: 'DISPLAY_SUPPLEMENT_FAIL',
              error: json
            })
          });
        }
      })
    }
  }

  export function postSupplement(supplement,amount){
    return (dispatch) => {
      return fetch('/api/supplements', {
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({supplement,amount})
      }).then((response) => {
        if (response.ok) {
          console.log('it works')
        }
      })
    }
  }
