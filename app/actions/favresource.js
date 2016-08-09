
export function favResource (userId) {
  return (dispatch) => {
    return fetch('/api/resource/recipe', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then((response) => {
        if (response.ok) {
          return response.json().then((json) => {
            dispatch({
              type: 'DISPLAY_FAVRESOURCE_SUCCESS',
              payload: Array.isArray(json) ? json : [json]
            });
          });
        } else {
          return response.json().then((json) => {
            dispatch({
              type: 'DISPLAY_FAVRESOURCE_FAIL',
              error: json
            })
          });
        }
      })
    }
  }
