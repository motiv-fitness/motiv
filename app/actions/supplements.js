export function displaySupplement(userId) {
  return (dispatch) => {
    console.log('we are inside dispatch')
    return fetch('/api/supplement', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response) => {
        if (response.ok) {
          console.log('made in to the actioncreator')
          return response.json().then((json) => {
            dispatch({
              type: 'DISPLAY_SUPPLEMENT_SUCCESS',
              payload: Array.isArray(json) ? json : [json]
            });
          });
        } else {
          console.log('FAIL');
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
